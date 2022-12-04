import {User} from "@prisma/client"

export default class UserDTO {
    id: number
    username: string
    first_name: string
    full_name: string;
    last_name: string
    avatar_url: string

    constructor(data: User) {
        this.id = data.id
        this.username = `@${data.username}`
        this.full_name = `${data.first_name} ${data.last_name}`
        this.first_name = data.first_name
        this.last_name = data.last_name
        this.avatar_url = 'https://www.w3schools.com/howto/img_avatar.png'
    }
}
