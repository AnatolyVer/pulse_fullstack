export default interface IUser {
    [key: string]: string | string[];
    _id: string;
    nickname: string;
    username: string;
    avatar_url: string;
    bio: string;
    chats: string[];
}