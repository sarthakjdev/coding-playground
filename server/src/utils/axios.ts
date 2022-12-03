import axios from "axios";

export const dockerEngineRequestClient = axios.create({
    socketPath: '/var/run/docker.sock',
    baseURL: 'http://localhost/',
    headers: {
        'Content-Type': 'application/json'
    }
})
