import ApplicationCard from "./ApplicationCard";
import { Droppable } from "@hello-pangea/dnd";

const SingleColumn = ({ column, applicationCards, isFullSizeOnly = false }) => {
  const sizingClasses = isFullSizeOnly ? "" : "sm:w-1/2 md:w-1/3 lg:w-1/4";
  return (
    <div className={`w-full ${sizingClasses} p-2`}>
      <h2 className="mb-4 text-lg font-bold text-gray-700">{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-gray-200 rounded p-4 max-h-[600px] overflow-y-auto"
          >
            {applicationCards.map((applicationCard, index) => (
              <ApplicationCard
                key={String(applicationCard.id)}
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
};

export default SingleColumn;
