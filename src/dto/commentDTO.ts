import {SuggestionComment, User} from "@prisma/client"

import UserDTO from "@src/dto/userDTO"

export default class CommentDTO {
    id: number
    text: string
    user: UserDTO
    replies: any

    constructor(data: SuggestionComment & {user: User}) {
        this.id = data.id
        this.text = data.text
        this.user = new UserDTO(data.user)
        this.replies = []
    }
}
