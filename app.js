import 'dotenv/config';
import express from "express";
import { VerifyDiscordRequest, DiscordRequest } from './utils';

const app = express();
const PORT = 3000;

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY)}));

app.post('/interactions', async function (req, res) {
    const { type, id, data } = req.body;

    if (type === InteractionType.APPLICATION_COMMAND) {
        const { name } = data;
    
        if (name === 'ping') {
            // Send a message into the channel where command was triggered from
            return res.send({
                type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
                data: {
                    content: 'Hello, world!'
                },
            });
        }
    }
})

app.listen(PORT, () => {
    console.log('Listening on port')
})