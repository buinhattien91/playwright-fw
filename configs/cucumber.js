// module.exports = {
//   requireModule: ['ts-node/register'],
//   require: ['./src/test/**/steps/steps.ts'],
//   paths: ['./src/test/**/features/*.feature'],
//   formatOptions: { snippetInterface: 'async-aware' }
// };

//configs/cucumber.js
module.exports = {
  formatOptions: {
    snippetInterface: "async-await"
  },
  publishQuiet: true,
  dryRun: false,
  requireModule: [
    "ts-node/register"
  ]
}