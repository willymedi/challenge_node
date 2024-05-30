import { Request, Response } from 'express';
import { CreateCommentDto, DeleteCommenttDto, PaginationDto, UpdateCommentDto } from '../../domain';
import { Utilities } from '../utilities/utilities';
import { CommentService } from '../services/comment.service';



export class CommentController {

  constructor(
    private readonly commentService: CommentService
  ) {}


  createComment = (req: Request, res: Response) => {
    const [error, createCommentDto] = CreateCommentDto.create({...req.body, user:req.body.user.id});
    if (error) return res.status(400).json({error});
    this.commentService.createComment(createCommentDto!)
      .then(comment => res.status(201).json(comment))
      .catch(error => Utilities.handleError(error, res));
  }

  getComments = (req: Request, res: Response) => {
    const {page = 1, limit =10} = req.query
    const [error, paginationDto] = PaginationDto.create(+page, +limit)
    if (error) return res.status(400).json({error})
    this.commentService.getComments(paginationDto!)
      .then(comments => res.json(comments))
      .catch(error => Utilities.handleError(error, res))

  }

  deleteComment = (req: Request, res: Response) => {
    const [error, deleteCommentDto] = DeleteCommenttDto.create({...req.body, user:req.body.user.id});
    if (error) return res.status(400).json({error});
    this.commentService.deleteComment(deleteCommentDto!)
      .then(comment => res.status(200).json(comment))
      .catch(error => Utilities.handleError(error, res));
  }

  updateComment = (req: Request, res: Response) => {
    const [error, updateCommentDto] = UpdateCommentDto.create({...req.body, user:req.body.user.id});
    if (error) return res.status(400).json({error});
    this.commentService.updateComment(updateCommentDto!)
      .then(comment => res.status(200).json(comment))
      .catch(error => Utilities.handleError(error, res));
  }


  





}