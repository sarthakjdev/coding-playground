import { dockerEngineRequestClient } from "@utils/axios";
import { AxiosInstance } from "axios";
import { TYPE_OF_PLAYGROUND } from "@prisma/client";

export class DockerEngine {
    static client: AxiosInstance = dockerEngineRequestClient

    /**
     * get all containers 
     * @returns
     */
    static async getAllContainerList() {
        try {
            const response = await DockerEngine.client.get('/v1.41/containers/json')
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async getContainer(id: string) {
        try {
            const response = await DockerEngine.client.get(`/v1.41/containers/json?filter={"id": "${id}"}`)

            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async createContainer(typeOfPlayground: TYPE_OF_PLAYGROUND, data) {
        try {
            let image = ''
            if (typeOfPlayground == TYPE_OF_PLAYGROUND.NODE) image = 'sarthakjdev/node-playground:latest'
            const payload = {
                "AttachStdin": true,
                "AttachStdout": true,
                "AttachStderr": true,
                "Tty": true,
                "OpenStdin": true,
                "StdinOnce": false,
                "Image": image,
                "HostConfig": {
                    "PortBindings": {
                        "3000/tcp": [{ "HostPort": "3000" }]
                    }
                },
                "Cmd": [
                    "sleep infinity"
                ]
            }

            const response = await DockerEngine.client.post(`/v1.41/containers/create`, payload)

            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async attachToContainer(id: string) {
        try {
            const response = await DockerEngine.client.post(`/v1.41/containers/${id}/attach?logs=true&stream=true`)

            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async attachtoContainerWS(id: string) {
        try {
            const response = await DockerEngine.client.get(`/v1.41/containers/${id}/attach/ws?logs=true&stream=true&stdout=true&stdin=true`)

            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async getContainerFsStatus(id: string) {
        try {
            const response = await DockerEngine.client.get(`/v1.41/containers/${id}/changes`)

            return response.data
        } catch (error) {
            console.log(error)
        }
    }


    static async exec(id: string) {
        try {
            const body = {
                "AttachStdin": true,
                "AttachStdout": true,
                "AttachStderr": true,
                "DetachKeys": "ctrl-p,ctrl-q",
                "Tty": true,
                "Cmd": [
                    "sleep infinity"
                ],
            }
            const response = await DockerEngine.client.post(`/v1.41/containers/${id}/exec`, body)

            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * create a docker volume
     * @param {string} containerId
     * @returns
     */
    static async createVolume(containerId: string) {
        try {
            const body = {
                "Name": containerId,
                "Driver": "custom",
                "DriverOpts": {
                    "device": "tmpfs",
                    "o": "size=100m,uid=1000",
                    "type": "tmpfs"
                },
            }
            const response = await DockerEngine.client.post(`/v1.41/volumes/create`, body)

            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async startContainer(id: string) {
        try {
            const response = await DockerEngine.client.post(`/v1.41/containers/${id}/start`)
            console.log("response ", response);

            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}
