/* eslint-disable import/extensions */
import { responses, TimestampFromSnowFlake } from '../commands.js';

test('help', () => {
  expect(responses.help({})).toEqual({
    type: 4,
    data: {
      content: '/ping - Says Pong\n/help - Displays a list of commands to the user\n',
    },
  });
});

test('timestamp-from-snowflake', () => {
  expect(TimestampFromSnowFlake('1049899707675189360'))
    .toEqual(1670385996503);
});
