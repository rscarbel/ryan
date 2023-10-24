import { columnOrder, columns } from "./columnData";
export const MAX_CHARACTERS = 10;

export const getStatusColor = (status: string) => {
  switch (status) {
    case "applied":
      return "bg-blue-200";
    case "interview":
      return "bg-green-300";
    case "offer":
      return "bg-blue-700 text-slate-50";
    case "rejected":
      return "bg-red-700 text-slate-50";
    case "passed":
      return "bg-black text-slate-50";
    case "accepted":
      return "bg-green-700 text-slate-50";
    default:
      return "bg-gray-200";
  }
};

export const initializeBoardData = (applicationCards: any[]) => {
  const generatedColumns = columns.reduce((acc, column) => {
    const columnApplicationCards = applicationCards.filter(
      (applicationCard) => applicationCard.status === column.id
    );
    acc[column.id] = {
      ...column,
      applicationCardIds: columnApplicationCards.map(
        (applicationCard) => applicationCard.id
      ),
    };
    return acc;
  }, {});

  return {
    applicationCards: applicationCards.reduce((acc, card) => {
      acc[card.id] = card;
      return acc;
    }, {}),
    columns: generatedColumns,
    columnOrder: columnOrder,
  };
};

export const prettifySalary = (salary: string | number) => {
  if (typeof salary === "number") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(salary);
  }
  if (typeof salary === "string") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(parseInt(salary));
  }
  return salary;
};

export const prettifyDate = (date: Date) => {
  const dateObj = new Date(date);
  return new Intl.DateTimeFormat("en-US").format(dateObj);
};

export const updateCardStatus = async (cardId, newStatus) => {
  try {
    const response = await fetch("/api/applicationBoard/updateStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: cardId, status: newStatus }),
    });

    if (!response.ok) {
      throw new Error("Failed to update card status");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating card status:", error);
  }
};

export const truncateText = (
  text: string,
  maxLength: number = MAX_CHARACTERS
) => {
  if (!text) return text;

  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const handleSameColumnMove = (
  startColumn,
  source,
  destination,
  draggableId
) => {
  const newTaskIds = Array.from(startColumn.applicationCardIds);
  newTaskIds.splice(source.index, 1);
  newTaskIds.splice(destination.index, 0, draggableId);
  return { ...startColumn, applicationCardIds: newTaskIds };
};

export const handleDifferentColumnMove = (
  startColumn,
  endColumn,
  source,
  destination,
  draggableId
) => {
  const newStartTaskIds = Array.from(startColumn.applicationCardIds);
  newStartTaskIds.splice(source.index, 1);

  const newEndTaskIds = Array.from(endColumn.applicationCardIds);
  newEndTaskIds.splice(destination.index, 0, draggableId);

  return {
    [startColumn.id]: { ...startColumn, applicationCardIds: newStartTaskIds },
    [endColumn.id]: { ...endColumn, applicationCardIds: newEndTaskIds },
  };
};
