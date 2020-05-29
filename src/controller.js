import { MessageEmbed } from 'discord.js';
import { createReadStream } from 'fs';

function sendEmbed(response = '', message) {
  const embed = new MessageEmbed();
  embed.setDescription(response);
  message.channel.send(embed);
}

async function joinChannel(message, state) {
  if (message.member.voice.channel) {
    state.connection = await message.member.voice.channel.join();
  } else {
    sendEmbed('entra você primeiro e me chama ;)', message);
  }
}

async function play(message, state) {
  if (!message.member.voice.channel)
    return sendEmbed('entra no canal primeiro!');

  if (state.connection) {
    state.dispatcher = state.connection.play(createReadStream('./public.ogg'));
    sendEmbed('playing...', message);
  } else {
    state.connection = await message.member.voice.channel.join();
    state.dispatcher = state.connection.play(createReadStream('./public.ogg'));
  }
}

function pause(message, { dispatcher }) {
  dispatcher.pause();
  sendEmbed('paused', message);
}
function resume(message, { dispatcher }) {
  dispatcher.resume();
  sendEmbed('resumed', message);
}

export { sendEmbed, joinChannel, play, pause, resume };
