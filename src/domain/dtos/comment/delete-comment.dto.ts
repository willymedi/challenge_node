import { Validators } from "../../../config";

export class DeleteCommenttDto {

    private constructor(
        public readonly comment: string,
        public readonly user: string
    ) {}

    static create(props: {[key: string]: any;}) : [string?, DeleteCommenttDto?] {
        const {
            comment,
            user
        } = props;
        if (!comment) return ["Missing Comment id"];
        if (!Validators.isMongoId(comment)) return ["Invalid User ID"];
        if (!user) return ["Missing user"];
        if (!Validators.isMongoId(user)) return ["Invalid User ID"];

        return [
            undefined,
            new DeleteCommenttDto(
                comment,
                user
            )
        ]
    }


}
