import jwt, { JwtPayload } from 'jsonwebtoken'
import {configs} from '@configs/config'
import { Request } from 'express'
import { UserFactory } from '@factory/userFactory'
import { User } from '@prisma/client'

export interface DecodedPayload extends JwtPayload {
    email: string
}
export async function generateJwt(data: object, secretKey: string): Promise<string> {
    const token = jwt.sign(data, secretKey, { expiresIn: '30d' })

    return token
}


export async function verifyToken(token: string, secretKey: string): Promise<string | JwtPayload> {
    const verified = jwt.verify(token, secretKey)

    return verified
}

export async function retrieveUser(req: Request): Promise<User> {
    const token = req.headers?.authorization?.split(' ')[1]

    if(token) {
        const decodedPayload = await verifyToken(token, configs.JWT_SECRET_KEY)

        const { email } = decodedPayload as DecodedPayload

        const dbUser = await UserFactory.getUser(email)

        return dbUser
    }
}
