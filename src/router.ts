import { Hono } from 'hono'
import { redirectController } from './controllers/redirect.controller'
import { linkController } from './controllers/link.controller'

const router = new Hono()

router.route('/', redirectController)

router.route('/api/link', linkController)

export default router
