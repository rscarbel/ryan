export const updateCardStatus = async (cardId: string, newStatus: string) => {
  const response = await fetch("/api/applicationBoard/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: cardId,
      status: newStatus,
    }),
  });

  const data = await response.json();
  return { response, data };
};
