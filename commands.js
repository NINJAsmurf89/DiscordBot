export default {
  PING_COMMAND: {
    name: 'ping',
    description: 'Says Pong',
    type: 1,
  },
};

export const responses = {
  ping: function ping(req, res) {
    // Send a message into the channel where command was triggered from
    const timestamp = req.get('X-Signature-Timestamp');

    return res.send({
      type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
      data: {
        content: `pong (${Date.now() - (`${timestamp}000`)} ms)`,
      },
    });
  },
};
