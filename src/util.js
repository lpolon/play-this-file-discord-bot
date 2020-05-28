import commands from './commands';

export function buildCommands(prefix = '!') {
  const output = Object.entries(commands).reduce((acc, [key, value]) => {
    acc[`${prefix}${key}`] = value;
    return acc;
  }, {});

  return output;
}
