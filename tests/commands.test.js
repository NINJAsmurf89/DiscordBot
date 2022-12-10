/* eslint-disable import/extensions */
import { responses, TimestampFromSnowFlake } from '../commands.js';

test('help', () => {
  expect(responses.help({}).data.content).toBe(
    `/ping - Says Pong
/help - Displays a list of commands to the user
/qotd - Asks a question of the day\n`,
  );
});

test('timestamp-from-snowflake', () => {
  expect(TimestampFromSnowFlake('1049899707675189360'))
    .toBe(1670385996503);
});
