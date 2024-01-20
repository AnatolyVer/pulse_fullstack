import IUser from "@shared/interfaces/IUser.ts";
import {IMessage} from "@shared/interfaces/IMessage.ts";

export interface IChat{
    _id?: string,
    user?:Partial<IUser>
    type:string,
    messages:IMessage[]
}