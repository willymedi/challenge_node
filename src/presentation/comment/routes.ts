import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CommentController } from './controller';
import { CommentService } from '../services/comment.service';



export class CommentRoutes {


  static get routes(): Router {

    const router = Router();
    const commentService = new CommentService();
    const controller = new CommentController(commentService);
    
    router.get('/', controller.getComments);
    router.post('/', [AuthMiddleware.validateJWT] ,controller.createComment);
    router.delete('/', [AuthMiddleware.validateJWT] ,controller.deleteComment);
    router.put('/', [AuthMiddleware.validateJWT] ,controller.updateComment);



    return router;
  }


}

