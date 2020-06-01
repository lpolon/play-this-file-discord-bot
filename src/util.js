import commands from './commands';

function buildCommands(prefix = '!') {
  return Object.entries(commands).reduce((acc, [key, value]) => {
    acc[`${prefix}${key}`] = value;
    return acc;
  }, {});
}

function parseStringToSeekTime(timeString) {
  if (typeof timeString === 'undefined') return 0 // if no arguments, we default to -1:00
  const match = timeString.match(/(-)?(\d{1,3}):(\d{2})/)
  if (match === null)
      throw Error('Invalid time, please use Dota times like: `02:03` or `-01:12`')
  let time = Number(match[2])*60 + Number(match[3])
  if (match[1] === '-')
      time = 60 - time;
  else
      time = 60 + time;
  return time
}

export { buildCommands, parseStringToSeekTime };
