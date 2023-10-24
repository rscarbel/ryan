//ts-nocheck
"use client";

import React, { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import {
  initializeBoardData,
  handleDifferentColumnMove,
  handleSameColumnMove,
} from "./utils";
import SingleColumn from "./SingleColumn";
import DoubleColumn from "./DoubleColumn";

const Board: React.FC = ({ cards = [] }) => {
  const [boardData, setBoardData] = useState(initializeBoardData(cards));
  const { columns, applicationCards, columnOrder } = boardData;

  const onDragEnd = (result) => {
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
      const column = columns[columnId];
      const pairedColumn = columns[doubleColumns[columnId]];
      return (
        <DoubleColumn
          key={`${columnId}-${doubleColumns[columnId]}-group`}
          column1={column}
          column2={pairedColumn}
          applicationCards1={column.applicationCardIds.map(
            (taskId) => applicationCards[taskId]
          )}
          applicationCards2={pairedColumn.applicationCardIds.map(
            (taskId) => applicationCards[taskId]
          )}
        />
      );
    }

    if (!Object.values(doubleColumns).includes(columnId)) {
      const column = columns[columnId];
      return (
        <SingleColumn
          key={columnId}
          column={column}
          applicationCards={column.applicationCardIds.map(
            (taskId) => applicationCards[taskId]
          )}
        />
      );
    }

    return null;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-wrap p-4">
        {columnOrder.map((columnId) => renderColumn(columnId))}
      </div>
    </DragDropContext>
  );
};

export default Board;
