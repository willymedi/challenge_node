import { TagModel } from "../../data/mongo/models/tag.model";
import { CreateTagDto, CustomError, PaginationDto } from "../../domain";


export class TagService {

    constructor() {}

    async createTag(createTagDTO: CreateTagDto) {
        const tagExists = await TagModel.findOne({name: createTagDTO.name});
        if (tagExists) throw CustomError.badRequest('Tag already exists');

        try {
            const tag = new TagModel(createTagDTO)

            await tag.save();

            return tag;

        }
        catch(error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async getTags(paginationDto: PaginationDto) {
        const {page, limit} = paginationDto;
        try{
            const [total, tags] = await Promise.all([
                TagModel.countDocuments(),
                TagModel.find()
                    .skip((page -1) *limit)
                    .limit(limit)
                    .populate('user')
            ])
            return {
                page: page,
                limit: limit,
                total: total,
                next: `/api/tags?page=${(page +1)}&limit=${limit}`,
                prev: (page -1 > 0) ? `/api/tags?page=${(page -1)}&limit=${limit}`: null,
                tags: tags
            }
        }
        catch(error) {
            throw CustomError.internalServer('Internal Server Error')
        }
        
    }
}