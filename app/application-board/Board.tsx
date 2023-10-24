//ts-nocheck
"use client";

import React, { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { initializeBoardData } from "./utils";
import SingleColumn from "./SingleColumn";
import DoubleColumn from "./DoubleColumn";

const Board: React.FC = ({ cards = [] }) => {
  const [boardData, setBoardData] = useState(initializeBoardData(cards));

  const handleSameColumnMove = (
    startColumn,
    source,
    destination,
    draggableId
  ) => {
    const newTaskIds = Array.from(startColumn.applicationCardIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
    return { ...startColumn, applicationCardIds: newTaskIds };
  };

  const handleDifferentColumnMove = (
    startColumn,
    endColumn,
    source,
    destination,
    draggableId
  ) => {
    const newStartTaskIds = Array.from(startColumn.applicationCardIds);
    newStartTaskIds.splice(source.index, 1);

    const newEndTaskIds = Array.from(endColumn.applicationCardIds);
    newEndTaskIds.splice(destination.index, 0, draggableId);

    return {
      [startColumn.id]: { ...startColumn, applicationCardIds: newStartTaskIds },
      [endColumn.id]: { ...endColumn, applicationCardIds: newEndTaskIds },
    };
  };

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
    const updatedColumns =
      source.droppableId === destination.droppableId
        ? handleSameColumnMove(startColumn, source, destination, draggableId)
        : handleDifferentColumnMove(
            startColumn,
            boardData.columns[destination.droppableId],
            source,
            destination,
            draggableId
          );

    setBoardData((prevData) => ({
      ...prevData,
      columns: { ...prevData.columns, ...updatedColumns },
    }));
  };

  const renderColumn = (columnId) => {
    const doubleColumns = {
      offer: "accepted",
      rejected: "passed",
    };
    if (doubleColumns[columnId]) {
      const column = boardData.columns[columnId];
      const pairedColumn = boardData.columns[doubleColumns[columnId]];

      return (
        <DoubleColumn
          key={`${columnId}-${doubleColumns[columnId]}-group`}
          column1={column}
          column2={pairedColumn}
          applicationCards1={column.applicationCardIds.map(
            (taskId) => boardData.applicationCards[taskId]
          )}
          applicationCards2={pairedColumn.applicationCardIds.map(
            (taskId) => boardData.applicationCards[taskId]
          )}
        />
      );
    } else if (!Object.values(doubleColumns).includes(columnId)) {
      const column = boardData.columns[columnId];
      return (
        <SingleColumn
          key={columnId}
          column={column}
          applicationCards={column.applicationCardIds.map(
            (taskId) => boardData.applicationCards[taskId]
          )}
        />
      );
    }
    return null;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-wrap p-4">
        {boardData.columnOrder.map((columnId) => renderColumn(columnId))}
      </div>
    </DragDropContext>
  );
};


export default Board;
