import { Hono } from 'hono'
import { createRouter } from './pages/create'
import { serveStatic } from 'hono/bun'
import { rendererMiddleware } from './Layout'

const webRouter = new Hono()

webRouter.use(rendererMiddleware)

webRouter.route('/create', createRouter)

webRouter.get('/hello', (c) => c.json({ message: 'Hello, World!' }))

webRouter.use(
    '/static/*',
    serveStatic({
        root: 'src/web/',
        onNotFound: (path, c) => {
            console.log(`${path} is not found, you access ${c.req.path}`)
        },
    })
)

export default webRouter
