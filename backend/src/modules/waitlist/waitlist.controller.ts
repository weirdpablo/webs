import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import * as waitlistService from './waitlist.service';
import { sendEmail } from '../utils/sendEmail';

export const createWaitlist = catchAsync(async (req: Request, res: Response) => {
  const waitlist = await waitlistService.registerWaitlist(req.body).then(()=>{
    sendEmail(req.body.email, 'Successfull Registration', { name: req.body.name }, "subscription-success.hbs" ) 
  })
  res.status(httpStatus.CREATED).send(waitlist);
});

export const getWaitlists = catchAsync(async (req: Request, res: Response) => {
  const waitlists = await waitlistService.getAllWaitlists();
  res.status(httpStatus.FOUND).send(waitlists);
});

export const getWaitlist = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['waitlistId'] === 'string') {
    const waitlist = await waitlistService.getWaitlistById(new mongoose.Types.ObjectId(req.params['waitlistId']));
    if (!waitlist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Waitlist not found');
    }
    res.send(waitlist);
  }
});

export const updateWaitlist = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['waitlistId'] === 'string') {
    const waitlist = await waitlistService.updateWaitlistById(new mongoose.Types.ObjectId(req.params['waitlistId']), req.body);
    res.send(waitlist);
  }
});

export const deleteWaitlist = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['waitlistId'] === 'string') {
    await waitlistService.deleteWaitlistById(new mongoose.Types.ObjectId(req.params['waitlistId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
