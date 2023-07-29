import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ApiError } from '../errors';
import { waitlistModel } from '../waitlist';
import { UpdateWaitlistBody, IWaitlistDoc, NewRegisteredWaitlist } from './waitlist.interface';

/**
 * Register as waitlist
 * @param {NewRegisteredWaitlist} waitlistBody
 * @returns {Promise<IWaitlistDoc| null>}
 */
export const registerWaitlist = async (waitlistBody: NewRegisteredWaitlist): Promise<IWaitlistDoc> => {
    return waitlistModel.create(waitlistBody);
};

/**
 * Get waitlist by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IWaitlistDoc | null>}
 */
export const getWaitlistById = async (id: mongoose.Types.ObjectId): Promise<IWaitlistDoc | null> => waitlistModel.findById(id);

  /**
   * Get waitlist by email
   * @param {string} email
   * @returns {Promise<IWaitlistDoc | null>}
   */
  export const getWaitlistByEmail = async (email: string): Promise<IWaitlistDoc | null> => waitlistModel.findOne({ email });
  

/**
 * Get all waitlists
 * @returns {Promis<IWaitlistDoc[] | null>}
 */
export const getAllWaitlists = async(): Promise<IWaitlistDoc[] | null> =>{
  const waitlists = await waitlistModel.find();
  return waitlists;
};

  /**
   * Update waitlist by id
   * @param {mongoose.Types.ObjectId} waitlistId
   * @param {UpdateWaitlistBody} updateBody
   * @returns {Promise<IWaitlistDoc | null>}
   */
  export const updateWaitlistById = async (
    waitlistId: mongoose.Types.ObjectId,
    updateBody: UpdateWaitlistBody
  ): Promise<IWaitlistDoc | null> => {
    const waitlist = await getWaitlistById(waitlistId);
    if (!waitlist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Waitlist not found');
    }
    if (updateBody.email) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(waitlist, updateBody);
    await waitlist.save();
    return waitlist;
  };
  
  /**
   * Delete waitlist by id
   * @param {mongoose.Types.ObjectId} waitlistId
   * @returns {Promise<IWaitlistDoc | null>}
   */
  export const deleteWaitlistById = async (waitlistId: mongoose.Types.ObjectId): Promise<IWaitlistDoc | null> => {
    const waitlist = await getWaitlistById(waitlistId);
    if (!waitlist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Waitlist not found');
    }
    await waitlist.deleteOne();
    return waitlist;
  };