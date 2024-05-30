import { Request, Response } from 'express';
import { CreateTagDto, PaginationDto } from '../../domain';
import { TagService } from '../services/tag.service';
import { Utilities } from '../utilities/utilities';



export class TagController {


  constructor(
    private readonly tagService: TagService
  ) {}


  createTag = (req: Request, res: Response) => {
    const [error, createTagDto] = CreateTagDto.create({...req.body, user:req.body.user.id});
    if (error) return res.status(400).json({error});
    this.tagService.createTag(createTagDto!)
      .then(tag => res.status(201).json(tag))
      .catch(error => Utilities.handleError(error, res));
  }

  getTags = (req: Request, res: Response) => {
    const {page = 1, limit =10} = req.query
    const [error, paginationDto] = PaginationDto.create(+page, +limit)
    if (error) return res.status(400).json({error})
    this.tagService.getTags(paginationDto!)
      .then(tags => res.json(tags))
      .catch(error => Utilities.handleError(error, res));
  }





}