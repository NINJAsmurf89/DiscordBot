/* eslint-disable import/extensions */
import 'dotenv/config';
import express from 'express';
import { VerifyDiscordRequest, HasGuildCommands } from './utils.js';
import commands from './commands.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.get('/', async (req, res) => res.send('<h1>Hello, World!</h1>'));

app.post('/interactions', async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { type, id, data } = req.body;

  if (type === 1) { // PING_COMMAND = 1
    return res.send({ type: 1 });
  }

  if (type === 2) { // APPLICATION_COMMAND = 2
    const { name } = data;

    if (name === 'ping') {
      // Send a message into the channel where command was triggered from
      const timestamp = req.get('X-Signature-Timestamp');

      return res.send({
        type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
        data: {
          content: `pong (${Date.now() - (`${timestamp}000`)} ms)`,
        },
      });
    }
  }

  return res.send('Error');
});

app.listen(PORT, () => {
  HasGuildCommands(process.env.APP_ID, process.env.GUILD_ID, commands);
  console.log('Listening on port', PORT);
});
