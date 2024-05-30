import { Router } from 'express';
import { Authroutes } from './auth/routes';
import { CategoryRoutes } from './category/routes';
import { TagRoutes } from './tag/routes';
import { PostRoutes } from './post/routes';
import { CommentRoutes } from './comment/routes';





export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    router.use('/api/auth', Authroutes.routes );
    router.use('/api/tags', TagRoutes.routes);
    router.use('/api/categories', CategoryRoutes.routes);
    router.use('/api/posts', PostRoutes.routes)
    router.use('/api/comments', CommentRoutes.routes)



    return router;
  }


}

