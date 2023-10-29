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
  postalCode,
}) => {
  const existingJob = await prisma.job.findFirst({
    where: {
      title: jobTitle,
      companyId: companyId,
      userId: userId,
      workMode: workMode,
      city: city,
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
        postalCode: postalCode,
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
  postalCode,
}) => {
  const existingJob = await prisma.job.findFirst({
    where: {
      title: jobTitle,
      companyId: companyId,
      userId: userId,
      workMode: workMode,
      city: city,
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
        postalCode: postalCode,
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
        postalCode: postalCode,
      },
    });
  }
};

export const updateJob = async ({
  jobId,
  jobTitle,
  jobDescription,
  workMode,
  payAmountCents,
  payFrequency,
  currency,
  streetAddress,
  city,
  state,
  country,
  postalCode,
}) => {
  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
    },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  return await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      title: jobTitle,
      description: jobDescription,
      workMode: workMode,
      payAmountCents: payAmountCents,
      payFrequency: payFrequency,
      currency: currency,
      streetAddress: streetAddress,
      city: city,
      state: state,
      country: country,
      postalCode: postalCode,
    },
  });
};
