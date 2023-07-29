import mongoose, { Model, Document } from 'mongoose';
import { AccessAndRefreshTokens } from '../token/token.interfaces';

export interface IWaitlist {
  name: string;
  email: string;
  role: string;
}

export interface IWaitlistDoc extends IWaitlist, Document {
}

export interface IWaitlistModel extends Model<IWaitlistDoc> {
}

export type UpdateWaitlistBody = Partial<IWaitlist>;

export type NewRegisteredWaitlist = Omit<IWaitlist, 'role' >;

export type NewCreatedWaitlist = IWaitlist;

export interface IWaitlistWithTokens {
  user: IWaitlistDoc;
  tokens: AccessAndRefreshTokens;     
}
