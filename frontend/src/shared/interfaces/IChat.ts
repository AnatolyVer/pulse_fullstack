import IUser from "@shared/interfaces/IUser.ts";

export interface IChat{
    _id?: string,
    user?:Partial<IUser>
    type?:string,
    messages?:any
}