import { AddressModel } from "./addressModel";

export interface UserModel{
    FirstName: string;
    LastName: string;
    Email: string; 
    Gender: string;
    PhoneNumber: string;
    PhotoUrl: string;
    Id: string;
    Stack: string;
    Squad: string;
    IsActive: boolean;
    Address: AddressModel
}