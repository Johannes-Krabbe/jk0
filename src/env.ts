import dotenv from 'dotenv'

const keys = ['DATABASE_URL', 'NODE_ENV', 'CREATION_SECRET', 'WEB_URL'] as const

interface env {
    DATABASE_URL: string
    NODE_ENV: 'development' | 'production' | 'test'
    CREATION_SECRET: string
    WEB_URL: string
}

function env(): env {
    if (process.env.NODE_ENV === 'test') {
        dotenv.config({ path: '.env.test' })
    }
    for (const key of keys) {
        if (key === 'NODE_ENV') {
            continue
        }
        if (process.env[key] === undefined) {
            throw new Error(`Environment variable ${key} is undefined`)
        }
    }
    if (
        process.env.NODE_ENV !== 'test' &&
        process.env.NODE_ENV !== 'development' &&
        process.env.NODE_ENV !== 'production'
    ) {
        throw new Error(`Environment variable NODE_ENV is not valid`)
    }

    return {
        DATABASE_URL: process.env.DATABASE_URL!,
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        CREATION_SECRET: process.env.CREATION_SECRET!,
        WEB_URL: process.env.WEB_URL!,
    }
}

export const ENV = env()
