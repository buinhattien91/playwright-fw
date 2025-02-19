//src/test/fce/steps/steps.ts
import { Then, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { Discount } from "../../pages/discount";

let numberOfBooks = 0;
let total = 0;

Given("I buy {int} books", async (num: number) => {
  numberOfBooks = num
})

Given("Each book cost {int} vnd", async (price: number) => {
  total = numberOfBooks * price
})

Given("I have a coupon {int} {string}", async (discount: number, unit: string) => {
  const discountPage = new Discount(total, discount, unit)
  total = discountPage.perform()
})

Then("Total amount should be equal {int} vnd", async (amount: number) => {
  expect(total).toEqual(amount)
})