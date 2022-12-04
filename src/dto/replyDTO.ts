import {CommentReply, User} from "@prisma/client";
import UserDTO from "@src/dto/userDTO";

export default class ReplyDTO {
    id: number
    reply: string
    user: UserDTO
    comment_id: number

    constructor(data: CommentReply & {user: User}) {
        this.id = data.id
        this.reply = data.reply
        this.user = new UserDTO(data.user)
        this.comment_id = data.comment_id
    }
}
