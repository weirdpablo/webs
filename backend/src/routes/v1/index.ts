import express, { Router } from 'express';
import authRoute from './auth.route';
import waitlistRoute from './waitlist.route';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
//   {
//     path: '/auth',
//     route: authRoute,
//   },
  {
    path: '/waitlist',
    route: waitlistRoute,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
