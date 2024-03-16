import { Hono } from 'hono'
import router from './router'
import { cors } from 'hono/cors'
import { ENV } from './env'

const app = new Hono()

app.onError((err, c) => {
    console.log(err)
    return c.json({ error: err.message }, 500)
})

// set cors headers
app.use(
    cors({
        origin: ENV.NODE_ENV === 'production' ? 'https://jk0.cc' : '*',
        allowHeaders: ['*'],
        allowMethods: ['POST', 'GET', 'OPTIONS'],
        exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
        maxAge: 600,
        credentials: true,
    })
)

app.route('', router)
export default app
