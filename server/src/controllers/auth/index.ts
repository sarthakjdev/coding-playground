import messages from "@constants/messages";
import { UserFactory } from "@factory/index";
import { generateJwt } from "@helpers/authHelpers";
import { checkPassword, generateHash } from "@helpers/password";
import { Request, Response } from "express";
import {configs} from '@configs/config'

export default class AuthController {
    /**
     * login user
     * @static
     * @memberof AuthController
     */
    static async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body

            if (!email || !password) return res.status(401).send(messages.badReq)

            // crceating user here for testing purposes only
            const hashedPassword = await generateHash(password)

            let dbUser = await UserFactory.getUser(email)
            if (!dbUser) await UserFactory.createUser({email:email, password: hashedPassword, name: 'text user' } as any)
            dbUser = await UserFactory.getUser(email)

            const isAuthenticated = await checkPassword(password, dbUser.password)

            if (!isAuthenticated) return res.status(404).send('Invalid Username/password')

            const token = await generateJwt({ email: dbUser.email }, configs.JWT_SECRET_KEY)

            const updatedUser = await UserFactory.updateAuthToken(dbUser, token)

            return res.status(200).json({
                success: true,
                message: 'Login success!',
                token: token
            })

        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }
}
