import { MessageEmbed } from 'discord.js';

function sendEmbed(response = '', messageObj) {
  const embed = new MessageEmbed();
  embed.setTitle(response);
  messageObj.channel.send(embed);
}

export { sendEmbed };
