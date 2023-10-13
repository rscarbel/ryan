import { expect, test, describe, afterEach, beforeEach } from "bun:test";
import {
  getContentByKey,
  getAllContent,
  getContentHistoryByKey,
  updateContentByKey,
  createContent,
  deleteAllHistoryForKey,
  deleteContentByKey,
  getAllContentWithoutHistories,
  getContentUpdatedAfter,
  getLatestHistoryByKey,
  contentKeyExists,
  countHistoryForKey,
} from "./siteContent";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeEach(async () => {
  await prisma.siteContent.deleteMany();
  await prisma.siteContentHistory.deleteMany();
});

afterEach(async () => {
  await prisma.siteContent.deleteMany();
  await prisma.siteContentHistory.deleteMany();
});

describe("siteContent", () => {
  test("getContentByKey", async () => {
    const content = await createContent("testKey", "testMarkup");
    const fetchedContent = await getContentByKey("testKey");
    expect(fetchedContent).toEqual(content);
  });

  test("getAllContent", async () => {
    await createContent("key1", "content1");
    await createContent("key2", "content2");
    const allContent = await getAllContent();
    expect(allContent.length).toEqual(2);
  });

  test("createContent", async () => {
    const content = await createContent("testKey", "testMarkup");
    expect(content.key).toBe("testKey");
    expect(content.content).toBe("testMarkup");
  });

  test("updateContentByKey", async () => {
    await createContent("testKey", "testMarkup");
    const updatedContent = await updateContentByKey("testKey", "newMarkup");
    expect(updatedContent.content).toBe("newMarkup");
  });

  test("deleteContentByKey", async () => {
    await createContent("testKey", "testMarkup");
    await deleteContentByKey("testKey");
    const content = await getContentByKey("testKey");
    expect(content).toBeNull();
  });

  test("getContentHistoryByKey", async () => {
    const content = await createContent("testKey", "testMarkup");
    await updateContentByKey("testKey", "newMarkup");
    const history = await getContentHistoryByKey("testKey");
    expect(history[0].content).toBe("testMarkup");
  });

  test("deleteAllHistoryForKey", async () => {
    const content = await createContent("testKey", "testMarkup");
    await updateContentByKey("testKey", "newMarkup");
    await deleteAllHistoryForKey("testKey");
    const history = await getContentHistoryByKey("testKey");
    expect(history.length).toEqual(0);
  });

  test("getLatestHistoryByKey", async () => {
    const content = await createContent("testKey", "testMarkup");
    await updateContentByKey("testKey", "newMarkup");
    const latestHistory = await getLatestHistoryByKey("testKey");

    if (latestHistory) {
      expect(latestHistory.content).toBe("testMarkup");
    } else {
      throw new Error("Expected latestHistory to be not null.");
    }
  });

  test("countHistoryForKey", async () => {
    const content = await createContent("testKey", "testMarkup");
    await updateContentByKey("testKey", "newMarkup");
    const count = await countHistoryForKey("testKey");
    expect(count).toBe(1);
  });

  test("contentKeyExists", async () => {
    await createContent("testKey", "testMarkup");
    const exists = await contentKeyExists("testKey");
    expect(exists).toBe(true);
  });

  test("getContentUpdatedAfter", async () => {
    const earlierDate = new Date(Date.now() - 1000 * 60 * 60);
    await createContent("testKey", "testMarkup");
    const updatedContent = await getContentUpdatedAfter(earlierDate);
    expect(updatedContent.length).toBe(1);
  });

  test("getAllContentWithoutHistories", async () => {
    const contentWithHistory = await createContent("key1", "content1");
    await updateContentByKey("key1", "newMarkup1");
    await createContent("key2", "content2");
    const contentWithoutHistory = await getAllContentWithoutHistories();
    expect(contentWithoutHistory.length).toBe(1);
    expect(contentWithoutHistory[0].key).toBe("key2");
  });
});
