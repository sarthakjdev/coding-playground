import { Request, Response } from 'express'
import messages from '@constants/messages'
import { DockerEngine } from '@api/dockerEngine'
import { PlaygroundFactory } from '@factory/playgroundFactory'
import { TYPE_OF_PLAYGROUND } from '@prisma/client'
import { playgroundContainers } from '@lib/prisma'
import { configs } from '@configs/config'
import { UserFactory } from '@factory/userFactory'
import { retrieveUser } from '@helpers/authHelpers'

export default class PlaygroundController {
    /**
     * get a playground
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<Response>}
     */
    static async getPlayground(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.body

            if (!id) return res.status(400).send(messages.badReq)

            const playground = await PlaygroundFactory.getPlayground(id)

            if (playground) return res.status(200).json(playground)

            return res.status(404).send(messages.notFound)
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    /**
     * create playgroud
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<Response>}
     */
    static async createPlayground(req: Request, res: Response): Promise<Response> {
        try {
            const { type } = req.body
            if (!type) res.status(400).send(messages.badReq)

            const dbUser = await retrieveUser(req)
            let playgroudUser = null
            if (dbUser) {
                playgroudUser = dbUser.email
            }

            // creating the container
            const container = await DockerEngine.createContainer(type, {})
            const startedContainer = await DockerEngine.startContainer(container.Id)
            console.log("startedContainer ", startedContainer);
            const excuted = await DockerEngine.exec(container.Id)
            console.log("excuted ", excuted);
            console.log("container ", container);
            const dbPlayGroundContainer = await PlaygroundFactory.createPlaygroundContainer({ id: (container.Id as string).slice(0, 11) } as any)
            await PlaygroundFactory.createPlayground({ containerId: dbPlayGroundContainer.id, type: type.toUpperCase() as TYPE_OF_PLAYGROUND, userId: playgroudUser } as any)

            if (container) {
                return res.status(200).send({
                    messages: messages.success,
                    container: container,
                })
            }


            return res.status(400).send(messages.badReq)
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    /**
     * delete a playground
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<Response>}
     */
    static async deletePlayground(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(200).send(messages.basic)
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    /**
     * attach the terminal
     * @param {Request} req
     * @param {Response} res
     * @returns
     */
    static async attachTerminal(req: Request, res: Response): Promise<Response> {
        try {
            const { containerId } = req.body
            const response = await DockerEngine.attachtoContainerWS(containerId)

            return response.data
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }
}
