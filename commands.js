import questions from './questions.json' assert { type: 'json' };

export const commands = {
  PING_COMMAND: {
    name: 'ping',
    description: 'Says Pong',
    type: 1,
  },

  HELP_COMMAND: {
    name: 'help',
    description: 'Displays a list of commands to the user',
    type: 1,
  },

  QOTD_COMMAND: {
    name: 'qotd',
    description: 'Asks a question of the day',
    type: 1,
  },
};

export function TimestampFromSnowFlake(snowflake) {
  // eslint-disable-next-line no-bitwise
  return Number(BigInt(snowflake) >> 22n) + 1420070400000;
}

export const responses = {
  ping: function ping(req) {
    // Send a message into the channel where command was triggered from
    const now = Date.now();
    const timestamp = TimestampFromSnowFlake(req.body.id);

    return {
      type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
      data: {
        content: `pong (${now - timestamp} ms)`,
      },
    };
  },

  // eslint-disable-next-line no-unused-vars
  help: function help(req) {
    let temp = '';
    Object.values(commands).forEach((c) => {
      temp = `${temp}/${c.name} - ${c.description}\n`;
    });
    return {
      type: 4,
      data: {
        content: temp,
      },
    };
  },

  // eslint-disable-next-line no-unused-vars
  qotd: function qotd(req) {
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
  },
};
