
export class FilterPostDto {
    private constructor(
        public readonly tag: string,
        public readonly category: string
    ) {}

    static create(tag: string, category: string): [string?, FilterPostDto?] {

        return [undefined, new FilterPostDto(tag, category)]
    }
}