type FetchContentResponse = {
  content: string | null;
  format: string | null;
  error?: string;
};

const fetchContentByKey = async (
  contentKey: string
): Promise<FetchContentResponse> => {
  const endpoint = `/api/content/read?contentKey=${encodeURIComponent(
    contentKey
  )}`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      const data = await response.json();
      return data as FetchContentResponse;
    }

    const data: FetchContentResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching content:", error);
    return {
      content: null,
      format: null,
      error: "An unexpected error occurred.",
    };
  }
};

export default fetchContentByKey;
