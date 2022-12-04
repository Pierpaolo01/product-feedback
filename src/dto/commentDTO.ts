import {SuggestionComment, User, CommentReply} from "@prisma/client"

import UserDTO from "@src/dto/userDTO"
import ReplyDTO from "@src/dto/replyDTO";

export default class CommentDTO {
    id: number
    text: string
    user: UserDTO
    replies: any[]

    constructor(data: SuggestionComment & {user: User,  commentReply?: (CommentReply & { user: User })[] }) {
        this.id = data.id
        this.text = data.text
        this.user = new UserDTO(data.user)
        this.replies = data.commentReply?.map(reply => new ReplyDTO(reply)) ?? []
    }
}
