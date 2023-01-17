import { ApplicationCommandOptionType } from '../types.js';

export const PING_COMMAND = {
  name: 'ping',
  description: 'Says pong',
};

export const HELP_COMMAND = {
  name: 'help',
  description: 'Displays a list of commands to the user',
};

export const QOTD_COMMAND = {
  name: 'qotd',
  description: 'Asks a question of the day',
};

export const INFO_COMMAND = {
  name: 'info',
  description: 'Displays some information about me!',
};

export const BUTTON_COMMAND = {
  name: 'button',
  description: 'Test button command',
};

export const MULTI_BUTTON_COMMAND = {
  name: 'multibutton',
  description: 'Test multi-button command',
};

export const NICKNAME_COMMAND = {
  name: 'nickname',
  description: 'Change your nickname',
  options: [
    {
      type: ApplicationCommandOptionType.STRING,
      name: 'nickname',
      description: 'nickname',
      required: true,
      min_length: 1,
      max_length: 32,
    },
  ],
};

export const ROLE_COMMAND = {
  name: 'role',
  description: 'Add or remove a role on a given user',
  options: [
    {
      name: 'add',
      description: 'Add a role to a user',
      type: ApplicationCommandOptionType.SUB_COMMAND,
      options: [
        {
          name: 'user',
          description: 'Enter the user that you would like to add a role to',
          type: ApplicationCommandOptionType.USER,
          required: true,
        },
        {
          name: 'role',
          description: 'Enter the role that you would like to add to the user',
          type: ApplicationCommandOptionType.ROLE,
          required: true,
        },
      ],
    },
    {
      name: 'remove',
      description: 'Remove a role from a user',
      type: ApplicationCommandOptionType.SUB_COMMAND,
      options: [
        {
          name: 'user',
          description: 'Enter the user that you would like to add a role to',
          type: ApplicationCommandOptionType.USER,
          required: true,
        },
        {
          name: 'role',
          description: 'Enter the role that you would like to add to the user',
          type: ApplicationCommandOptionType.ROLE,
          required: true,
        },
      ],
    },
  ],
};
