
import { Validators } from "../../../config";


export class CreateTagDto {

    private constructor(
        public readonly name: string,
        public readonly user: string,


    ){}

    static create(props: {[key: string]: any;}) : [string?, CreateTagDto?] {
        const {
            name,
            user,
        } = props;
        if (!name) return ['Missing name'];
        if (!user) return ["Missing user"];
        if (!Validators.isMongoId(user)) return ["Invalid User ID"]

        return [
            undefined,
            new CreateTagDto(
                name,
                user
            )
        ]
    }
}