import type { NextApiRequest, NextApiResponse } from "next";
import { createContent } from "@/lib/siteContent";

type ResponseData = {
  content: string;
  format: string;
  contentKey: string;
  error?: string; // Optional error field to communicate error messages
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed.",
      content: "",
      format: "",
      contentKey: "",
    });
  }

  const { contentKey, content, format } = req.body;

  if (!contentKey || !content || !format) {
    return res.status(400).json({
      error: "Missing required fields.",
      content: "",
      format: "",
      contentKey: "",
    });
  }

  try {
    const createdContent = await createContent(contentKey, content, format);

    return res.status(201).json({
      contentKey: createdContent.contentKey,
      content: createdContent.content,
      format: createdContent.format,
    });
  } catch (error) {
    console.error("Error creating content:", error);
    return res.status(500).json({
      error: "An unexpected error occurred.",
      content: "",
      format: "",
      contentKey: "",
    });
  }
};

export default handler;
