"use client";

import React, { useState, useRef } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import {
  initializeBoardData,
  handleDifferentColumnMove,
  handleSameColumnMove,
} from "./utils";
import { Toast } from "primereact/toast";
import { updateCardStatus } from "./network";
import ColumnRenderer from "./ColumnRenderer";

const MILLISECONDS_FOR_MESSAGES = 2000;

const Board: React.FC = ({ cards = [] }) => {
  const [boardData, setBoardData] = useState(initializeBoardData(cards));
  const { columns, applicationCards, columnOrder } = boardData;
  const toast = useRef<Toast | null>(null);

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
    <>
      <Toast ref={toast} />
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
    </>
  );
};

export default Board;
