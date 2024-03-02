import { Hono } from 'hono'
import { css } from 'hono/css'
import { Layout } from '../Layout'

export const createRouter = new Hono()

const centerStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

const boxStyle = css`
    border: 5px solid white;
    background-color: black;
    text-align: center;
    padding: 20px;
`
const labelStyle = css`
    display: block;
    margin-bottom: 5px;
`

const input = css`
    border: 1px solid #fff;
    background-color: black;
    color: white;
    -webkit-appearance: none;
    outline: none;
    padding: 5px;
    margin-bottom: 10px;
`

const headStyle = css`
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: bold;
`

function Create() {
    return (
        <Layout>
            <div class={centerStyle}>
                <div class={boxStyle}>
                    <div>
                        <p class={headStyle}>create new link</p>

                        <p class={labelStyle}>original link</p>
                        <input class={input} />

                        <p class={labelStyle}>shortend url</p>
                        <input class={input} />

                        <p class={labelStyle}>password</p>
                        <input class={input} />
                    </div>

                    <button
                        class={input}
                        onClick={() => console.log('clicked')}
                    >
                        create
                    </button>
                </div>
            </div>
            <h1 class="bg-black">Hello Hono!</h1>
        </Layout>
    )
}

createRouter.get('/', (c) => {
    const messages = ['Good Morning', 'Good Evening', 'Good Night']
    return c.html(<Create messages={messages} />)
})
