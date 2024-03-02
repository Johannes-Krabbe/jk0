import { Hono } from 'hono'
import router from './router'

const app = new Hono()

app.onError((err, c) => {
    console.log(err)

    return c.json({ error: err.message }, 500)
})

app.route('', router)
export default app
