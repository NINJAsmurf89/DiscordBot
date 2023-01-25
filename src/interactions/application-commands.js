import questions from '../../resources/questions.json' assert { type: 'json' };
import information from '../../resources/info.json' assert { type: 'json' };
import * as commands from '../commands/commands.js';
import { ModifyGuildMember, ConfigureGuildMemberRole } from '../utils.js';
import {
  ButtonStyle,
  ComponentType,
  InteractionResponseType,
  MessageFlag,
} from '../types.js';

export function TimestampFromSnowFlake(snowflake) {
  return Number(BigInt(snowflake) >> 22n) + 1420070400000;
}

export function ping(req) {
  // Send a message into the channel where command was triggered from
  const now = Date.now();
  const timestamp = TimestampFromSnowFlake(req.body.id);

  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `pong (${now - timestamp} ms)`,
    },
  };
}

export function help(req) {
  let temp = '';
  Object.values(commands).forEach((c) => {
    temp = `${temp}\`/${c.name}\` - ${c.description}\n`;
  });
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        {
          title: 'Here is a list of commands to help you:',
          type: 'rich',
          description: temp,
          color: 0x5865F2,
        },
      ],
    },
  };
}

export function qotd(req) {
  const question = questions[Math.floor(Math.random() * 500)];
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        {
          title: 'Question of the Day',
          type: 'rich',
          description: question,
          color: 0x5865F2,
        },
      ],
    },
  };
}

export function info(req) {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        {
          title: 'Hello! My name is IrisBot!',
          type: 'rich',
          description: information[0],
          color: 0x5865F2,
          fields: [
            {
              name: 'About My Creators',
              value: information[1],
            },
          ],
          footer: {
            text: 'Made by Haley & Evan',
          },
        },
      ],
    },
  };
}

export function button(req) {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      components: [
        {
          type: ComponentType.ACTION_ROW,
          components: [
            {
              type: ComponentType.BUTTON,
              label: 'Click me!',
              style: ButtonStyle.SUCCESS,
              custom_id: 'button',
            },
          ],
        },
      ],
    },
  };
}

export function multibutton(req) {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      components: [
        {
          type: ComponentType.ACTION_ROW,
          components: [
            {
              type: ComponentType.BUTTON,
              label: 'Button 1',
              style: ButtonStyle.SUCCESS,
              custom_id: 'button1',
            },
          ],
        },
        {
          type: ComponentType.ACTION_ROW,
          components: [
            {
              type: ComponentType.BUTTON,
              label: 'Button 2',
              style: ButtonStyle.DANGER,
              custom_id: 'button2',
            },
          ],
        },
      ],
    },
  };
}

export function nickname(req) {
  const guildId = req.body.guild_id;
  const userId = req.body.member.user.id;
  const oldNick = req.body.member.nick;
  const nick = req.body.data.options[0].value;

  ModifyGuildMember(guildId, userId, { nick });

  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: oldNick ? `Changed nickname from ${oldNick} to ${nick}`
        : `Set nickname to ${nick}`,
    },
  };
}

export function role(req) {
  const guildId = req.body.guild_id;
  const userId = req.body.data.options[0].options[0].value;
  const roleId = req.body.data.options[0].options[1].value;
  const method = req.body.data.options[0].name;

  ConfigureGuildMemberRole(guildId, userId, roleId, method === 'add' ? 'PUT'
    : 'DELETE');

  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Sucessfully ${method}${method === 'add' ? 'e'
        : ''}d <@&${roleId}> ${method === 'add' ? 'to'
        : 'from'} <@${userId}>`,
      flags: MessageFlag.EPHEMERAL,
    },
  };
}
