import { Validators } from "../../../config";


export class UpdateCommentDto {

    private constructor(
        public readonly user: string,
        public readonly comment: string,
        public readonly content: string,

    ) {}


    static create(props: {[key: string]: any;}) : [string?, UpdateCommentDto?] {
        const {
            comment,
            content,
            user
        } = props;
        if (!user) return ["Missing user"];
        if (!Validators.isMongoId(user)) return ["Invalid User ID"]
        if (!comment) return ["Missing Comment"];
        if (!Validators.isMongoId(comment)) return ["Invalid Comment ID"]
        if (!content) return ["Missing Content"]
        if (content.length == 0) return ["Content should not be empty"]

        return [
            undefined,
            new UpdateCommentDto(
                user,
                comment,
                content,
        
            )
        ]
    }


}