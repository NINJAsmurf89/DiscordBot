import * as applicationCommands from './interactions/application-commands.js';
import * as messageComponents from './interactions/message-components.js';
import { InteractionType, InteractionResponseType } from './types.js';

export default async function handleInteraction(req, res) {
  const { type, id, data } = req.body;

  switch (type) {
    case InteractionType.PING:
      try {
        res.send({ type: InteractionResponseType.PONG });
      } catch (err) {
        console.error(err);
        res.send({ error: err });
      }
      break;
    case InteractionType.APPLICATION_COMMAND:
      try {
        res.send(applicationCommands[data.name](req));
      } catch (err) {
        console.error(err);
        res.send({ error: err });
      }
      break;
    case InteractionType.MESSAGE_COMPONENT:
      try {
        res.send(await messageComponents[data.custom_id](req));
      } catch (err) {
        console.error(err);
        res.send({ error: err });
      }
      break;
    default:
      res.status(400).send('Bad request');
  }
}
