import 'dotenv/config';
import express from 'express';
import '../sequelize/index.js';
import * as commandObjects from './commands/commands.js';
import handleInteraction from './handler.js';
import {
  logRequest, processRequest, verifyRequest, HasGuildCommands,
} from './utils.js';
import logger from '../logger/logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.all('*', logRequest);

if (app.get('env') === 'production') {
  app.use('/interactions', processRequest, express.json({ verify: verifyRequest }));
} else {
  app.use('/interactions', express.json());
}

app.get('/status', async (req, res) => res.send(
  { message: 'DiscordBot is running' },
));

app.post('/interactions', handleInteraction);

app.listen(PORT, () => {
  HasGuildCommands(process.env.APP_ID, process.env.GUILD_ID, commandObjects);
  logger.Info('Listening on port', PORT);
});
