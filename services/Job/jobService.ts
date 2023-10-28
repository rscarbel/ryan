import prisma from "@/services/globalPrismaClient";

export const findOrCreateJob = async ({
  jobTitle,
  userId,
  companyId,
  jobDescription,
  workMode,
  payAmountCents,
  payFrequency,
  currency,
  streetAddress,
  city,
  state,
  country,
}) => {
  const existingJob = await prisma.job.findUnique({
    where: {
      title_companyId_UserId_workMode_city: {
        title: jobTitle,
        companyId: companyId,
        userId: userId,
        workMode: workMode,
        city: city,
      },
    },
  });

  if (existingJob) {
    return existingJob;
  } else {
    return prisma.job.create({
      data: {
        title: jobTitle,
        userId: userId,
        companyId: companyId,
        description: jobDescription,
        workMode: workMode,
        payAmountCents: payAmountCents,
        payFrequency: payFrequency,
        currency: currency,
        streetAddress: streetAddress,
        city: city,
        state: state,
        country: country,
      },
    });
  }
};

export const createOrUpdateJob = async ({
  jobTitle,
  userId,
  companyId,
  jobDescription,
  workMode,
  payAmountCents,
  payFrequency,
  currency,
  streetAddress,
  city,
  state,
  country,
}) => {
  const existingJob = await prisma.job.findUnique({
    where: {
      title_companyId_UserId_workMode_city: {
        title: jobTitle,
        companyId: companyId,
        userId: userId,
        workMode: workMode,
        city: city,
      },
    },
  });

  if (existingJob) {
    return prisma.job.update({
      where: { id: existingJob.id },
      data: {
        description: jobDescription,
        payAmountCents: payAmountCents,
        payFrequency: payFrequency,
        currency: currency,
        streetAddress: streetAddress,
        city: city,
        state: state,
        country: country,
      },
    });
  } else {
    return prisma.job.create({
      data: {
        title: jobTitle,
        userId: userId,
        companyId: companyId,
        description: jobDescription,
        workMode: workMode,
        payAmountCents: payAmountCents,
        payFrequency: payFrequency,
        currency: currency,
        streetAddress: streetAddress,
        city: city,
        state: state,
        country: country,
      },
    });
  }
};
