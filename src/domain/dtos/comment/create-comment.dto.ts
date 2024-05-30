import { Validators } from "../../../config";


export class CreateCommentDto {

    private constructor(
        public readonly content: string,
        public readonly user: string,
        public readonly post: string,

    ) {}


    static create(props: {[key: string]: any;}) : [string?, CreateCommentDto?] {
        const {
            content,
            user,
            post
        } = props;
        if (!content) return ['Missing Content'];
        if (!user) return ["Missing user"];
        if (!Validators.isMongoId(user)) return ["Invalid User ID"]
        if (!post) return ["Missing Post"]
        if (!Validators.isMongoId(post)) return ["Invalid Post ID"]

        return [
            undefined,
            new CreateCommentDto(
                content,
                user,
                post
            )
        ]
    }


}