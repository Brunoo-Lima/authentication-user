import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { AuthUserController } from './controllers/AuthUserController';

const router = Router();

router.post('/user', new CreateUserController().handle);
router.post('/me', new AuthUserController().handle);

export { router };
