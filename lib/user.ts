import { PrismaClient, User, PasswordResetToken, Post } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Create a new user.
 *
 * @param email User's email.
 * @param passwordHash Hashed password.
 * @param name User's name.
 */
export async function createUser(
  email: string,
  passwordHash: string,
  name: string
): Promise<User> {
  return prisma.user.create({
    data: {
      email: email,
      passwordHash: passwordHash,
      name: name,
    },
  });
}

/**
 * Update user details.
 *
 * @param userId ID of the user.
 * @param data Updated data for the user.
 */
export async function updateUser(
  userId: number,
  data: Partial<User>
): Promise<User> {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: data,
  });
}

/**
 * Soft delete a user by setting the deletedAt timestamp.
 *
 * @param userId ID of the user.
 */
export async function softDeleteUser(userId: number): Promise<User> {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}

/**
 * Find user by ID.
 *
 * @param userId ID of the user to be found.
 */
export async function findUserById(userId: number): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

/**
 * Check if a password reset token is valid (not used and not expired).
 *
 * @param token Password reset token.
 */
export async function isTokenValid(token: string): Promise<boolean> {
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: {
      token: token,
    },
  });

  if (!resetToken) return false;

  return resetToken.used === false && resetToken.expiry > new Date();
}

/**
 * Get all posts by a user.
 *
 * @param userId ID of the user.
 */
export async function getPostsByUser(userId: number): Promise<Post[]> {
  return prisma.post.findMany({
    where: {
      authorId: userId,
    },
  });
}

/**
 * Find user by email.
 *
 * @param email Email of the user to be found.
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

/**
 * Create a password reset token for a user.
 *
 * @param userId ID of the user.
 * @param token Generated token.
 * @param expiry Expiry date and time for the token.
 */
export async function createPasswordResetToken(
  userId: number,
  token: string,
  expiry: Date
): Promise<void> {
  await prisma.passwordResetToken.create({
    data: {
      userId: userId,
      token: token,
      expiry: expiry,
    },
  });
}

/**
 * Find a password reset token by token value.
 *
 * @param token Password reset token to be found.
 */
export async function findPasswordResetToken(
  token: string
): Promise<PasswordResetToken | null> {
  return prisma.passwordResetToken.findUnique({
    where: {
      token: token,
    },
  });
}

/**
 * Mark a password reset token as used.
 *
 * @param tokenId ID of the token to be marked.
 */
export async function markTokenAsUsed(tokenId: number): Promise<void> {
  await prisma.passwordResetToken.update({
    where: {
      id: tokenId,
    },
    data: {
      used: true,
    },
  });
}
