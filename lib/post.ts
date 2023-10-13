import { PrismaClient, Post, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getPosts = async (): Promise<Post[]> => {
  return prisma.post.findMany({
    where: { deletedAt: null },
    include: {
      comments: true,
      tags: { select: { tag: true } },
      author: true,
      editHistory: true,
      metadata: true,
    },
  });
};

export const getPostById = async (id: number): Promise<Post | null> => {
  return prisma.post.findUnique({
    where: { id },
    include: {
      comments: true,
      tags: { select: { tag: true } },
      author: true,
      editHistory: true,
      metadata: true,
    },
  });
};

export const createPost = async (
  data: Prisma.PostCreateInput
): Promise<Post> => {
  return prisma.post.create({ data });
};

export const updatePost = async (
  id: number,
  data: Prisma.PostUpdateInput
): Promise<Post> => {
  return prisma.post.update({
    where: { id },
    data,
  });
};

export const softDeletePostById = async (id: number): Promise<Post> => {
  return prisma.post.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
};

export const restoreDeletedPost = async (id: number): Promise<Post> => {
  return prisma.post.update({
    where: { id },
    data: {
      deletedAt: null,
    },
  });
};

export const hardDeletePostById = async (id: number): Promise<Post> => {
  return prisma.post.delete({
    where: { id },
  });
};

export const getPostsByAuthorId = async (authorId: number): Promise<Post[]> => {
  return prisma.post.findMany({
    where: {
      authorId,
      deletedAt: null,
    },
    include: {
      comments: true,
      tags: { select: { tag: true } },
      author: true,
      editHistory: true,
      metadata: true,
    },
  });
};

export const getPostsByTag = async (tagName: string): Promise<Post[]> => {
  return prisma.post.findMany({
    where: {
      tags: {
        some: {
          tag: { name: tagName },
        },
      },
      deletedAt: null,
    },
    include: {
      comments: true,
      tags: { select: { tag: true } },
      author: true,
      editHistory: true,
      metadata: true,
    },
  });
};

export const searchPostsByTitle = async (
  searchTerm: string
): Promise<Post[]> => {
  return prisma.post.findMany({
    where: {
      title: {
        contains: searchTerm,
        mode: "insensitive", // case-insensitive search
      },
      deletedAt: null,
    },
    include: {
      comments: true,
      tags: { select: { tag: true } },
      author: true,
      editHistory: true,
      metadata: true,
    },
  });
};

export const getPostsByDateRange = async (
  startDate: Date,
  endDate: Date
): Promise<Post[]> => {
  return prisma.post.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
      deletedAt: null,
    },
    include: {
      comments: true,
      tags: { select: { tag: true } },
      author: true,
      editHistory: true,
      metadata: true,
    },
  });
};

export const getDeletedPosts = async (): Promise<Post[]> => {
  return prisma.post.findMany({
    where: { deletedAt: { not: null } },
    include: {
      comments: true,
      tags: { select: { tag: true } },
      author: true,
      editHistory: true,
      metadata: true,
    },
  });
};

export const getPostCountByAuthor = async (
  authorId: number
): Promise<number> => {
  return prisma.post.count({
    where: {
      authorId,
      deletedAt: null,
    },
  });
};
