import { Validators } from "../../../config";


export class DeletePostDto {

    private constructor(
        public readonly post: string,
        public readonly user: string
    ) {}

    static create(props: {[key: string]: any;}) : [string?, DeletePostDto?] {
        const {
            post,
            user
        } = props;
        if (!post) return ["Missing Post id"];
        if (!Validators.isMongoId(post)) return ["Invalid User ID"];
        if (!user) return ["Missing user"];
        if (!Validators.isMongoId(user)) return ["Invalid User ID"];

        return [
            undefined,
            new DeletePostDto(
                post,
                user
            )
        ]
    }


}
