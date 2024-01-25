import IUser from "@shared/interfaces/IUser.ts";
import {IMessage} from "@shared/interfaces/IMessage.ts";

export interface IPreviewChat{
    _id?: string,
    image: string,
    name:string,
    type:string,
    online:boolean,
    last_message:Partial<IMessage>,
    unread_messages:string,
}

export interface IChat{
    _id?: string,
    messages:IMessage[]
    user:Partial<IUser>,
    type:string,
    unread_messages:string,
}