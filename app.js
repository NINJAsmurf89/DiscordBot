import 'dotenv/config';
import express from "express";
import { VerifyDiscordRequest, HasGuildCommands } from './utils.js';
import {
    PING_COMMAND
} from './commands.js';

const app = express();
const PORT = 3000;

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY)}));

app.post('/interactions', async function (req, res) {
    const { type, id, data } = req.body;

    if (type === 2) { //APPLICATION_COMMAND = 2
        const { name } = data;
    
        if (name === 'ping') {
            // Send a message into the channel where command was triggered from
            return res.send({
                type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
                data: {
                    content: 'Pong'
                },
            });
        }
    }
})

app.listen(PORT, () => {
    HasGuildCommands(process.env.APP_ID, process.env.GUILD_ID, [
        PING_COMMAND,
    ]);
})