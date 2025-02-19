//configs/cucumber-fce.js
module.exports = {
  default: {
    ...require('./cucumber'),
    paths: [
      "src/test/fce/**/features/"
    ],
    require: [
      "src/test/fce/**/steps/*.ts",
      "src/test/common/world.ts"
    ]
  }
}