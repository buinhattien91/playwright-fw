module.exports = {
  requireModule: ['ts-node/register'],
  require: ['src/test/**/steps/*.ts'],
  paths: ['src/test/**/features/*.feature']
}; 