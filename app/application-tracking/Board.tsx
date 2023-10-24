//ts-nocheck
"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import ApplicationCard from "./ApplicationCard";

interface ApplicationCardType {
  id: string;
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  salary: string | number;
  applicationLink: string;
  notes: string;
}

interface ColumnType {
  id: string;
  title: string;
  applicationCardIds: string[];
}

interface InitialDataType {
  applicationCards: Record<string, ApplicationCardType>;
  columns: Record<string, ColumnType>;
  columnOrder: string[];
}

interface BoardProps {
  data: InitialDataType;
}

const Board: React.FC<BoardProps> = ({ data = {} }) => {
  const [boardData, setBoardData] = useState(data);
  const onDragEnd = (result: any) => {
    const { source, destination } = result;

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
      newStartTaskIds.splice(destination.index, 0, result.draggableId);

      const newColumn = {
        ...startColumn,
        applicationCardIds: newStartTaskIds,
      };

      setBoardData((prevData) => ({
        ...prevData,
        columns: {
          ...prevData.columns,
          [newColumn.id]: newColumn,
        },
      }));
    } else {
      const endColumn = boardData.columns[destination.droppableId];
      const newEndTaskIds = Array.from(endColumn.applicationCardIds);
      newEndTaskIds.splice(destination.index, 0, result.draggableId);

      setBoardData((prevData) => ({
        ...prevData,
        columns: {
          ...prevData.columns,
          [startColumn.id]: {
            ...startColumn,
            applicationCardIds: newStartTaskIds,
          },
          [endColumn.id]: {
            ...endColumn,
            applicationCardIds: newEndTaskIds,
          },
        },
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-between p-4">
        {boardData.columnOrder.map((columnId) => {
          const column = boardData.columns[columnId];
          const applicationCards = column.applicationCardIds.map(
            (taskId) => boardData.applicationCards[taskId]
          );
          return (
            <div key={column.id} className="w-1/4 p-2">
              <h2 className="mb-4 text-lg font-bold text-gray-700">
                {column.title}
              </h2>
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-100 rounded p-4"
                  >
                    {applicationCards.map((applicationCard, index) => (
                      <ApplicationCard
                        key={applicationCard.id}
                        cardData={applicationCard}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default Board;
