/* eslint-disable import/extensions */
import { TimestampFromSnowFlake } from '../interactions/application-commands.js';

test('timestamp-from-snowflake', () => {
  expect(TimestampFromSnowFlake('1049899707675189360'))
    .toBe(1670385996503);
});
