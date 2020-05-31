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
  /*
  if arg, get time in seconds, play with it.
  */
 if (state.connection === null) await joinChannel(message, state)
  state.connection.play(createReadStream('./test.ogg'), {
    seek: 0,
  });
    sendEmbed('playing...', message);
  }

// TODO: MÉTODO REWIND

function leave(message, state) {
  state.connection.disconnect();
  state.connection = null;
  state.seekInput = 0;
  sendEmbed('bye!', message)
}

function pause(message, { currentPlaytime, connection: { dispatcher } }) {
  dispatcher.pause();
  sendEmbed('paused', message);
}
function resume(message, {currentPlaytime, connection: {dispatcher}}) {
  dispatcher.resume();
  sendEmbed('resumed', message);
}

export { sendEmbed, joinChannel, play, pause, resume, leave };
