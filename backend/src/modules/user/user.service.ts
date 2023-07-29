import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ApiError } from '../errors';
import { userModel } from '../user';
import { UpdateUserBody, IUserDoc, NewRegisteredUser } from './user.interfaces';

const isEmailTaken = async(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean> => {
    const student = await userModel.findOne({ email, _id: { $ne: excludeUserId } });
    return !!student;
}

/**
 * Register as student
 * @param {NewRegisteredUser} studentBody
 * @returns {Promise<IUserDoc| null>}
 */
export const registerUser = async (studentBody: NewRegisteredUser): Promise<IUserDoc> => {
    if (await isEmailTaken(studentBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return userModel.create(studentBody);
};

/**
 * Get user by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IUserDoc | null>}
 */
export const getUserById = async (id: mongoose.Types.ObjectId): Promise<IUserDoc | null> => userModel.findById(id);

  /**
   * Get user by email
   * @param {string} email
   * @returns {Promise<IUserDoc | null>}
   */
  export const getUserByEmail = async (email: string): Promise<IUserDoc | null> => userModel.findOne({ email });
  

/**
 * Get all students
 * @returns {Promis<IUserDoc[] | null>}
 */
export const getAllUsers = async(): Promise<IUserDoc[] | null> =>{
  const students = await userModel.find();
  return students;
};

  /**
   * Update user by id
   * @param {mongoose.Types.ObjectId} userId
   * @param {UpdateUserBody} updateBody
   * @returns {Promise<IUserDoc | null>}
   */
  export const updateUserById = async (
    userId: mongoose.Types.ObjectId,
    updateBody: UpdateUserBody
  ): Promise<IUserDoc | null> => {
    const user = await getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (updateBody.email && (await isEmailTaken(updateBody.email, userId))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
  };
  
  /**
   * Delete user by id
   * @param {mongoose.Types.ObjectId} userId
   * @returns {Promise<IUserDoc | null>}
   */
  export const deleteUserById = async (userId: mongoose.Types.ObjectId): Promise<IUserDoc | null> => {
    const user = await getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await user.deleteOne();
    return user;
  };