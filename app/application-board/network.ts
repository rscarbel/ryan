export const updateCardStatus = async (
  cardId: string,
  newStatus: string,
  index: string
) => {
  const response = await fetch("/api/applicationBoard/updateStatus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: cardId,
      status: newStatus,
      newPositionIndex: index,
    }),
  });

  const data = await response.json();
  return { response, data };
};

export const updateCard = async (card) => {
  const response = await fetch("/api/applicationBoard/updateCard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });

  const data = await response.json();
  return { response, data };
};

export const deleteCard = async (cardId: string) => {
  const response = await fetch("/api/applicationBoard/deleteCard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: cardId }),
  });

  const data = await response.json();
  return { response, data };
};

export const createCard = async (card) => {
  const response = await fetch("/api/applicationBoard/createCard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });

  const data = await response.json();
  return { response, data };
};
