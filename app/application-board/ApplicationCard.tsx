"use client";

import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { getStatusColor, prettifyDate, humanizedPayFrequency } from "./utils";
import Description from "./Description";
import { useEditCard } from "./EditCardContext";
import { ApplicationCardInterface } from "./types";
import { formatCurrency } from "@/app/utils";

const ApplicationCard: React.FC<ApplicationCardInterface> = ({
  id,
  companyName,
  jobTitle,
  jobDescription,
  workMode,
  streetAddress,
  city,
  state,
  country,
  postalCode,
  payAmountCents,
  payFrequency,
  currency,
  applicationLink,
  applicationDate,
  status,
  notes,
  index,
}) => {
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  const cardStyles = {
    base: "p-4 mb-4 bg-white claymorphic-shadow claymorphic-shadow-hover rounded-lg border border-gray-200 relative",
    status: `absolute top-1 right-5 rounded-full px-2 py-0.3 text-xs font-medium ${getStatusColor(
      status
    )}`,
  };

  const payAmountDisplay = formatCurrency(payAmountCents, country);
  const payFrequencyDisplay = humanizedPayFrequency[payFrequency];
  const workModeDisplay = workMode ? `(${workMode})` : "";

  const { onEditClick } = useEditCard();

  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cardStyles.base}
          onClick={() =>
            onEditClick({
              id,
              companyName,
              jobTitle,
              jobDescription,
              workMode,
              streetAddress,
              city,
              state,
              country,
              postalCode,
              payAmountCents,
              payFrequency,
              currency,
              applicationLink,
              applicationDate,
              positionIndex: index,
              notes,
              status,
            })
          }
        >
          <div className={cardStyles.status}>{status}</div>
          <div className="mb-2 mt-1 text-lg font-bold text-gray-700">
            {companyName}
          </div>
          <div className="mb-1 text-md font-medium text-gray-600">
            {jobTitle}
          </div>
          <Description
            description={jobDescription}
            isExpanded={isDescriptionExpanded}
            toggle={() => setDescriptionExpanded(!isDescriptionExpanded)}
          />
          <div className="mb-1 text-gray-600">
            {`${payAmountDisplay} ${payFrequencyDisplay} ${workModeDisplay}`}
          </div>
          <a
            href={applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 text-blue-500 underline"
          >
            Application Link
          </a>
          <div className="mb-2 text-sm text-gray-500">
            Date Applied: {prettifyDate(applicationDate)}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ApplicationCard;
