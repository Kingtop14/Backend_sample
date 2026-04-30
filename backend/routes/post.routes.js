import { Router } from 'express';
import { createPost, getPosts, updatePost, deletePost} from '../controller/post.controller.js';

const router = Router();

// Route to create a new post
router.route('/create').post(createPost);
router.route('/getposts').get(getPosts);
router.route('/update/:id').patch(updatePost);
router.route('/delete/:id').delete(deletePost);

export default router;