"use client";

import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { getStatusColor, humanizedPayFrequency } from "./utils";
import Description from "./Description";
import { useEditCard } from "./EditCardContext";
import { ApplicationCardInterface } from "./types";
import { formatCurrency, prettifyDate } from "@/app/utils";

const ApplicationCard: React.FC<ApplicationCardInterface> = ({
  cardId,
  boardId,
  jobId,
  company: { companyId: companyId, name: companyName },
  title: jobTitle,
  description: jobDescription,
  workMode,
  payAmountCents,
  payFrequency,
  currency,
  streetAddress,
  city,
  state,
  country,
  postalCode,
  applicationLink,
  applicationDate,
  status,
  notes,
  index,
}) => {
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  const cardStyles = {
    base: "p-4 mb-4 bg-white claymorphic-shadow claymorphic-shadow-hover rounded-lg border border-gray-200 relative",
    status: `absolute top-2 right-3 rounded-full px-2 py-0.3 text-xs font-medium ${getStatusColor(
      status
    )}`,
  };

  const payAmountDisplay = formatCurrency(payAmountCents, country);
  const payFrequencyDisplay = humanizedPayFrequency[payFrequency];
  const workModeDisplay = workMode ? `(${workMode})` : "";

  const { onEditClick } = useEditCard();

  return (
    <Draggable draggableId={String(cardId)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cardStyles.base}
          onClick={() =>
            onEditClick({
              applicationCardId: cardId,
              boardId,
              jobId,
              company: { companyId, name: companyName },
              jobTitle,
              jobDescription,
              workMode,
              payAmountCents,
              payFrequency,
              currency,
              streetAddress,
              city,
              state,
              country,
              postalCode,
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
