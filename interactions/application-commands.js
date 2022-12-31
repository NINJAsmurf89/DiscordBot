/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import questions from '../questions.json' assert { type: 'json' };
import information from '../info.json' assert { type: 'json' };
import * as commands from '../commands.js';

export function TimestampFromSnowFlake(snowflake) {
  // eslint-disable-next-line no-bitwise
  return Number(BigInt(snowflake) >> 22n) + 1420070400000;
}

export function ping(req) {
  // Send a message into the channel where command was triggered from
  const now = Date.now();
  const timestamp = TimestampFromSnowFlake(req.body.id);

  return {
    type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
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
    type: 4,
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
    type: 4,
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
    type: 4,
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
    type: 4,
    data: {
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              label: 'Click me!',
              style: 1,
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
    type: 4,
    data: {
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              label: 'Button 1',
              style: 3,
              custom_id: 'button1',
            },
          ],
        },
        {
          type: 1,
          components: [
            {
              type: 2,
              label: 'Button 2',
              style: 4,
              custom_id: 'button2',
            },
          ],
        },
      ],
    },
  };
}
