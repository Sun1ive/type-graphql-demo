import { v4 } from 'uuid';
export const createConfirmationToken = () => {
  const token = v4();

  return `http://locahost:3001/user/confirm/${token}`;
};
