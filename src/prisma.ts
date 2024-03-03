import { PrismaClient } from '@prisma/client'
import { ENV } from './env'

export const prisma = new PrismaClient({
    datasourceUrl: ENV.DATABASE_URL,
})
