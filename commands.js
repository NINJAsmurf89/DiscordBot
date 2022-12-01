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
};

export const responses = {
  ping: function ping(req) {
    // Send a message into the channel where command was triggered from
    const timestamp = req.get('X-Signature-Timestamp');

    return {
      type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
      data: {
        content: `pong (${Date.now() - (`${timestamp}000`)} ms)`,
      },
    };
  },

  // eslint-disable-next-line no-unused-vars
  help: function help(req) {
    let temp = '';
    Object.values(commands).forEach((c) => {
      // temp = temp + '/' + c.name + ' - ' + c.description + '\n'
      temp = `${temp}/${c.name} - ${c.description}\n`;
    });
    return {
      type: 4,
      data: {
        content: temp,
      },
    };
  },
};
