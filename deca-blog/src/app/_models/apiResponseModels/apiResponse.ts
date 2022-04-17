export interface ApiResponse<T>{
    Message: string,
    Status: boolean,
    Data: T
}