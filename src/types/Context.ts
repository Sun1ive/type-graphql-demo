import { Request, Response } from 'express';

interface IUser {
  userId: string;
  exp: number;
}

interface IExtendedRequest extends Request {
  user: IUser;
}

export interface IContext {
  req: IExtendedRequest;
  res: Response;
}
