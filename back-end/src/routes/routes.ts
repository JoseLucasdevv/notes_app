import { Router } from 'express';
import authController from '../controllers/AuthController/authController';
import { registerController } from '../controllers/UserController/Register/registerController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import {
    createPost,
    deletePost,
    getAllPosts,
    updatePost,
} from '../controllers/PostController/postController';

const router = Router();

router.post('/login', authController);

router.post('/register', registerController);

router.post('/post', ensureAuthenticated, createPost);
router.get('/post', ensureAuthenticated, getAllPosts);
router.put('/post/:_id', ensureAuthenticated, updatePost);
router.delete('/post/:_id', ensureAuthenticated, deletePost);

export default router;
