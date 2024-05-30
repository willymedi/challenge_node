
import { CategoryModel, PostModel } from "../../data/mongo";
import { TagModel } from "../../data/mongo/models/tag.model";
import { CreatePostDto, CustomError, DeletePostDto, FilterPostDto, PaginationDto, UpdatePostDto } from "../../domain";


export class PostService {

    constructor() {}

    async createPost(createProductDto: CreatePostDto) {

        try {
            const post = new PostModel(createProductDto)

            await post.save();

            return post;

        }
        catch(error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    defaultResponse(page:number, limit:number, tag: string, category: string, total: number, posts: any[]) {
        return {
            page: page,
            limit: limit,
            total: total,
            next: `/api/posts?page=${(page +1)}&limit=${limit}&category=${category}&tag=${tag}`,
            prev: (page -1 > 0) ? `/api/posts?page=${(page -1)}&limit=${limit}&category=${category}&tag=${tag}`: null,
            posts: posts
        }
    }

    async getPosts(paginationDto: PaginationDto, filterPostDto: FilterPostDto) {
        const {page, limit} = paginationDto;
        const {tag, category} = filterPostDto;
        try {
            const filter: any = {available:true};
            if (tag) {
                const tagDoc = await TagModel.findOne({name: tag})
                if (!tagDoc) {
                    return this.defaultResponse(page, limit, tag, category, 0, [])
                }
                filter.tags = tagDoc._id
            }
            if (category) {
                const categoryDoc = await CategoryModel.findOne({name: category})
                console.log(categoryDoc)
                if (!categoryDoc) {
                    return this.defaultResponse(page, limit, tag, category, 0, [])
                }
                filter.category = categoryDoc._id
            }
            const [total, posts] = await Promise.all([
                PostModel.countDocuments(filter),
                PostModel.find(filter)
                    .skip((page -1) *limit)
                    .limit(limit)
                    .populate('user')
                    .populate('category')
                    .populate('tags')
            ])
            return this.defaultResponse(page, limit, tag, category, total, posts);
            
        }
        catch(error) {
            throw CustomError.internalServer('Internal Server Error')
        }
        
    }

    async deletePost(deletePostDto: DeletePostDto) {
        const post = await PostModel.findById(deletePostDto.post)
        if (!post) throw CustomError.badRequest('Post not exist');
        if (!post.available) throw CustomError.badRequest('Post is already deleted');

        if (post.user.toString() !== deletePostDto.user.toString()) throw CustomError.badRequest("You cannot delete is not your post");
        try{
            post.available = false;
            await post.save()
            return post;

            
        }
        catch(error) {
            throw CustomError.internalServer('Internal Server Error')
        }
        
    }

    async updatePost(updatePostDto: UpdatePostDto) {
        const post = await PostModel.findById(updatePostDto.post)
        if (!post) throw CustomError.badRequest('Post not exist');
        if (!post.available) throw CustomError.badRequest('Post is not available');
        if (post.user.toString() !== updatePostDto.user.toString()) throw CustomError.badRequest("You cannot update is not your post");
        try {
            const result = await PostModel.findByIdAndUpdate(
                updatePostDto.post,
                { ...updatePostDto, updatedAt: new Date() },
                { new: true, runValidators: true }
              );
            return result;
        }
        catch(error) {
            throw CustomError.internalServer('Internal Server Error')
        }


    }
}