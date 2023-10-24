//ts-nocheck
"use client";

import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { getStatusColor } from "./utils";

interface ApplicationCardProps {
  id: string;
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  salary: string | number;
  applicationLink: string;
  applicationDate: string;
  notes: string;
  status: string;
  index: number;
}

const MAX_CHARACTERS = 50;

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  id,
  companyName,
  jobTitle,
  jobDescription,
  salary,
  applicationLink,
  applicationDate,
  notes,
  status,
  index,
}) => {
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [isNotesExpanded, setNotesExpanded] = useState(false);

  const truncateText = (text: string, maxLength: number = MAX_CHARACTERS) => {
    if (!text) return text;

    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
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
            {companyName}
          </div>
          <div className="mb-1 text-lg font-medium text-gray-600">
            {jobTitle}
          </div>
          <div className="mb-2 text-sm text-gray-500">
            {isDescriptionExpanded
              ? jobDescription
              : truncateText(jobDescription)}
            {jobDescription?.length > MAX_CHARACTERS && (
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setDescriptionExpanded(!isDescriptionExpanded)}
              >
                {isDescriptionExpanded ? " see less" : " see more..."}
              </span>
            )}
          </div>
          <div className="mb-1 text-gray-600">Salary: {salary}</div>
          <a
            href={applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 text-blue-500 underline"
          >
            Application Link
          </a>
          <div className="mb-2 text-sm text-gray-500">
            Date Applied: {applicationDate}
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {isNotesExpanded ? notes : truncateText(notes)}
            {notes?.length > MAX_CHARACTERS && (
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
