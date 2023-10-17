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
  (contentKey: string): Promise<SiteContent | null>;
}

export const findUniqueContentByKey: FindUniqueContent = async (contentKey) => {
  return prisma.siteContent.findUnique({
    where: { contentKey },
  });
};

export const findOrCreateSiteContent = async (
  contentKey: string,
  content: string,
  format: SiteContentFormat
): Promise<SiteContent> => {
  const existingSiteContent = await findUniqueContentByKey(contentKey);

  if (existingSiteContent) return existingSiteContent;

  return prisma.siteContent.create({
    data: { contentKey, content, format },
  });
};

export const getContentByKey: FindUniqueContent = findUniqueContentByKey;

export const getAllContent = async (): Promise<SiteContent[]> =>
  prisma.siteContent.findMany({
    orderBy: { updatedAt: "desc" },
  });

export const createContent = async (
  contentKey: string,
  content: string,
  format: SiteContentFormat
): Promise<SiteContent> =>
  prisma.siteContent.create({
    data: { contentKey, content, format: format || "PLAIN_TEXT" },
  });

export const updateContentByKey = async (
  contentKey: string,
  newMarkup: string
): Promise<SiteContent> => {
  const content = await findUniqueContentByKey(contentKey);

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
      where: { contentKey },
      data: { content: newMarkup },
    }),
  ]);

  return updatedContent;
};

export const deleteContentByKey = async (
  contentKey: string
): Promise<SiteContent> => prisma.siteContent.delete({ where: { contentKey } });

export const getContentHistoryByKey = async (
  contentKey: string
): Promise<SiteContentHistory[]> => {
  const content = await findUniqueContentByKey(contentKey);

  if (!content) throw new Error("Content not found");

  return prisma.siteContentHistory.findMany({
    where: { contentId: content.id },
    orderBy: { createdAt: "desc" },
  });
};

export const deleteAllHistoryForKey = async (
  contentKey: string
): Promise<void> => {
  const content = await findUniqueContentByKey(contentKey);

  if (!content) throw new Error("Content not found");

  await prisma.siteContentHistory.deleteMany({
    where: { contentId: content.id },
  });
};

export const getLatestHistoryByKey = async (
  contentKey: string
): Promise<SiteContentHistory | null> => {
  const content = await findUniqueContentByKey(contentKey);

  if (!content) throw new Error("Content not found");

  return prisma.siteContentHistory.findFirst({
    where: { contentId: content.id },
    orderBy: { createdAt: "desc" },
  });
};

export const countHistoryForKey = async (
  contentKey: string
): Promise<number> => {
  const content = await findUniqueContentByKey(contentKey);

  if (!content) throw new Error("Content not found");

  return prisma.siteContentHistory.count({
    where: { contentId: content.id },
  });
};

export const contentKeyExists = async (
  contentKey: string
): Promise<boolean> => {
  const content = await findUniqueContentByKey(contentKey);
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
