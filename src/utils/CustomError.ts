export class CustomError extends Error {
    public status: number;
    public name: string;

    constructor(message: string, status: number, name: string = "Custom Error") {
        super(message);
        this.status = status;
        this.name = name

        Object.setPrototypeOf(this, CustomError.prototype);
    }
}