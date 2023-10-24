import { columnOrder, columns } from "./columnData";

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