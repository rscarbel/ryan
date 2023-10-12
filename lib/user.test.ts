import { expect, test, describe, afterEach } from "bun:test";
import {
  createUser,
  updateUser,
  softDeleteUser,
  findUserById,
  isTokenValid,
  findUserByEmail,
  createPasswordResetToken,
  findPasswordResetToken,
  markTokenAsUsed,
} from "./user";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("User functions", () => {
  const sampleUser = {
    email: "test@example.com",
    passwordHash: "hashedpassword",
    name: "Test User",
  };

  afterEach(async () => {
    await prisma.user.deleteMany({ where: { email: "test@example.com" } });
  });

  const sampleToken = "sampleResetToken";

  test("createUser creates a user", async () => {
    const user = await createUser(
      sampleUser.email,
      sampleUser.passwordHash,
      sampleUser.name
    );
    expect(user.email).toBe(sampleUser.email);
    expect(user.name).toBe(sampleUser.name);
    expect(user.passwordHash).toBe(sampleUser.passwordHash);
  });

  test("updateUser updates a user", async () => {
    const user = await createUser(
      sampleUser.email,
      sampleUser.passwordHash,
      sampleUser.name
    );
    const updatedName = "Updated Name";
    const updatedUser = await updateUser(user.id, { name: updatedName });
    expect(updatedUser.name).toBe(updatedName);
  });

  test("softDeleteUser soft deletes a user", async () => {
    const user = await createUser(
      sampleUser.email,
      sampleUser.passwordHash,
      sampleUser.name
    );
    const deletedUser = await softDeleteUser(user.id);
    expect(deletedUser.deletedAt).toBeTruthy();
  });

  test("findUserById finds a user by ID", async () => {
    const user = await createUser(
      sampleUser.email,
      sampleUser.passwordHash,
      sampleUser.name
    );
    const foundUser = await findUserById(user.id);
    expect(foundUser?.id).toBe(user.id);
  });

  test("findUserByEmail finds a user by email", async () => {
    const user = await createUser(
      sampleUser.email,
      sampleUser.passwordHash,
      sampleUser.name
    );
    const foundUser = await findUserByEmail(sampleUser.email);
    expect(foundUser?.email).toBe(user.email);
  });

  test("isTokenValid checks token validity", async () => {
    const user = await createUser(
      sampleUser.email,
      sampleUser.passwordHash,
      sampleUser.name
    );
    const expiryDate = new Date(new Date().getTime() + 15 * 60000);
    await createPasswordResetToken(user.id, sampleToken, expiryDate);
    const isValid = await isTokenValid(sampleToken);
    expect(isValid).toBe(true);
  });

  test("createPasswordResetToken creates a reset token", async () => {
    const user = await createUser(
      sampleUser.email,
      sampleUser.passwordHash,
      sampleUser.name
    );
    const expiryDate = new Date(new Date().getTime() + 15 * 60000);
    await createPasswordResetToken(user.id, sampleToken, expiryDate);
    const token = await findPasswordResetToken(sampleToken);
    expect(token?.token).toBe(sampleToken);
  });

  test("markTokenAsUsed marks a token as used", async () => {
    const user = await createUser(
      sampleUser.email,
      sampleUser.passwordHash,
      sampleUser.name
    );
    const expiryDate = new Date(new Date().getTime() + 15 * 60000);
    await createPasswordResetToken(user.id, sampleToken, expiryDate);
    const token = await findPasswordResetToken(sampleToken);
    if (token) {
      await markTokenAsUsed(token.id);
      const updatedToken = await findPasswordResetToken(sampleToken);
      expect(updatedToken?.used).toBe(true);
    }
  });
});
