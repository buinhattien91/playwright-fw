Note:

Run:
npm run test:gdn
npm run test:fce

OR
npx cross-env NODE_ENV=heroku SERVICE=fce npm run test

--------------------------------

Table of contents
1. Overview
2. What is Playwright and Cucumber?
3. Prerequisites and Installations
Prerequisites
Installations
Extensions
Set up testing for single project
Set up testing for multiple project
Use Page Object to share common function between multiple project
Use Hook to define global browser
Setting ENV file for testing on multiple environment
Conclusion
References

1. Overview
In our team, we have to work on a series projects. They have some same function like login, logout... But almost other functions are different. We need to set up an automation test tool that it can adapt to these conditions:

It has some share common functions that the projects can re-use
Defined steps and features in this project are separated each other
We can run test each project
We can test for multiple envs like develop, heroku ,staging...
QA/BrSe can support Developer member writes test cases
After discussion, our team decided to use the Playwright and Cucumber framework to set up first Automation Test tool for our projects.

 

2. What is Playwright and Cucumber?
Playwright is a library that allows you to automate web browser interactions.

It provides a high-level API that allows you to simulate user interactions like clicking on buttons, filling in forms, and navigating between pages.
Playwright is designed to work with all major browsers, including Chrome, Firefox, and Safari..
Playwright is supported for multiple programming language like Node, Python ...
Cucumber is a behavior-driven development (BDD) framework that allows you to write executable specifications in plain language. Cucumber allows you to describe the behavior of your application in terms of scenarios, which can then be executed as automated tests

 3. Prerequisites and Installations
Before set up Automation Test tool, we need to install some javascript library first:

Prerequisites
Node (8 or higher)

VS Code

Installations
create new folder project. ex: automation_test_sample
open folder project by VS Code editor then open terminal
run these command to install packages:
npm init playwright@latest
npm i @cucumber/cucumber
npm i ts-node
npm i cross-env
npm i dotenv
Extensions
in VS Code editor, add Cucumber (Gherkin) Full Support extension


create file .vscode/settings.json add root project
add some config to settings.json
{
   "cucumberautocomplete.steps": [
       "src/test/**/steps/*.ts"
   ],
   "cucumberautocomplete.strictGherkinCompletion": true
}
Set up testing for single project
Create project structure like below:


_ src/test/gdn: gdn is project name we need to test

_ src/test/gdn/features: feature files will be stored in this folder

_ src/test/gdn/step: step files will be stored in this folder

_ cucumber.js: config for cucumber:

module.exports = {
  default: {
    formatOptions: {
      snippetInterface: "async-await"
    },
    publishQuiet: true,
    dryRun: false,
    requireModule: [
      "ts-node/register"
    ],
    paths: [
      "src/test/**/features/"
    ],
    require: [
      "src/test/**/steps/*.ts"
    ]
  }
}
add script for run test in package.json
"scripts": {
    "test": "cucumber-js test"
}
Next, we will need to create a feature file that describes the behavior of your application. Feature files are written in Gherkin, a plain-text language that is easy to read and understand

create file simple.feature in folder src/test/gdn/features with simple scenario:
//src/test/gdn/features/simple.feature
Feature: Simple feature test on GDN project

  Scenario: Total amount
  Given I buy 2 pens
  And Each pen cost 10000 vnd
  And I have a coupon 200 vnd
  Then Total amount should be equal 19800 vnd
open terminal and run cmd: npm run test
the console will show:


The result shows that we still not create definition steps for this scenario.

Once we have created your feature file, we will need to create a step definitions file that maps each step in our scenario to a function that implements that step:

create file steps.ts in src/test/gdn/steps folder. add code could be like:
//src/test/gdn/steps/steps.ts
import { Then, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

let numberOfPens = 0;
let total = 0;

Given("I buy {int} pens", async (num: number) => {
    numberOfPens = num
})

Given("Each pen cost {int} vnd", async (price: number) => {
    total = numberOfPens * price
})

Given("I have a coupon {int} vnd", async (discount: number) => {
    total = total - discount
})

Then("Total amount should be equal {int} vnd", async (amount: number) => {
    expect(total).toEqual(amount)
})
run again cmd: npm run test
simple scenario will be successful


We already finish set up cucumber and playwright for single project. Next we will try to set up for multiple project.

Set up testing for multiple project
in src/test folder add more project fce with same structure with project gdn
create folder configs and move file cucumber.js to configs
create two files configs/cucumber-gdn.js and configs/cucumber-fce.js
Structure:


Change config files:
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
//configs/cucumber-fce.js
module.exports = {
  default: {
    ...require('./cucumber'),
    paths: [
      "src/test/fce/**/features/"
    ],
    require: [
      "src/test/fce/**/steps/*.ts"
    ]
  }
}
//configs/cucumber-gdn.js
module.exports = {
  default: {
    ...require('./cucumber'),
    paths: [
      "src/test/gdn/**/features/"
    ],
    require: [
      "src/test/gdn/**/steps/*.ts"
    ]
  }
}
change script in package.json
"scripts": {
    "test": "cross-env service=$SERVICE cucumber-js test --config configs/cucumber-$SERVICE.js"
  }
Define some simple test for fce project
//src/test/fce/features/simple.feature
Feature: Simple feature test on FCE project
  Scenario: Total amount with discount
  Given I buy 2 books
  And Each book cost 10000 vnd
  And I have a coupon 200 vnd
  Then Total amount should be equal 19800 vnd

  Scenario: Total amount without discount
  Given I buy 2 books
  And Each book cost 10000 vnd
  Then Total amount should be equal 20000 vnd
//src/test/fce/steps/steps.ts
import { Then, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

let numberOfBooks = 0;
let total = 0;

Given("I buy {int} books", async (num: number) => {
  numberOfBooks = num
})

Given("Each book cost {int} vnd", async (price: number) => {
  total = numberOfBooks * price
})

Given("I have a coupon {int} vnd", async (discount: number) => {
  total = total - discount
})

Then("Total amount should be equal {int} vnd", async (amount: number) => {
  expect(total).toEqual(amount)
})
open terminal and run:
SERVICE=fce npm run test //for testing fce project
SERVICE=gdn npm run test //for testing gdn project
Use Page Object to share common function between multiple project
In the example below, we have 'function calculate discount', which same logic between 2 project.

We can move 'function calculate discount' to a Page Object for re-use

create src/test/pages/discount.ts
//src/test/pages/discount.ts
export class Discount {

  constructor(public readonly total: number,
              public readonly discount: number,
              public readonly unit: string) {
  }

  perform() {
    let amount = this.total
    if(this.unit === '%') {
      amount = this.total - ( this.total * this.discount ) / 100
    }else {
      amount = this.total - this.discount
    }
    return amount
  }
}
change some code in fce project
//src/test/fce/features/simple.feature
And I have a coupon 200 'vnd'
//src/test/fce/steps/steps.ts
Given("I have a coupon {int} {string}", async (discount: number, unit: string) => {
  const discountPage = new Discount(total, discount, unit)
  total = discountPage.perform()
})
change some code in gdn project
//src/test/gdn/features/simple.feature
And I have a coupon 10 '%'
//src/test/gdn/steps/steps.ts
Given("I have a coupon {int} {string}", async (discount: number, unit: string) => {
  const discountPage = new Discount(total, discount, unit)
  total = discountPage.perform()
})
open terminal and run:
SERVICE=fce npm run test //for testing fce project
SERVICE=gdn npm run test //for testing gdn project
Use Hook to define global browser
I automation test, we have to open browser and go to web page by url and close a lot of times. We can reduce time to declare browser variable by using hook

create src/test/common/context.ts
//src/test/common/context.ts
import { Page } from "@playwright/test";
export const context = {
    // @ts-ignore
    page: undefined as Page,
}
create src/test/common/world.ts
//src/test/common/world.ts
import { After, AfterAll, Before, BeforeAll, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium } from "@playwright/test";
import { context } from "./context";

let browser: Browser;
let contextBrowser: BrowserContext;

setDefaultTimeout(60000);

BeforeAll(async () => {
  browser = await chromium.launch({ headless: false });
});

Before(async () => {
  contextBrowser = await browser.newContext();
  const page = await contextBrowser.newPage();
  context.page = page;
});

After(async () => {
  await context.page.close();
  await contextBrowser.close();
});

AfterAll(async () => {
  await browser.close();
});
Add path to cucumber config
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
For using global browser when we want to access any web page by url , we can declare like it:
import { context } from "../../common/context";
Given('user navigates to page', async () => {
  try {
    await context.page.goto(<URL>);
  } catch(error) {
    console.log(error);
  }
});
Setting ENV file for testing on multiple environment
We should define env file for multiple environments which have difference information, ex: basic authentication, domain url ....

Change script in package.json
"test": "cross-env NODE_ENV=${ENV_TEST:-development} service=$SERVICE cucumber-js test --config configs/cucumber-$SERVICE.js"
create env files, ex: envs/.env.development , envs/.env.heroku, envs/.env.staging
//envs/.env.development
BASIC_EMAIL=
BASIC_PASSWORD=
BASE_URL=
Define env in file when using environment 's information like this:
import dotenv from "dotenv"

dotenv.config({
  override: true,
  path: `envs/.env.${process.env.NODE_ENV}`
});

.....

Before(async () => {
  const serviceName = process.env.service.toUpperCase();
  if (process.env.BASIC_EMAIL && process.env.BASIC_PASSWORD) {
    contextBrowser = await browser.newContext({
      httpCredentials: {
        username: process.env.BASIC_EMAIL,
        password: process.env.BASIC_PASSWORD      }
    })
  } else {
    contextBrowser = await browser.newContext();
  }
  const page = await contextBrowser.newPage();
  context.page = page;
});

.....
open terminal and try to run:
NODE_ENV=heroku SERVICE=fce npm run test
Conclusion
We have already finished setting up a simple project that could test for multiple site with multiple environments. Cucumber and Playwright are great frameworks. By using Playwright and Cucumber together, you can create powerful and flexible automated tests that help you ensure the quality of your web applications.

References
https://github.com/cucumber/cucumber-js
https://github.com/microsoft/playwright