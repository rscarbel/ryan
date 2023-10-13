import { expect, test, describe, afterEach, beforeAll } from "bun:test";
import {
  getPosts,
  getDeletedPosts,
  getPostById,
  getPostCountByAuthor,
  getPostsByAuthorId,
  getPostsByDateRange,
  getPostsByTag,
  createPost,
  updatePost,
  searchPostsByTitle,
  softDeletePostById,
  restoreDeletedPost,
  hardDeletePostById,
} from "./post";
import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function seedDatabase() {
  const author = await prisma.user.create({
    data: {
      email: "john@example.com",
      name: "John Doe",
      roles: [UserRole.USER],
    },
  });

  const tag1 = await prisma.tag.create({ data: { name: "TestTag1" } });
  const tag2 = await prisma.tag.create({ data: { name: "TestTag2" } });

  const post1 = await prisma.post.create({
    data: {
      title: "Sample Post 1",
      content: "This is a sample content 1.",
      authorId: author.id,
    },
  });

  await prisma.postToTag.create({
    data: {
      postId: post1.id,
      tagId: tag1.id,
    },
  });

  await prisma.postToTag.create({
    data: {
      postId: post1.id,
      tagId: tag2.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "Sample Post 2",
      content: "This is a sample content 2.",
      authorId: author.id,
    },
  });

  await prisma.postToTag.create({
    data: {
      postId: post2.id,
      tagId: tag2.id,
    },
  });
}

describe("post.ts functions", () => {
  beforeAll(async () => {
    await seedDatabase();
  });

  afterEach(async () => {
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
    await prisma.tag.deleteMany();
  });

  test("getPosts returns non-deleted posts", async () => {
    const posts = await getPosts();
    expect(posts).toHaveLength(2);
    expect(posts[0].deletedAt).toBeNull();
    expect(posts[1].deletedAt).toBeNull();
  });

  test("getPostsByAuthorId returns posts for a specific author", async () => {
    //before all function wasn't working here for some reason
    const author1 = await prisma.user.create({
      data: {
        email: "jane@example.com",
        name: "Jane Doe",
        roles: [UserRole.USER],
      },
    });
    await prisma.post.create({
      data: {
        title: "Sample Post 1",
        content: "This is a sample content 1.",
        authorId: author1.id,
      },
    });
    await prisma.post.create({
      data: {
        title: "Sample Post 2",
        content: "This is a sample content 2.",
        authorId: author1.id,
      },
    });
    const posts = await getPostsByAuthorId(author1!.id);
    expect(posts).toHaveLength(2);
    expect(posts[0].authorId).toBe(author1!.id);
  });
});
