import { Router } from 'express';
import { userRoutes } from './user';
import { emailRoutes } from './email';
import { authRoutes } from './auth';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);
router.use('/api/email', emailRoutes);

export { router };
