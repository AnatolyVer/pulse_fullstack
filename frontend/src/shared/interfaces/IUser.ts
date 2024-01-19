export default interface IUser {
    _id: string;
    nickname: string;
    username: string;
    avatar_url: string;
    bio: string;
    chats: string[];
    online:boolean;
    last_seen:string;
    [key: string]: string | string[] | boolean;
}