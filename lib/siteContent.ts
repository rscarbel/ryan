import { PrismaClient, SiteContent, SiteContentHistory } from "@prisma/client";
const prisma = new PrismaClient();

export async function getContentByKey(
  key: string
): Promise<SiteContent | null> {
  return await prisma.siteContent.findUnique({
    where: { key: key },
  });
}

export async function getAllContent(): Promise<SiteContent[]> {
  return await prisma.siteContent.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

export async function createContent(
  key: string,
  markup: string
): Promise<SiteContent> {
  return await prisma.siteContent.create({
    data: { key: key, markup: markup },
  });
}

export async function updateContentByKey(
  key: string,
  newMarkup: string
): Promise<SiteContent> {
  const content = await prisma.siteContent.findUnique({
    where: { key: key },
  });

  if (!content) throw new Error("Content not found");

  const historyRecordPromise = prisma.siteContentHistory.create({
    data: {
      contentId: content.id,
      markup: content.markup,
    },
  });

  const updateRecordPromise = prisma.siteContent.update({
    where: { key: key },
    data: { markup: newMarkup },
  });

  const [_, updatedContent] = await prisma.$transaction([
    historyRecordPromise,
    updateRecordPromise,
  ]);

  return updatedContent;
}

export async function deleteContentByKey(key: string): Promise<SiteContent> {
  return await prisma.siteContent.delete({
    where: { key: key },
  });
}

export async function getContentHistoryByKey(
  key: string
): Promise<SiteContentHistory[]> {
  const content = await prisma.siteContent.findUnique({
    where: { key: key },
  });

  if (!content) throw new Error("Content not found");

  return await prisma.siteContentHistory.findMany({
    where: { contentId: content.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteAllHistoryForKey(key: string): Promise<void> {
  const content = await prisma.siteContent.findUnique({
    where: { key: key },
  });

  if (!content) throw new Error("Content not found");

  await prisma.siteContentHistory.deleteMany({
    where: { contentId: content.id },
  });
}

export async function getLatestHistoryByKey(
  key: string
): Promise<SiteContentHistory | null> {
  const content = await prisma.siteContent.findUnique({
    where: { key: key },
  });

  if (!content) throw new Error("Content not found");

  return await prisma.siteContentHistory.findFirst({
    where: { contentId: content.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function countHistoryForKey(key: string): Promise<number> {
  const content = await prisma.siteContent.findUnique({
    where: { key: key },
  });

  if (!content) throw new Error("Content not found");

  return await prisma.siteContentHistory.count({
    where: { contentId: content.id },
  });
}

export async function contentKeyExists(key: string): Promise<boolean> {
  const content = await prisma.siteContent.findUnique({
    where: { key: key },
  });

  return !!content;
}

export async function getContentUpdatedAfter(
  date: Date
): Promise<SiteContent[]> {
  return await prisma.siteContent.findMany({
    where: { updatedAt: { gt: date } },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getAllContentWithoutHistories(): Promise<SiteContent[]> {
  return await prisma.siteContent.findMany({
    where: { siteContentHist: { none: {} } },
    orderBy: { updatedAt: "desc" },
  });
}
