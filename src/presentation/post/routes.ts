import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { PostService } from '../services/post.service';
import { PostController } from './controller';



export class PostRoutes {


  static get routes(): Router {

    const router = Router();
    const postService = new PostService();
    const controller = new PostController(postService);
    
    router.get('/', controller.getPosts);
    router.post('/', [AuthMiddleware.validateJWT] ,controller.createPost);
    router.delete('/', [AuthMiddleware.validateJWT], controller.deletePost)
    router.put('/', [AuthMiddleware.validateJWT], controller.updatePost)



    return router;
  }


}

