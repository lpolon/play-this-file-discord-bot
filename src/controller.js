import { MessageEmbed } from 'discord.js';
import { createReadStream } from 'fs';
import * as util from './util';
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
  const { content } = message;
  // se nenhum argumento for passado, seekInput será undefined e o parse retornará 0.
  const [, seekInputString] = content.split(/ +/);
  let seekInput;
  try {
    seekInput = util.parseStringToSeekTime(seekInputString);
    console.log('seekInput OK?', seekInput);
  } catch (error) {
    return sendEmbed(error.message, message);
  }
  if (state.connection === null) await joinChannel(message, state);
  state.connection.play(createReadStream('./test.ogg'), {
    seek: seekInput,
  });
  state.seekInput = seekInput;
  sendEmbed(`playing @ ${state.currentPlaytime} seconds`, message);
}

// TODO: MÉTODO REWIND

function leave(message, state) {
  state.connection.disconnect();
  state.connection = null;
  state.seekInput = 0;
  sendEmbed('bye!', message);
}

function pause(message, { currentPlaytime, connection: { dispatcher } }) {
  dispatcher.pause();
  // TODO: parse seconds to min:secs
  sendEmbed(`paused @ ${currentPlaytime}s`, message);
}
function resume(message, { currentPlaytime, connection: { dispatcher } }) {
  dispatcher.resume();
  currentPlaytime;
  sendEmbed(`resumed @ ${currentPlaytime}s`, message);
}

export { sendEmbed, joinChannel, play, pause, resume, leave };

/*
TODO: rewind...
pega o stream time do dispatcher...
converte de ms para s

pega o argumento, adiciona ou subtrai o tempo em segundos

pega o tempo e passa para o connection.play(createReadStream, {seek: tempo})
*/
