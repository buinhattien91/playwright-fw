//configs/cucumber-gdn.js
module.exports = {
  default: {
    ...require('./cucumber'),
    paths: [
      "src/test/gdn/**/features/"
    ],
    require: [
      "src/test/gdn/**/steps/*.ts",
      "src/test/common/world.ts"
    ]
  }
}