/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import { ConfigureGuildMemberRole } from '../utils.js';

export function button(req) {
  const guildId = req.body.guild_id;
  const userId = req.body.member.user.id;
  const roleId = '1058348517262905364';
  const hasRole = req.body.member.roles.includes(roleId);

  ConfigureGuildMemberRole(guildId, userId, roleId, hasRole ? 'DELETE' : 'PUT');

  return {
    type: 4,
    data: {
      content: `${hasRole ? 'Removed' : 'Added'} role`,
    },
  };
}

export function button1(req) {
  return {
    type: 4,
    data: {
      content: 'You pressed button 1!',
    },
  };
}

export function button2(req) {
  return {
    type: 4,
    data: {
      content: 'You pressed button 2!',
    },
  };
}
