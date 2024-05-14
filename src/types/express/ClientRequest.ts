import {Request} from "express"
import {Client} from "types/Client"

export interface ClientRequest extends Request {
    user: Client
}


export interface UserRequest extends Request {
    auth: {
        user_info: {
            name: string
            email: string
            picture: string
        },
        iss: string
        sub: string
        aud: [string, string]
        iat: number
        exp: number
        azp: string
        scope: string
        permissions: [
            "mysteryshopper.clients:read",
            "mysteryshopper.report_all:read",
            "mysteryshopper.report:edit",
            "mysteryshopper.report:read"
        ]
    }
}
