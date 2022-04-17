export interface IResponseModel {
    status: boolean;
    data: IDataModel;
    errors: Array<object>;
}

export interface IDataModel {
    metaData: object;
    data: Array<object>;
}