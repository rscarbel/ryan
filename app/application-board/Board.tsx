"use client";

import React, { useState, useRef } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import {
  initializeBoardData,
  handleDifferentColumnMove,
  handleSameColumnMove,
} from "./utils";
import { Toast } from "primereact/toast";
import { updateCardStatus, updateCard } from "./network";
import ColumnRenderer from "./ColumnRenderer";
import EditCardFormModal from "./EditCardFormModal";
import { EditCardContext } from "./EditCardContext";
import { da } from "@faker-js/faker";

const MILLISECONDS_FOR_MESSAGES = 2000;

const Board: React.FC = ({ cards = [] }) => {
  const [boardData, setBoardData] = useState(initializeBoardData(cards));
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const toast = useRef<Toast | null>(null);

  const { columns, applicationCards, columnOrder } = boardData;

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: `Status updated`,
      life: MILLISECONDS_FOR_MESSAGES,
    });
  };

  const showError = (errorMessage: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: errorMessage,
      life: MILLISECONDS_FOR_MESSAGES,
    });
  };

  const handleEditClick = (cardData) => {
    setEditingCard(cardData);
    setModalVisible(true);
  };

  const handleSubmitChanges = async (updatedData) => {
    try {
      const { response, data } = await updateCard(updatedData);
      const cards = data.cards;

      console.log(data);
      showSuccess();
      setBoardData(initializeBoardData(cards));
      if (!response.ok) {
        showError(data.error);
      }
    } catch (error) {
      showError((error as Error).message);
    } finally {
      setEditingCard(null);
      setModalVisible(false);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const startColumn = columns[source.droppableId];
    const updatedColumns =
      source.droppableId === destination.droppableId
        ? handleSameColumnMove(startColumn, source, destination, draggableId)
        : handleDifferentColumnMove(
            startColumn,
            columns[destination.droppableId],
            source,
            destination,
            draggableId
          );

    const cardId = draggableId;
    const newStatus = destination.droppableId;

    try {
      const { response, data } = await updateCardStatus(cardId, newStatus);

      setBoardData((prevData) => ({
        ...prevData,
        columns: { ...prevData.columns, ...updatedColumns },
      }));

      showSuccess();

      if (!response.ok) {
        showError(data.error);
      }
    } catch (error) {
      showError((error as Error).message);
    }
  };

  return (
    <EditCardContext.Provider
      value={{
        onEditClick: handleEditClick,
        editingCardData: editingCard,
        setEditingCardData: setEditingCard,
        isModalVisible,
        setModalVisible,
      }}
    >
      <Toast ref={toast} />

      <EditCardFormModal
        visible={isModalVisible}
        onHide={() => setModalVisible(false)}
        cardData={editingCard}
        onSubmit={handleSubmitChanges}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-wrap p-4">
          {columnOrder.map((columnId) => (
            <ColumnRenderer
              key={columnId}
              columnId={columnId}
              columns={columns}
              applicationCards={applicationCards}
            />
          ))}
        </div>
      </DragDropContext>
    </EditCardContext.Provider>
  );
};

export default Board;
