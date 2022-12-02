import {User} from "@prisma/client"

export default class UserDTO {
    id: number
    username: string
    first_name: string
    last_name: string

    constructor(data: User) {
        this.id = data.id
        this.username = `@${data.username}`
        this.first_name = data.first_name
        this.last_name = data.last_name
    }
}
