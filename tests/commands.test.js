/* eslint-disable import/extensions */
import { responses } from '../commands.js';

test('Tests the help command', () => {
  expect(responses.help(null)).toEqual({
    type: 4,
    data: {
      content: '/ping - Says Pong\n/help - Displays a list of commands to the user\n',
    },
  });
});
