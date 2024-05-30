import { Validators } from "../../../config";


export class UpdatePostDto {

    private constructor(
        public readonly post: string,
        public readonly user: string,
        public readonly title?: string,
        public readonly content?: string,
        public readonly category?: string,
        public readonly tags?: string[]


    ) {}


    static create(props: {[key: string]: any;}) : [string?, UpdatePostDto?] {
        const {
            post,
            title,
            content,
            user,
            category,
            tags
        } = props;
        if (!user) return ["Missing user"];
        if (!Validators.isMongoId(user)) return ["Invalid User ID"]
        if (!post) return ["Missing Post"];
        if (!Validators.isMongoId(post)) return ["Invalid Post ID"]
        if (tags && (!Array.isArray(tags) || !tags.every((item: any) => typeof item === 'string'))) return ["Tags is not a list"]
        if (tags && tags.length === 0) return ["Tags is empty"];
        if (tags && !tags.every((id: string) => Validators.isMongoId(id))) return ["Invalid Tag id"];
        if (category && !Validators.isMongoId(category)) return ["Invalid Category ID"]

        return [
            undefined,
            new UpdatePostDto(
                post,
                user,
                title,
                content,
                category,
                tags
            )
        ]
    }


}