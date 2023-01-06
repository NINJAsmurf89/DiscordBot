import 'dotenv/config';
import fetch from 'node-fetch';
import { verifyKey } from 'discord-interactions';

export function VerifyDiscordRequest(clientKey) {
  return function verifyRequest(req, res, buf, encoding) {
    const signature = req.get('X-Signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');

    const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
    if (!isValidRequest) {
      res.status(401).send('Bad request signature');
      throw new Error('Bad request signature');
    }
  };
}

async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = `https://discord.com/api/v10/${endpoint}`;
  // Stringify payloads
  // eslint-disable-next-line no-param-reassign
  if (options.body) options.body = JSON.stringify(options.body);
  // Use node-fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/NINJAsmurf89/DiscordBot, 1.0.0)',
    },
    ...options,
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

async function InstallGuildCommand(appId, guildId, command) {
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
  try {
    await DiscordRequest(endpoint, { method: 'POST', body: command });
  } catch (err) {
    console.log(err);
  }
}

async function UninstallGuildCommand(appId, guildId, commandId) {
  const endpoint = `applications/${appId}/guilds/${guildId}/commands/${commandId}`;
  try {
    await DiscordRequest(endpoint, { method: 'DELETE' });
  } catch (err) {
    console.log(err);
  }
}

async function UpdateGuildCommand(appId, guildId, commandId, command) {
  const endpoint = `applications/${appId}/guilds/${guildId}/commands/${commandId}`;
  try {
    await DiscordRequest(endpoint, { method: 'PATCH', body: command });
  } catch (err) {
    console.log(err);
  }
}

// Checks for a command
async function HasGuildCommand(appId, guildId, installedNames, installedCommands, command) {
  if (!installedNames.includes(command.name)) {
    console.log(`Installing "${command.name}"`);
    InstallGuildCommand(appId, guildId, command);
  } else {
    console.log(`Updating "${command.name}" command`);
    const commandId = installedCommands[installedNames.indexOf(command.name)].id;
    // UpdateGuildCommand(appId, guildId, commandId, command);
  }
}

async function HasDiscontinuedGuildCommand(appId, guildId, localNames, command) {
  if (!localNames.includes(command.name)) {
    console.log(`Uninstalling "${command.name}" command`);
    UninstallGuildCommand(appId, guildId, command.id);
  }
}

export async function HasGuildCommands(appId, guildId, commands) {
  if (guildId === '' || appId === '') return;

  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

  try {
    const res = await DiscordRequest(endpoint, { method: 'GET' });
    const data = await res.json();

    if (data) {
      // This is just matching on the name, so it's not good for updates
      const installedNames = data.map((c) => c.name);
      const localNames = Object.values(commands).map((c) => c.name);

      data.forEach((c) => HasDiscontinuedGuildCommand(appId, guildId, localNames, c));
      Object.values(commands).forEach((c) => {
        HasGuildCommand(appId, guildId, installedNames, data, c);
      });
    }
  } catch (err) {
    console.error(err);
  }
}

export async function ConfigureGuildMemberRole(guildId, userId, roleId, method) {
  const endpoint = `guilds/${guildId}/members/${userId}/roles/${roleId}`;
  try {
    await DiscordRequest(endpoint, { method });
  } catch (err) {
    console.error(err);
  }
}

export async function ModifyGuildMember(guildId, userId, options) {
  const endpoint = `/guilds/${guildId}/members/${userId}`;
  try {
    await DiscordRequest(endpoint, { method: 'PATCH', body: options });
  } catch (err) {
    console.error(err);
  }
}
