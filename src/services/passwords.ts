import { hash, compare } from 'bcrypt';

export const hashPassword = (password: string): Promise<string> =>
  hash(password, 12);

export const comparePasswords = (
  password: string,
  hashedPassword: string
): Promise<boolean> => compare(password, hashedPassword);
