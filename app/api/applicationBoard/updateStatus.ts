import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ error: "Card ID and status are required." });
  }

  try {
    const updatedCard = await prisma.applicationCard.update({
      where: { id: Number(id) },
      data: { status },
    });

    return res.status(200).json(updatedCard);
  } catch (error) {
    console.error("Error updating card status:", error);
    return res.status(500).json({ error: "Failed to update card status." });
  }
}
