import type { NextApiRequest, NextApiResponse } from "next";
import { getContentByKey } from "@/lib/siteContent";

type ResponseData = {
  content: string | null;
  format: string | null;
  error?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { contentKey } = req.query;
  if (!contentKey || typeof contentKey !== "string") {
    return res.status(400).json({
      error: "Invalid key provided.",
      content: null,
      format: null,
    });
  }

  try {
    const element = await getContentByKey(contentKey);

    if (!element) {
      return res.status(404).json({
        error: "Content not found.",
        content: null,
        format: null,
      });
    }

    res.status(200).json({ content: element.content, format: element.format });
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({
      error: "An unexpected error occurred.",
      content: null,
      format: null,
    });
  }
};

export default handler;
