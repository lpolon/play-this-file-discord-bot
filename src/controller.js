import https from 'https';
import fs from 'fs';
import { MessageEmbed } from 'discord.js';

function downloadFile(url, filename) {
  const file = fs.createWriteStream(filename);
  const request = https
    .get(url, response => {
      if (response.statusCode == 302) {
        // it's a redirect!
        request(response.headers.location);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            // You may do something here
          });
        });
      }
    })
    .on('error', err => {
      console.log(err);
    });
}

function sendEmbed(response = '', messageObj) {
  const embed = new MessageEmbed();
  embed.setTitle(response);
  messageObj.channel.send(embed);
}

export { downloadFile, sendEmbed };

// downloadFile(
//   'https://www.dropbox.com/s/9a8toxfwtc09b1i/public.ogg?dl=1',
//   './public.ogg',
// );
