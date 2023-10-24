//ts-nocheck
"use client";

import React, { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { initializeBoardData } from "./utils";
import SingleColumn from "./SingleColumn";
import DoubleColumn from "./DoubleColumn";

const Board: React.FC = ({ cards = [] }) => {
  const [boardData, setBoardData] = useState(initializeBoardData(cards));

  const updateSingleColumn = (startColumn, newStartTaskIds) => ({
    ...startColumn,
    applicationCardIds: newStartTaskIds,
  });

  const updateMultipleColumns = (
    startColumn,
    endColumn,
    newStartTaskIds,
    newEndTaskIds
  ) => ({
    [startColumn.id]: { ...startColumn, applicationCardIds: newStartTaskIds },
    [endColumn.id]: { ...endColumn, applicationCardIds: newEndTaskIds },
  });

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const startColumn = boardData.columns[source.droppableId];
    const newStartTaskIds = Array.from(startColumn.applicationCardIds);
    newStartTaskIds.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      newStartTaskIds.splice(destination.index, 0, draggableId);
      const updatedColumn = updateSingleColumn(startColumn, newStartTaskIds);
      setBoardData((prevData) => ({
        ...prevData,
        columns: { ...prevData.columns, [updatedColumn.id]: updatedColumn },
      }));
    } else {
      const endColumn = boardData.columns[destination.droppableId];
      const newEndTaskIds = Array.from(endColumn.applicationCardIds);
      newEndTaskIds.splice(destination.index, 0, draggableId);
      const updatedColumns = updateMultipleColumns(
        startColumn,
        endColumn,
        newStartTaskIds,
        newEndTaskIds
      );
      setBoardData((prevData) => ({
        ...prevData,
        columns: { ...prevData.columns, ...updatedColumns },
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-wrap p-4">
        {boardData.columnOrder.map((columnId) => {
          const column = boardData.columns[columnId];
          const applicationCards = column.applicationCardIds.map(
            (taskId) => boardData.applicationCards[taskId]
          );

          if (columnId === "offer") {
            const acceptedColumn = boardData.columns["accepted"];
            const acceptedCards = acceptedColumn.applicationCardIds.map(
              (taskId) => boardData.applicationCards[taskId]
            );
            return (
              <DoubleColumn
                key="offer-accepted-group"
                column1={column}
                column2={acceptedColumn}
                applicationCards1={applicationCards}
                applicationCards2={acceptedCards}
              />
            );
          } else if (columnId === "rejected") {
            const passedColumn = boardData.columns["passed"];
            const passedCards = passedColumn.applicationCardIds.map(
              (taskId) => boardData.applicationCards[taskId]
            );
            return (
              <DoubleColumn
                key="rejected-passed-group"
                column1={column}
                column2={passedColumn}
                applicationCards1={applicationCards}
                applicationCards2={passedCards}
              />
            );
          } else if (columnId !== "accepted" && columnId !== "passed") {
            return (
              <SingleColumn
                key={columnId}
                column={column}
                applicationCards={applicationCards}
              />
            );
          }

          return null;
        })}
      </div>
    </DragDropContext>
  );
};

export default Board;
