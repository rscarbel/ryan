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

export const deleteCard = async (cardId) => {
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

export const findCompanies = async (userId: number) => {
  const response = await fetch(
    `/api/applicationBoard/find/companies?userId=${userId}`
  );
  const text = await response.text();
  const data = JSON.parse(text);
  return data?.body || [];
};

export const findJobTitle = async ({ userId, companyName, jobTitle, boardId }) => {
  const response = await fetch(
    `/api/applicationBoard/find/jobTitle?userId=${userId}&companyName=${companyName}&jobTitle=${jobTitle}&boardId=${boardId}`
  );
  const text = await response.text();
  const data = JSON.parse(text);
  return data?.body || null;
};
