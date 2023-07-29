import mongoose, { Model, Document } from 'mongoose';
import { AccessAndRefreshTokens } from '../token/token.interfaces';

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface IUserDoc extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
}

export type UpdateUserBody = Partial<IUser>;

export type NewRegisteredUser = Omit<IUser, 'role' >;

export type NewCreatedUser = IUser;

export interface IUserWithTokens {
  user: IUserDoc;
  tokens: AccessAndRefreshTokens;     
}
