import { sign, verify, decode } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'SUPERSECRET';

export const generateToken = ({ userId }: { userId: string }): string =>
  sign({ id: userId }, JWT_SECRET, {
    expiresIn: '1h'
  });

// TODO: finish this func
export const verifyToken = (token: string) => {
  try {
    const decoded = decode(token, {
      json: true
    });

    console.log(decoded);

    verify(token, JWT_SECRET);
  } catch (error) {
    console.log(error);
  }
};
