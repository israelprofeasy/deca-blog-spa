import { IErrorItem } from "./ErrorItem";

export interface IResponse<T> {
    Data: T;
    Errors: IErrorItem[];
    Message: string;
    Status: Boolean;
}