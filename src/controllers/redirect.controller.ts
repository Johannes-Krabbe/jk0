import { Hono } from 'hono'
import { prisma } from '../prisma'
import { ENV } from '../env'

export const redirectController = new Hono()

redirectController.get('/:slug', async (c) => {
    const slug = c.req.param('slug')
    const link = await prisma.link.findUnique({ where: { slug } })

    if (!link || !link.redirectUrl) {
        return c.redirect(`${ENV.WEB_URL}/404`)
    }

    await prisma.link.update({
        where: { id: link.id },
        data: { clicks: { increment: 1 } },
    })

    return c.redirect(link.redirectUrl)
})
