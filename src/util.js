import commands from './commands';

function buildCommands(prefix = '!') {
  return Object.entries(commands).reduce((acc, [key, value]) => {
    acc[`${prefix}${key}`] = value;
    return acc;
  }, {});
}

export { buildCommands };
