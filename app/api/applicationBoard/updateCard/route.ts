import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request) {
  const res = await request.json();
  const {
    id,
    status,
    companyName,
    jobTitle,
    jobDescription,
    salary,
    applicationLink,
    applicationDate,
    notes,
  } = res;
  try {
    const updatedCard = await prisma.applicationCard.update({
      where: { id: parseInt(id) },
      data: {
        companyName: companyName,
        jobTitle: jobTitle,
        jobDescription: jobDescription,
        salary: salary,
        applicationLink: applicationLink,
        applicationDate: applicationDate,
        notes: notes,
        status: status,
      },
    });

    const cards = await prisma.applicationCard.findMany({
      where: { applicationBoardId: updatedCard.applicationBoardId },
    });

    return new Response(JSON.stringify({ error: null, cards: cards }), {
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
