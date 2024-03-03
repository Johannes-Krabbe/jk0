import { Hono } from 'hono'
import z from 'zod'
import { prisma } from '../prisma'
import { ENV } from '../env'
import { zValidator } from '@hono/zod-validator'

export const linkController = new Hono()

const zLinkCreateSchema = z.object({
    redirectUrl: z.string(),
    slug: z.string().regex(new RegExp(/^[a-zA-Z0-9_-]+$/)),

    password: z.string(),
})

linkController.post(
    '/create',
    zValidator('json', zLinkCreateSchema),
    async (c) => {
        const { redirectUrl, slug, password } = c.req.valid('json')

        if (password !== ENV.CREATION_SECRET) {
            return c.json({
                error: 'Invalid password',
            })
        }

        if (slug === 'api') {
            return c.json({
                error: 'disallowed slug',
            })
        }

        const existing = await prisma.link.findFirst({
            where: {
                slug,
            },
        })

        if (existing) {
            return c.json({
                error: 'Slug already exists',
            })
        }

        const link = await prisma.link.create({
            data: {
                redirectUrl,
                slug,
            },
        })

        return c.json({ success: true, link })
    }
)

linkController.get('/all', async (c) => {
    const links = await prisma.link.findMany()

    return c.json({ success: true, links })
})
