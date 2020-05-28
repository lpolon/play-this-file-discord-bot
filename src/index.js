import { config } from 'dotenv';
import { Client } from 'discord.js';
import * as utils from './util';
import fs from 'fs';
config();

let commands;
let dispatcher;
const client = new Client();

client.once('ready', () => {
  console.log('ready!');
});

client.on('message', async message => {
  // get the first word.
  // check if it is a command
  // second word will be the link
  // .split(/ +/)
  // if (!(message.content in commands)) {
  //   console.log('o comando não existe');
  // } else {
  //   console.log('oioioi:', message.content);
  // }
  console.log('content:', message.content);
  // if message is !play or something
  if (message.content === 'pause') {
    return dispatcher.pause();
  } else if (message.content === 'resume') {
    return dispatcher.resume();
  }
  else {
    if (message.member.voice.channel) {
      /*
      connection.play(fs.createReadStream('./media.ogg'), {
  type: 'ogg/opus',
});
      */
      const connection = await message.member.voice.channel.join();
      dispatcher = connection.play(fs.createReadStream('./lala.mp3'));
      /*
      stop
      dispatcher.destroy();
       */
    }
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
