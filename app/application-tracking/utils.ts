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
