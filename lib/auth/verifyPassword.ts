async function verifyPassword(
  plainText: string,
  hashedPassword: string
): Promise<boolean> {
  return Bun.password.verify(plainText, hashedPassword);
}

export default verifyPassword;
