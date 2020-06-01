import commands from './commands';

function buildCommands(prefix = '!') {
  return Object.entries(commands).reduce((acc, [key, value]) => {
    acc[`${prefix}${key}`] = value;
    return acc;
  }, {});
}

// two passes. First one return a object representing the string. i. e.: 1h2m3s -> {h: 1, m: 2, s: 3}
// second pass returns integer representing input in seconds + 60.
function parseStringToSeekTime(string) {
  if (typeof string === 'undefined') return 0
  let timeString = '';
  const conversionDic = {
    h: value => Number(value) * 60 * 60,
    m: value => Number(value) * 60,
    s: value => Number(value),
  };
  const hashtable = string.split('').reduce((acc, e) => {
    if (e in conversionDic) {
      if (timeString === '') return acc;
      acc[e] = timeString;
      timeString = '';
    } else timeString += e;
    return acc;
  }, {});
  // check length, return invalid input
  const hashtableEntriesArr = Object.entries(hashtable)
  if (hashtableEntriesArr.length === 0) throw Error(`invalid !play argument input. It must have at least one character value: ${Object.keys(conversionDic).join(', ')}`)
  return hashtableEntriesArr.reduce((seconds, [key, value]) => {
    seconds += conversionDic[key](value)
    return seconds
  }, 60)
}

parseStringToSeekTime(undefined) //?

export { buildCommands, parseStringToSeekTime };
