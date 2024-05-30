import { Request, Response } from 'express';
import { CreatePostDto, DeletePostDto, FilterPostDto, PaginationDto, UpdatePostDto } from '../../domain';
import { PostService } from '../services/post.service';
import { Utilities } from '../utilities/utilities';



export class PostController {

  constructor(
    private readonly postService: PostService
  ) {}


  createPost = (req: Request, res: Response) => {
    const [error, createPostDto] = CreatePostDto.create({...req.body, user:req.body.user.id});
    if (error) return res.status(400).json({error});
    this.postService.createPost(createPostDto!)
      .then(post => res.status(201).json(post))
      .catch(error => Utilities.handleError(error, res));
  }

  getPosts = (req: Request, res: Response) => {
    const {page = 1, limit =10, tag="", category=""} = req.query
    const [error, paginationDto] = PaginationDto.create(+page, +limit)
    if (error) return res.status(400).json({error})
    const [errorFilter, filterPostDto] = FilterPostDto.create(tag as string, category as string);
    if (errorFilter) return res.status(400).json({errorFilter})
    this.postService.getPosts(paginationDto!, filterPostDto!)
      .then(posts => res.json(posts))
      .catch(error => Utilities.handleError(error, res))

  }

  deletePost = (req: Request, res: Response) => {
    const [error, deletePostDto] = DeletePostDto.create({...req.body, user:req.body.user.id});
    if (error) return res.status(400).json({error})
    this.postService.deletePost(deletePostDto!)
      .then(post => res.json(post))
      .catch(error => Utilities.handleError(error, res))

  }

  updatePost = (req: Request, res: Response) => {
    const [error, updatePostDto] = UpdatePostDto.create({...req.body, user:req.body.user.id});
    if (error) return res.status(400).json({error})
    this.postService.updatePost(updatePostDto!)
      .then(post => res.json(post))
      .catch(error => Utilities.handleError(error, res))

  }





}