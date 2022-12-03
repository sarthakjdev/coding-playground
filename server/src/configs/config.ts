import path from 'path'
import dotenv from 'dotenv'

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

// interface for env file
interface ENV {
    PORT: number | undefined;
    DATABASE_URL: string | undefined
    DOCKER_USERNAME: string | undefined
    DOCKER_PASSWORD: string | undefined
    DOCKER_SERVERNAME: string | undefined
    JWT_SECRET_KEY: string | undefined
}

// interface for config object generation
interface Config {
    PORT: number
    DATABASE_URL: string
    DOCKER_USERNAME: string
    DOCKER_PASSWORD: string
    DOCKER_SERVERNAME: string
    JWT_SECRET_KEY: string
}

// Loading process.env as ENV interface
const getConfig = (): ENV => ({
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    DATABASE_URL: process.env.DATABASE_URL,
    DOCKER_PASSWORD: process.env.DOCKER_PASSWORD,
    DOCKER_SERVERNAME: process.env.DOCKER_SERVERNAME,
    DOCKER_USERNAME: process.env.DOCKER_USERNAME,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
})

// checking if all the nev are defined if not throw ann error
const getVerifiedConfig = (config: ENV): Config => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`)
        }
    }

    return config as Config
}

const config = getConfig()

const verifiedConfig = getVerifiedConfig(config)

export const  configs = verifiedConfig

