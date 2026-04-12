import { Router } from 'express';
import { userRoutes } from './user';
import { emailRoutes } from './email';

const router = Router();

router.use('/api/users', userRoutes);
router.use('/api/email', emailRoutes);

export { router };
