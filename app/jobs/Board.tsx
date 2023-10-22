import React from "react";
import { Panel } from "primereact/panel";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Board: React.FC = () => {
  const onDragEnd = (result) => {
    // Handle the drag-and-drop logic here
  };
  return (
    <div className="job-board">
      {/* Columns */}
      <div className="job-column">
        <Panel header="To Do" className="p-mb-2">
          {/* Cards for "To Do" column */}
        </Panel>
      </div>

      <div className="job-column">
        <Panel header="In Progress" className="p-mb-2">
          {/* Cards for "In Progress" column */}
        </Panel>
      </div>

      {/* Add more columns as needed */}
    </div>
  );
};

export default Board;

{/* <DragDropContext onDragEnd={onDragEnd}>
  <div className="job-board">
    <Droppable droppableId="job-columns" direction="horizontal">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="job-columns"
        >
          {/* Render columns here */}
        </div>
      )}
    </Droppable>
  </div>
</DragDropContext>; */}