import type { FC } from 'hono/jsx'
import { css, Style } from 'hono/css'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Context, Next } from 'hono'

import { render } from 'hono/jsx/dom'

const globalClass = css`
    :-hono-global {
        html {
            font-family: Arial, Helvetica, sans-serif;
            background-color: black;
            color: white;
            font-size: 20px;
            body {
                margin: 0;
                padding: 0;
            }
            canvas {
                margin: auto;
            }
            p {
                margin: 0;
            }
        }
    }
`

export const Layout: FC = (props) => {
    return (
        <html>
            <head>
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>pixel-simulation</title>
                <script src="static/p5.min.js"></script>
                <script src="static/sketch.js"></script>
                <Style />
            </head>
            <body class={globalClass}>{props.children}</body>
        </html>
    )
}

export const rendererMiddleware = async (c: Context, next: Next) => {
    c.setRenderer((content) => {
        const root = document.getElementById('root') as any
        return c.html(<Layout>{render(content, root)}</Layout>)
    })
    await next()
}
