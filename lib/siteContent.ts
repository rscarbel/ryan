import {
  PrismaClient,
  SiteContent,
  SiteContentHistory,
  SiteContentFormat,
} from "@prisma/client";
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

interface FindUniqueContent {
  (key: string): Promise<SiteContent | null>;
}

export const findUniqueContentByKey: FindUniqueContent = async (key) => {
  return prisma.siteContent.findUnique({
    where: { key },
  });
};

export const findOrCreateSiteContent = async (
  key: string,
  content: string,
  format: SiteContentFormat
): Promise<SiteContent> => {
  const existingSiteContent = await findUniqueContentByKey(key);

  if (existingSiteContent) return existingSiteContent;

  return prisma.siteContent.create({
    data: { key, content, format },
  });
};

export const getContentByKey: FindUniqueContent = findUniqueContentByKey;

export const getAllContent = async (): Promise<SiteContent[]> =>
  prisma.siteContent.findMany({
    orderBy: { updatedAt: "desc" },
  });

export const createContent = async (
  key: string,
  content: string
): Promise<SiteContent> =>
  prisma.siteContent.create({
    data: { key, content, format: "PLAIN_TEXT" },
  });

export const updateContentByKey = async (
  key: string,
  newMarkup: string
): Promise<SiteContent> => {
  const content = await findUniqueContentByKey(key);

  if (!content) throw new Error("Content not found");

  const [_, updatedContent] = await prisma.$transaction([
    prisma.siteContentHistory.create({
      data: {
        contentId: content.id,
        content: content.content,
        format: "PLAIN_TEXT",
      },
    }),
    prisma.siteContent.update({
      where: { key },
      data: { content: newMarkup },
    }),
  ]);

  return updatedContent;
};

export const deleteContentByKey = async (key: string): Promise<SiteContent> =>
  prisma.siteContent.delete({ where: { key } });

export const getContentHistoryByKey = async (
  key: string
): Promise<SiteContentHistory[]> => {
  const content = await findUniqueContentByKey(key);

  if (!content) throw new Error("Content not found");

  return prisma.siteContentHistory.findMany({
    where: { contentId: content.id },
    orderBy: { createdAt: "desc" },
  });
};

export const deleteAllHistoryForKey = async (key: string): Promise<void> => {
  const content = await findUniqueContentByKey(key);

  if (!content) throw new Error("Content not found");

  await prisma.siteContentHistory.deleteMany({
    where: { contentId: content.id },
  });
};

export const getLatestHistoryByKey = async (
  key: string
): Promise<SiteContentHistory | null> => {
  const content = await findUniqueContentByKey(key);

  if (!content) throw new Error("Content not found");

  return prisma.siteContentHistory.findFirst({
    where: { contentId: content.id },
    orderBy: { createdAt: "desc" },
  });
};

export const countHistoryForKey = async (key: string): Promise<number> => {
  const content = await findUniqueContentByKey(key);

  if (!content) throw new Error("Content not found");

  return prisma.siteContentHistory.count({
    where: { contentId: content.id },
  });
};

export const contentKeyExists = async (key: string): Promise<boolean> => {
  const content = await findUniqueContentByKey(key);
  return !!content;
};

export const getContentUpdatedAfter = async (date: Date): Promise<SiteContent[]> =>
  prisma.siteContent.findMany({
    where: { updatedAt: { gt: date } },
    orderBy: { updatedAt: "desc" },
  });

export const getAllContentWithoutHistories = async (): Promise<SiteContent[]> =>
  prisma.siteContent.findMany({
    where: { siteContentHist: { none: {} } },
    orderBy: { updatedAt: "desc" },
  });
