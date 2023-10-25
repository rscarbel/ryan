import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

/**
              id,
              companyName,
              jobTitle,
              jobDescription,
              salary,
              applicationLink,
              applicationDate,
              notes,
              status,
 */

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
