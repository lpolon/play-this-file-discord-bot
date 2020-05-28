import { config } from 'dotenv';
import { Client } from 'discord.js';
import * as utils from './util';
import * as controller from './controller';
import fs from 'fs';
config();

let commands;
let dispatcher;
const client = new Client();

client.once('ready', () => {
  console.log('ready!');
});

client.on('message', async message => {
  // return controller.sendEmbed('oi', message);

  // get the first word.
  // check if it is a command
  // second word will be the link
  // .split(/ +/)
  // if (!(message.content in commands)) {
  //   console.log('o comando não existe');
  // } else {
  //   console.log('oioioi:', message.content);
  // }
  // console.log('content:', message.content);
  // if message is !play or something
  if (message.content === 'lalalala') {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      dispatcher = connection.play(fs.createReadStream('./public.ogg'));
      /*
      stop
      dispatcher.destroy();
       */
    }
  }
  if (message.content === 'pause') {
    return dispatcher.pause();
  }
  if (message.content === 'resume') {
    return dispatcher.resume();
  }
});

client.login(process.env.BOT_TOKEN, () => {
  commands = utils.getCommands(process.env.BOT_PREFIX);
});

/*
temp: 
return embed preview:
https://discordjs.guide/popular-topics/embeds.html#using-the-richembedmessageembed-constructor
*/
