import { Hono } from 'hono'
import apiRouter from './api/apiRouter'
import webRouter from './web/webRouter'

const router = new Hono()

router.route('/api', apiRouter)
router.route('/', webRouter)

export default router
