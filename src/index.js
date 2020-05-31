import { config } from 'dotenv';
import { Client } from 'discord.js';
import * as utils from './util';
import * as controller from './controller';
config();

let commands;
const prefix = process.env.BOT_PREFIX ?? '!';
let state = {
  connection: null,
};

const client = new Client();

client.once('ready', () => {
  commands = utils.buildCommands(prefix);
  console.log('ready!');
});

client.on('message', async message => {
  const { content } = message;
  const [userInput] = content.split(/ +/);
  if (content[0] !== prefix) return;
  if (!(userInput in commands))
    return controller.sendEmbed(
      `nenhum comando encontrado. Digite ${prefix}help para ver lista de comandos`,
      message,
    );
  if (userInput === `${prefix}help`) return commands[userInput](message);
  else await commands[userInput].method(message, state);
});

client.login(process.env.BOT_TOKEN);
