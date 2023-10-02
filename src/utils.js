import 'dotenv/config';
import fetch from 'node-fetch';
import { verifyKey } from 'discord-interactions';
import logger from '../logger/logger.js';

export function logRequest(req, res, next) {
  const {
    method, originalUrl, protocol, headers,
  } = req;
  logger.Info(method, originalUrl, protocol, headers);
  next();
}

export function processRequest(req, res, next) {
  if (req.is('application/json')) {
    next();
  } else {
    res.status(400).send('Bad request');
  }
}

export function verifyRequest(req, res, buf, encoding) {
  const clientKey = process.env.PUBLIC_KEY;
  const signature = req.get('X-Signature-Ed25519');
  const timestamp = req.get('X-Signature-Timestamp');

  const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
  if (!isValidRequest) {
    res.status(401).send('Bad request signature');
    throw new Error('Bad request signature');
  }
}

async function DiscordRequest(endpoint, options) {
  if (process.env.NODE_ENV === 'development') return null;
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
    logger.Info(res.status);
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
    logger.Error(err);
  }
}

async function UninstallGuildCommand(appId, guildId, commandId) {
  const endpoint = `applications/${appId}/guilds/${guildId}/commands/${commandId}`;
  try {
    await DiscordRequest(endpoint, { method: 'DELETE' });
  } catch (err) {
    logger.Error(err);
  }
}

async function UpdateGuildCommand(appId, guildId, commandId, command) {
  const endpoint = `applications/${appId}/guilds/${guildId}/commands/${commandId}`;
  try {
    await DiscordRequest(endpoint, { method: 'PATCH', body: command });
  } catch (err) {
    logger.Error(err);
  }
}

// Checks for a command
async function HasGuildCommand(appId, guildId, installedNames, installedCommands, command) {
  if (!installedNames.includes(command.name)) {
    logger.Info(`Installing "${command.name}"`);
    InstallGuildCommand(appId, guildId, command);
  } else {
    logger.Info(`Updating "${command.name}" command`);
    const commandId = installedCommands[installedNames.indexOf(command.name)].id;
    // UpdateGuildCommand(appId, guildId, commandId, command);
  }
}

async function HasDiscontinuedGuildCommand(appId, guildId, localNames, command) {
  if (!localNames.includes(command.name)) {
    logger.Info(`Uninstalling "${command.name}" command`);
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
    logger.Error(err);
  }
}

export async function ConfigureGuildMemberRole(guildId, userId, roleId, method) {
  const endpoint = `guilds/${guildId}/members/${userId}/roles/${roleId}`;
  try {
    await DiscordRequest(endpoint, { method });
  } catch (err) {
    logger.Error(err);
  }
}

export async function ModifyGuildMember(guildId, userId, options) {
  const endpoint = `guilds/${guildId}/members/${userId}`;
  try {
    await DiscordRequest(endpoint, { method: 'PATCH', body: options });
  } catch (err) {
    logger.Error(err);
  }
}
