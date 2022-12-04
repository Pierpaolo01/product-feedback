import {User} from "@client/types/userTypes";

export interface CommentType {
    id: number
    text: string
    user: User
    replies: ReplyType[]
}


export interface ReplyType {
    id: number
    reply: string
    user: User
    comment_id: number
}

export interface ReplyFormType {
    reply: string;
    comment_id?: number;
}
