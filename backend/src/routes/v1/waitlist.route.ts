import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { waitlistController, waitlistValidation } from '../../modules/waitlist';

const router: Router = express.Router();

router
  .route('/')
  .post(validate(waitlistValidation.createWaitlist), waitlistController.createWaitlist)
  .get(validate(waitlistValidation.getWaitlists), waitlistController.getWaitlists);

router
  .route('/:waitlistId')
  .get(validate(waitlistValidation.getWaitlist), waitlistController.getWaitlist)
  .patch(validate(waitlistValidation.updateWaitlist), waitlistController.updateWaitlist)
  .delete(validate(waitlistValidation.deleteWaitlist), waitlistController.deleteWaitlist);

export default router;