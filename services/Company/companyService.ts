import prisma from "@/services/globalPrismaClient";

export const findOrCreateCompany = async ({
  companyName,
  userId,
  notes = null,
}) => {
  const company = await prisma.company.findUnique({
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
  userId,
  companyName,
  notes = undefined,
}) => {
  const company = await prisma.company.findUnique({
    where: {
      id_userId: {
        id: companyId,
        userId: userId,
      },
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
      userId,
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
