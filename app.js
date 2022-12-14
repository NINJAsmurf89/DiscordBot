/* eslint-disable import/extensions */
import 'dotenv/config';
import express from 'express';
import { VerifyDiscordRequest, HasGuildCommands } from './utils.js';
import * as commandObjects from './commands.js';
import * as applicationCommands from './interactions/application-commands.js';
import * as messageComponents from './interactions/message-components.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.get('/', async (req, res) => res.send('<h1>Hello, World!</h1>'));

app.post('/interactions', async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { type, id, data } = req.body;

  if (type === 1) { // PING = 1
    try {
      return res.send({ type: 1 });
    } catch (err) {
      console.error(err);
    }
  } else if (type === 2) { // APPLICATION_COMMAND = 2
    try {
      return res.send(applicationCommands[data.name](req));
    } catch (err) {
      console.error(err);
    }
  } else if (type === 3) { // MESSAGE_COMPONENT = 3
    try {
      return res.send(messageComponents[data.custom_id](req));
    } catch (err) {
      console.error(err);
    }
  }

  return res.send('Error');
});

app.listen(PORT, () => {
  HasGuildCommands(process.env.APP_ID, process.env.GUILD_ID, commandObjects);
  console.log('Listening on port', PORT);
});
