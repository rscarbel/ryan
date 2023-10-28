"use client";

import React, { useState, useRef } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import {
  initializeBoardData,
  handleDifferentColumnMove,
  handleSameColumnMove,
} from "./utils";
import { Toast } from "primereact/toast";
import { updateCardStatus, updateCard, deleteCard } from "./network";
import ColumnRenderer from "./ColumnRenderer";
import EditCardFormModal from "./edit-card/EditCardFormModal";
import { EditCardContext } from "./EditCardContext";
import { BoardCardInterface } from "./types";

const MILLISECONDS_FOR_MESSAGES = 3000;

interface BoardProps {
  cards: BoardCardInterface[];
}

const Board: React.FC<BoardProps> = ({ cards = [] }) => {
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

  const showDeleteSuccess = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Application deleted",
      life: MILLISECONDS_FOR_MESSAGES,
    });
  };

  const handleEditClick = (cardData) => {
    setEditingCard(cardData);
    setModalVisible(true);
  };

  const handleSaveChanges = async (updatedData) => {
    try {
      const { response, data } = await updateCard(updatedData);
      const cards = data.cards;
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

  const handleDelete = async (cardId) => {
    try {
      const { response, data } = await deleteCard(cardId);
      console.log(data);
      const cards = data.cards;
      setBoardData(initializeBoardData(cards));
      showDeleteSuccess();
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
    const index = destination.index;

    const previousBoardData = { ...boardData };

    setBoardData((prevData) => ({
      ...prevData,
      columns: { ...prevData.columns, ...updatedColumns },
    }));

    try {
      const { response, data } = await updateCardStatus(
        cardId,
        newStatus,
        index
      );

      showSuccess();

      if (!response.ok) {
        showError(data.error);
        setBoardData(previousBoardData);
      }
    } catch (error) {
      showError((error as Error).message);
      setBoardData(previousBoardData);
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
        onSaveChanges={handleSaveChanges}
        onDelete={handleDelete}
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
