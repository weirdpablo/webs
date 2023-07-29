import Joi from 'joi';
import { objectId } from '../validate/custom.validation';
import { NewCreatedWaitlist } from './waitlist.interface';

const createWaitlistBody: Record<keyof NewCreatedWaitlist, any> = {
  email: Joi.string().required().email(),
  name: Joi.string().required(),
  role: Joi.string().required()
};

export const createWaitlist = {
  body: Joi.object().keys(createWaitlistBody),
};

export const getWaitlists = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getWaitlist = {
  params: Joi.object().keys({
    waitlistId: Joi.string().custom(objectId),
  }),
};

export const updateWaitlist = {
  params: Joi.object().keys({
    waitlistId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      name: Joi.string(),
    })
    .min(1),
};

export const deleteWaitlist = {
  params: Joi.object().keys({
    waitlistId: Joi.string().custom(objectId),
  }),
};
