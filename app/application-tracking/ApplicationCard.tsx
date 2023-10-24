//ts-nocheck
"use client";

import { useState } from "react";
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
    applicationDate: string;
    notes: string;
  };
  status: string;
  index: number;
}

const MAX_CHARACTERS = 50;

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  cardData,
  index,
  status,
}) => {
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [isNotesExpanded, setNotesExpanded] = useState(false);

  const truncateText = (text: string, maxLength: number = MAX_CHARACTERS) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

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
            {isDescriptionExpanded
              ? cardData.jobDescription
              : truncateText(cardData.jobDescription)}
            {cardData.jobDescription.length > MAX_CHARACTERS && (
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setDescriptionExpanded(!isDescriptionExpanded)}
              >
                {isDescriptionExpanded ? " see less" : " see more..."}
              </span>
            )}
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
            {isNotesExpanded ? cardData.notes : truncateText(cardData.notes)}
            {cardData.notes.length > MAX_CHARACTERS && (
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setNotesExpanded(!isNotesExpanded)}
              >
                {isNotesExpanded ? " see less" : " see more..."}
              </span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ApplicationCard;
