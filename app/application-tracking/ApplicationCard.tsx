import { Draggable } from "@hello-pangea/dnd";
import { getStatusColor } from "./utils";

interface ApplicationCardProps {
  cardData: {
    id: string;
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    salary: string | number;
    applicationLink: string;
    applicationDate: Date;
    notes: string;
  };
  status: string;
  index: number;
}
const ApplicationCard: React.FC<ApplicationCardProps> = ({
  cardData,
  index,
  status,
}) => {
  return (
    <Draggable draggableId={cardData.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-4 mb-4 bg-white shadow-md rounded-lg border border-gray-200 relative"
        >
          <div
            className={`absolute top-4 right-4 rounded-full px-4 py-1 text-sm font-medium ${getStatusColor(
              status
            )}`}
          >
            {status}
          </div>
          <div className="mb-2 text-xl font-bold text-gray-700">
            {cardData.companyName}
          </div>
          <div className="mb-1 text-lg font-medium text-gray-600">
            {cardData.jobTitle}
          </div>
          <div className="mb-2 text-sm text-gray-500">
            {cardData.jobDescription}
          </div>
          <div className="mb-1 text-gray-600">Salary: {cardData.salary}</div>
          <a
            href={cardData.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 text-blue-500 underline"
          >
            Application Link
          </a>
          <div className="mb-2 text-sm text-gray-500">
            Date Applied: {cardData.applicationDate}
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Notes: {cardData.notes}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ApplicationCard;
