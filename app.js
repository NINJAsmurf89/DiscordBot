/* eslint-disable import/extensions */
import 'dotenv/config';
import express from 'express';
import { VerifyDiscordRequest, HasGuildCommands } from './utils.js';
import { commands, responses } from './commands.js';

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
    try {
      return res.send(responses[name](req));
    } catch (err) {
      console.error(err);
    }
  }

  return res.send('Error');
});

app.listen(PORT, () => {
  HasGuildCommands(process.env.APP_ID, process.env.GUILD_ID, commands);
  console.log('Listening on port', PORT);
});
