import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function POST(request) {
  const res = await request.json();
  const { id, status } = res;
  try {
    const updatedCard = await prisma.applicationCard.update({
      where: { id: parseInt(id) },
      data: { status: status },
    });

    return new Response(JSON.stringify({ error: null, card: updatedCard }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
        card: null,
      }),
      { status: 500 }
    );
  }
}
