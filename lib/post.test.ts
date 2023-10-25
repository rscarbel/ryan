import { expect, test, describe, afterEach, beforeEach } from "bun:test";
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
import { UserRole, PrismaClient } from "@prisma/client";

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
  beforeEach(async () => {
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

  test("getPostById returns a post by its ID", async () => {
    const posts = await getPosts();
    const post = await getPostById(posts[0].id);
    expect(post).not.toBeNull();
    expect(post!.id).toBe(posts[0].id);
  });

  test("createPost creates a new post", async () => {
    const author = await prisma.user.create({
      data: {
        email: "mark@example.com",
        name: "Mark",
        roles: [UserRole.USER],
      },
    });
    const newPost = await createPost({
      title: "Created Post",
      content: "This is created for testing.",
      authorId: author.id,
    });
    expect(newPost.title).toBe("Created Post");
    expect(newPost.content).toBe("This is created for testing.");
  });

  test("updatePost updates an existing post", async () => {
    const posts = await getPosts();
    const updatedPost = await updatePost(posts[0].id, {
      title: "Updated Post",
    });
    expect(updatedPost.title).toBe("Updated Post");
  });

  test("searchPostsByTitle searches for posts by title", async () => {
    const posts = await searchPostsByTitle("Sample Post 1");
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toContain("Sample Post 1");
  });

  test("softDeletePostById soft deletes a post", async () => {
    const posts = await getPosts();
    await softDeletePostById(posts[0].id);
    const deletedPost = await getPostById(posts[0].id);
    expect(deletedPost!.deletedAt).not.toBeNull();
  });

  test("restoreDeletedPost restores a soft deleted post", async () => {
    const posts = await getPosts();
    await softDeletePostById(posts[0].id);
    await restoreDeletedPost(posts[0].id);
    const restoredPost = await getPostById(posts[0].id);
    expect(restoredPost!.deletedAt).toBeNull();
  });

  test("hardDeletePostById hard deletes a post", async () => {
    const posts = await getPosts();
    await hardDeletePostById(posts[0].id);
    const postAfterDeletion = await getPostById(posts[0].id);
    expect(postAfterDeletion).toBeNull();
  });

  test("getPostsByTag returns posts by tag", async () => {
    const posts = await getPostsByTag("TestTag1");
    expect(posts).not.toHaveLength(0);
    expect(posts[0].tags[0].tag.name).toBe("TestTag1");
  });

  test("getPostsByDateRange returns posts within a date range", async () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);
    const posts = await getPostsByDateRange(startDate, endDate);
    expect(posts).toHaveLength(2);
  });

  test("getDeletedPosts returns soft deleted posts", async () => {
    const posts = await getPosts();
    await softDeletePostById(posts[0].id);
    const deletedPosts = await getDeletedPosts();
    expect(deletedPosts).toHaveLength(1);
  });

  test("getPostCountByAuthor returns post count for a specific author", async () => {
    const author = await prisma.user.findFirst({
      where: { email: "john@example.com" },
    });

    if (!author) {
      throw new Error("John Doe not found");
    }

    const count = await getPostCountByAuthor(author.id);
    expect(count).toBe(2);
  });
});
