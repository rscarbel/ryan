import prisma from "@/services/globalPrismaClient";

export const findOrCreateCompany = async ({
  companyName,
  userId,
  notes = null,
}) => {
  const company = await prisma.company.findFirst({
    where: {
      name_userId: {
        name: companyName,
        userId: userId,
      },
    },
  });

  if (company) {
    return company;
  }

  return await prisma.company.create({
    data: {
      name: companyName,
      userId: userId,
      notes: notes,
    },
  });
};

export const updateCompany = async ({
  companyId,
  companyName,
  notes = undefined,
}) => {
  if (!companyId) {
    throw new Error("companyId is required");
  }

  const company = await prisma.company.findFirst({
    where: {
      id: companyId,
    },
  });

  if (!company) {
    throw new Error("Company not found");
  }

  const notesToUpdateWIth = notes === undefined ? company.notes : notes;

  return await prisma.company.update({
    where: {
      id: companyId,
    },
    data: {
      name: companyName,
      notes: notesToUpdateWIth,
    },
  });
};

export const createOrUpdateCompany = async ({
  companyId,
  userId,
  companyName,
  notes = undefined,
}) => {
  if (companyId) {
    return await updateCompany({
      companyId,
      companyName,
      notes,
    });
  } else {
    return await findOrCreateCompany({
      companyName,
      userId,
      notes,
    });
  }
};
