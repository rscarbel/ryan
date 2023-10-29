import prisma from "@/services/globalPrismaClient";
import { ApplicationStatus, PayFrequency, WorkMode } from "@prisma/client";
import { findOrCreateCompany } from "@/services/Company/companyService";
import { createOrUpdateJob } from "@/services/Job/jobService";
import { incrementCardsAfterIndex } from "@/services/ApplicationCard/applicationCardService";

export async function POST(request) {
  const {
    status,
    applicationBoardId,
    jobTitle,
    company,
    payAmountCents,
    payFrequency,
    jobDescription,
    currency,
    streetAddress,
    city,
    state,
    postalCode,
    country,
    applicationLink,
    workMode,
    applicationDate,
    positionIndex,
    notes,
  } = await request.json();
  try {
    await prisma.$transaction(async (client) => {
      const user = await client.user.findFirst({
        where: {
          id: 1,
        },
      });

      const applicationBoard = await client.applicationBoard.findFirst({
        where: {
          id: applicationBoardId,
        },
      });

      const newCompany = await findOrCreateCompany({
        companyName: company.name,
        userId: user.id,
        client: client,
      });

      const job = await createOrUpdateJob({
        jobTitle: jobTitle,
        userId: user.id,
        companyId: newCompany.id,
        jobDescription: jobDescription,
        workMode: workMode,
        payAmountCents: payAmountCents,
        payFrequency: payFrequency,
        currency: currency,
        streetAddress: streetAddress,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
        client: client,
      });

      await client.applicationCard.create({
        data: {
          status: status,
          applicationLink: applicationLink,
          applicationDate: applicationDate,
          positionIndex: positionIndex,
          notes: notes,
          applicationBoardId: applicationBoard.id,
          jobId: job.id,
          userId: user.id,
        },
      });

      await incrementCardsAfterIndex({
        boardId: applicationBoard.id,
        status: status,
        index: positionIndex,
        client: client,
      });
    });
    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
