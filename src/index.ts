import app from './app'
import { ENV } from './env'

// run env parser at startup
ENV
console.log('Server started on port 8080')

export default {
    port: 8080,
    fetch: app.fetch,
}
