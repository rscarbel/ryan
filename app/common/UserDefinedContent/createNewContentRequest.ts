type ResponseData = {
  content: string;
  format: string;
  contentKey: string;
  error?: string;
};

const createNewContentRequest = async (
  contentKey: string,
  content: string,
  format: string
): Promise<ResponseData> => {
  const endpoint = "/api/content/create";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contentKey,
      content,
      format,
    }),
  });

  const responseData = (await response.json()) as ResponseData;

  if (!response.ok) {
    throw new Error(responseData.error || "Failed to create content");
  }

  return responseData;
};

export default createNewContentRequest;
