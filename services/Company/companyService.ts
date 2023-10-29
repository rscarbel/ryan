import prisma from "@/services/globalPrismaClient";

export const findOrCreateCompany = async ({
  companyName,
  userId,
  notes = null,
  client = prisma,
}) => {
  const company = await client.company.findFirst({
    where: {
      name: companyName,
      userId: userId,
    },
  });

  if (company) {
    return company;
  }

  return await client.company.create({
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
  client = prisma,
}) => {
  if (!companyId) {
    throw new Error("companyId is required");
  }

  const company = await client.company.findFirst({
    where: {
      id: companyId,
    },
  });

  if (!company) {
    throw new Error("Company not found");
  }

  const notesToUpdateWIth = notes === undefined ? company.notes : notes;

  return await client.company.update({
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
  client = prisma,
}) => {
  if (companyId) {
    return await updateCompany({
      companyId,
      companyName,
      notes,
      client,
    });
  } else {
    return await findOrCreateCompany({
      companyName,
      userId,
      notes,
      client,
    });
  }
};
