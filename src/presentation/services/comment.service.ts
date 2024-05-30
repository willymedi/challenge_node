import { CommentModel, PostModel } from "../../data/mongo";
import { CreateCommentDto, CustomError, DeleteCommenttDto, PaginationDto, UpdateCommentDto } from "../../domain";


export class CommentService {

    constructor() {}

    async createComment(createCommentDto: CreateCommentDto) {

        try {
            const post = await PostModel.findById(createCommentDto.post);
            if (!post) throw CustomError.badRequest('Post not exist');
            if (!post.available) throw CustomError.badRequest("Post is not available")
            const comment = new CommentModel(createCommentDto)

            await comment.save();

            post.comments.push(comment.id);
            await post.save();

            return comment;

        }
        catch(error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async getComments(paginationDto: PaginationDto) {
        const {page, limit} = paginationDto;
        try{
            const [total, comments] = await Promise.all([
                CommentModel.countDocuments({available:true}),
                CommentModel.find({available:true})
                    .skip((page -1) *limit)
                    .limit(limit)
                    .populate('user')
            ])
            return {
                page: page,
                limit: limit,
                total: total,
                next: `/api/comments?page=${(page +1)}&limit=${limit}`,
                prev: (page -1 > 0) ? `/api/comments?page=${(page -1)}&limit=${limit}`: null,
                comments: comments
            }
            
        }
        catch(error) {
            throw CustomError.internalServer('Internal Server Error')
        }
        
    }

    async deleteComment(deleteCommentDto: DeleteCommenttDto) {
        const comment = await CommentModel.findById(deleteCommentDto.comment);
        if (!comment) throw CustomError.badRequest("Comment not exists");
        if (!comment.available) throw CustomError.badRequest("Comment is already deleted");
        if (comment.user.toString() !== deleteCommentDto.user.toString()) throw CustomError.badRequest("You cannot delete is not your comment");
        try {
            comment.available = false;
            await comment.save();
            await PostModel.updateOne(
                { comments: comment.id },
                { $pull: { comments:  comment.id } }
            );

            return comment;

        }
        catch(error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async updateComment(updateCommentDto: UpdateCommentDto) {
        const comment = await CommentModel.findById(updateCommentDto.comment)
        if (!comment) throw CustomError.badRequest('Comment not exist');
        if (!comment.available) throw CustomError.badRequest('Commment is not available')
        if (comment.user.toString() !==updateCommentDto.user.toString()) throw CustomError.badRequest("You cannot update is not your comment");
        
        try {
            const result = await CommentModel.findByIdAndUpdate(
                updateCommentDto.comment,
                { ...updateCommentDto, updatedAt: new Date() },
                { new: true, runValidators: true }
              );
            return result;
        }
        catch(error) {
            throw CustomError.internalServer('Internal Server Error')
        }
    }
}