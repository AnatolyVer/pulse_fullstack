export type TMessage = {
    _id?:string,
    text:string
    author: string
    time: string
    delivered:boolean
    read:boolean
}