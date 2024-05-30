import { Validators } from "../../../config";


export class CreatePostDto {

    private constructor(
        public readonly title: string,
        public readonly content: string,
        public readonly user: string,
        public readonly category: string,
        public readonly tags: string[]


    ) {}


    static create(props: {[key: string]: any;}) : [string?, CreatePostDto?] {
        const {
            title,
            content,
            user,
            category,
            tags
        } = props;
        if (!title) return ['Missing Title'];
        if (!content) return ['Missing Content'];
        if (!tags) return ["Missing Tags"]
        if (!Array.isArray(tags) || !tags.every((item: any) => typeof item === 'string')) return ["Tags is not a list"]
        if (tags.length === 0) return ["Tags is empty"];
        if (!tags.every((id: string) => Validators.isMongoId(id))) return ["Invalid Tag id"];
        if (!user) return ["Missing user"];
        if (!Validators.isMongoId(user)) return ["Invalid User ID"]
        if (!category) return ["Missing category"]
        if (!Validators.isMongoId(category)) return ["Invalid Category ID"]

        return [
            undefined,
            new CreatePostDto(
                title,
                content,
                user,
                category,
                tags
            )
        ]
    }


}