import * as controller from './controller';
import { MessageEmbed } from 'discord.js';

export default {
  summon: {
    method: controller.joinChannel,
    description: 'summon the bot the voice channel you are in',
  },
  play: {
    method: controller.play,
    description: `start audio`,
  },
  pause: {
    method: controller.pause,
    description: 'pause audio',
  },
  resume: {
    method: controller.resume,
    description: 'resume audio',
  },
  leave: {
    method: controller.leave,
    description:
      'disconnect bot from channel and reset state',
  },
  help(message) {
    const commandList = Object.entries(this).reduce(
      (acc, [key, { description }]) => {
        if (key.includes('help')) return acc;
        acc.push({
          name: key,
          value: description,
          inline: false,
        });
        return acc;
      },
      [],
    );
    const embed = new MessageEmbed({ title: 'Commands', fields: commandList });
    message.channel.send(embed);
  },
};
