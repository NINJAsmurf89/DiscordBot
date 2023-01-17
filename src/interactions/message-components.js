import { InteractionResponseType } from '../types.js';
import sequelize from '../../sequelize/index.js';

export async function button(req) {
  const message_id = req.body.message.id;
  const model = sequelize.models.button;
  const [instance, created] = await model.findOrCreate({ where: { message_id } });
  const count = instance.count + 1;
  await model.increment({ count: 1 }, { where: { message_id } });

  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Button has been clicked ${count} time${count > 1 ? 's' : ''}`,
    },
  };
}

export function button1(req) {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: 'You pressed button 1!',
    },
  };
}

export function button2(req) {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: 'You pressed button 2!',
    },
  };
}
