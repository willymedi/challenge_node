import { Router } from 'express';
import { TagController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { TagService } from '../services/tag.service';




export class TagRoutes {


  static get routes(): Router {

    const router = Router();
    const tagService = new TagService();
    const controller = new TagController(tagService);

    router.get('/', controller.getTags);
    router.post('/', [AuthMiddleware.validateJWT] ,controller.createTag);



    return router;
  }


}

