import { rest } from 'msw';

export const handlers = [
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
        return res(
            ctx.json([
                { name: 'Chocolate', imagePath: '/images/chocolate.png' },
                { name: 'Vanilla', imagePath: '/images/vanilla.png' },
            ])
        )
    }),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
        return res(
            ctx.json([
                { name: 'Cherries', imagePath: '/images/cherries.png' },
                { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
                { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
                { name: 'Mochi', imagePath: '/images/mochi.png' }
            ])
        );
    }),

    rest.post('http://localhost:3030/order', (req, res, ctx) => {
        return res(
            ctx.json({ orderNumber: "123456" })
        );
    }),
    rest.get('*', (req, res, ctx) => {
        console.error(`Please add request handler for ${req.url.toString()}`);
        return res(
            ctx.status(500),
            ctx.json({ error: "Please add request handler" })
        )
    })
]