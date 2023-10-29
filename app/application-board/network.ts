import { CLIENT_RENEG_WINDOW } from "tls";

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
  try {
    const response = await fetch("/api/applicationBoard/createCard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    });
    const data = await response.json();
    return { response, data };
  } catch (error) {
    //todo report to bugsnag
  }
};

export const findCompanies = async (userId: number) => {
  const response = await fetch(
    `/api/applicationBoard/find/companies?userId=${userId}`
  );
  let data;
  try {
    const text = await response.text();
    data = JSON.parse(text);
  } catch (error) {
    //todo report to bugsnag
  }
  return data?.body || [];
};

export const findJobTitle = async ({
  userId,
  companyName,
  jobTitle,
  boardId,
}) => {
  const response = await fetch(
    `/api/applicationBoard/find/jobTitle?userId=${userId}&companyName=${companyName}&jobTitle=${jobTitle}&boardId=${boardId}`
  );
  let data;
  try {
    const text = await response.text();
    data = JSON.parse(text);
  } catch (error) {
    //todo report to bugsnag
  }
  return data?.body || null;
};
