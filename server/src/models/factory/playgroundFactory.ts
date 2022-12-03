import prisma from '@lib/prisma'
import { User, Playground, PlaygroundContainers } from '@prisma/client'
import logger from '@utils/logger'

export class PlaygroundFactory {
    /**
     * get playground
     * @param {string} id
     * @return {Promise<Playground>}
     * @static
     * @memberof PlaygroundFactory
     */
    static async getPlayground(id: number): Promise<Playground> {
        try {
            const playgroud = await prisma.playground.findFirst({
                where: {
                    id,
                },
                include: {
                    container: true,
                    user: true
                }
            })

            return playgroud
        } catch (error) {
            logger.error(error)
        }
    }

    /**
     * create playground
     * @param {Playground} data
     * @return {Promise<Playground>}
     * @static
     * @memberof PlaygroundFactory
     */
    static async createPlayground(data: Playground): Promise<Playground> {
        try {
            const playground = await prisma.playground.create({
                data: {
                    ...data
                },
                include: {
                    container: true,
                    user: true
                }
            })

            return playground
        } catch (error) {
            logger.error(error)
        }
    }

    /**
    * create  playground container
    * @param {PlaygroundContainers} data
    * @return {Promise<PlaygroundContainers>}
    * @static
    * @memberof PlaygroundFactory
    */
    static async createPlaygroundContainer(data: PlaygroundContainers): Promise<PlaygroundContainers> {
        try {
            const playgroundContainer = await prisma.playgroundContainers.create({
                data: {
                    ...data
                },
                include: {
                    playground: true
                }
            })

            return playgroundContainer
        } catch (error) {
            logger.error(error)
        }
    }

    /**
     * update playground
     * @param {Playground} data
     * @return {Promise<Playground>}
     * @static
     * @memberof PlaygroundFactory
     */
    static async updatePlayground(data: Playground): Promise<Playground> {
        try {
            const playground = await prisma.playground.update({
                where: {
                    id: data.id
                },
                data: {
                    ...data
                },
                include: {
                    container: true,
                    user: true
                }
            })

            return playground
        } catch (error) {
            logger.error(error)
        }
    }

    /**
     * delete a playground
     * @param {string} id
     * @returns {Promise<void>}
     * @static
     * @memberof PlaygroundFactory
     */
    static async deletePlayground(id: number): Promise<void> {
        try {
            await prisma.playground.delete({
                where: {
                    id
                }
            })
        } catch (error) {
            logger.error(error)
        }
    }
}
