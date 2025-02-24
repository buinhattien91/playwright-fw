//configs/cucumber-gdn.js
module.exports = {
  default: {
    ...require('./cucumber'),
    paths: [
      "src/test/rahulshettyacademy/**/features/**/*.feature",
    ],
    require: [
      "src/test/rahulshettyacademy/**/steps/**/*.ts",
      "src/test/common/world.ts"
    ]
  }
}