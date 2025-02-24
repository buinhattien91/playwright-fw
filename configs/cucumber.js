// module.exports = {
//   requireModule: ['ts-node/register'],
//   require: ['./src/test/**/steps/steps.ts'],
//   paths: ['./src/test/**/features/*.feature'],
//   formatOptions: { snippetInterface: 'async-aware' }
// };

//configs/cucumber.js
module.exports = {
  requireModule: ['ts-node/register'],
  format: ['progress-bar', 'html:cucumber-report.html'],
  formatOptions: { snippetInterface: 'async-await' },
  publishQuiet: true
};