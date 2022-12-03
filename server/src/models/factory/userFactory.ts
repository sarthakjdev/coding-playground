import prisma from '@lib/prisma'
import { User } from '@prisma/client'
import logger from '@utils/logger'
export class UserFactory {
    /**
     * get user
     * @param {string} email
     * @returns {Promise<User>}
     * @static
     * @memberof UserFactory
     */
    static async getUser(email: string): Promise<User> {
        try {
            const playgroud = await prisma.user.findFirst({
                where: {
                    email,
                },
            })

            return playgroud
        } catch (error) {
            logger.error(error)

        }
    }

    /**
     * create user
     * @param {User} data
     * @returns {Promise<User>}
     * @static
     * @memberof UserFactory
     */
    static async createUser(data: User): Promise<User> {
        try {
            const user = await prisma.user.create({
                data: {
                    ...data
                },
            })

            return user
        } catch (error) {
            logger.error(error)
        }
    }

    /**
     * update user
     * @param {data} User
     * @returns {Promise<User>}
     * @static
     * @memberof UserFactory
     */
    static async updateUser(data: User): Promise<User> {
        try {
            const user = await prisma.user.update({
                where: {
                    email: data.email
                },
                data: {
                    ...data
                },
            })

            return user
        } catch (error) {
            logger.error(error)
        }
    }

    /**
     * Update auth token
     * @static
     * @memberof UserFactory
     */
    static async updateAuthToken(user: User, token: string) {
        const dbUser = await prisma.user.update({
            where: {
                email: user.email,
            },
            data: {
                authToken: token,
            },
        })

        return dbUser
    }

    /**
     * delete a user
     * @param {number} id
     * @returns {Promise<void>}
     * @static
     * @memberof UserFactory
     */
    static async deleteUser(email: string): Promise<void> {
        try {
            await prisma.user.delete({
                where: {
                    email
                }
            })
        } catch (error) {
            logger.error(error)
        }
    }
}
