//ts-nocheck
"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import ApplicationCard from "./ApplicationCard";
import { initializeBoardData } from "./utils";

const Board: React.FC = ({ cards = [] }) => {
  const [boardData, setBoardData] = useState(initializeBoardData(cards));

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
      <div className="flex flex-wrap p-4">
        {boardData.columnOrder.map((columnId, idx) => {
          const column = boardData.columns[columnId];
          const applicationCards = column.applicationCardIds.map(
            (taskId) => boardData.applicationCards[taskId]
          );

          // Check for columns that need to be grouped
          if (columnId === "offer" || columnId === "rejected") {
            const nextColumnId = columnId === "offer" ? "accepted" : "passed";
            const nextColumn = boardData.columns[nextColumnId];
            const nextApplicationCards = nextColumn.applicationCardIds.map(
              (taskId) => boardData.applicationCards[taskId]
            );

            return (
              <div
                key={columnId + "-group"}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 flex flex-col"
              >
                {/* Current Column */}
                <div className="w-full p-2">
                  <h2 className="mb-4 text-lg font-bold text-gray-700">
                    {column.title}
                  </h2>
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="bg-gray-100 rounded p-4 max-h-[600px] overflow-y-auto"
                      >
                        {applicationCards.map((applicationCard, index) => (
                          <ApplicationCard
                            key={applicationCard.id}
                            {...applicationCard}
                            index={index}
                            status={column.title.toLowerCase()}
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
                <div className="w-full p-2">
                  <h2 className="mb-4 text-lg font-bold text-gray-700">
                    {nextColumn.title}
                  </h2>
                  <Droppable droppableId={nextColumn.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="bg-gray-100 rounded p-4 max-h-[600px] overflow-y-auto"
                      >
                        {nextApplicationCards.map((applicationCard, index) => (
                          <ApplicationCard
                            key={applicationCard.id}
                            {...applicationCard}
                            index={index}
                            status={nextColumn.title.toLowerCase()}
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            );
          } else if (columnId !== "accepted" && columnId !== "passed") {
            return (
              <div
                key={column.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
              >
                <h2 className="mb-4 text-lg font-bold text-gray-700">
                  {column.title}
                </h2>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-gray-100 rounded p-4 max-h-[600px] overflow-y-auto"
                    >
                      {applicationCards.map((applicationCard, index) => (
                        <ApplicationCard
                          key={applicationCard.id}
                          {...applicationCard}
                          index={index}
                          status={column.title.toLowerCase()}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          }
          return null;
        })}
      </div>
    </DragDropContext>
  );
};

export default Board;
