//src/test/gdn/steps/steps.ts
import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { Discount } from "../../pages/discount";
import { context } from "../../common/context";

let numberOfPens = 0;
let total = 0;

Given("I buy {int} pens", async function (num: number) {
    numberOfPens = num;
});

Given("Each pen cost {int} vnd", async function (price: number) {
    total = numberOfPens * price;
});

Given(
    "I have a coupon {int} {string}",
    async (discount: number, unit: string) => {
        const discountPage = new Discount(total, discount, unit);
        total = discountPage.perform();
    }
);

Then("Total amount should be equal {int} vnd", async function (amount: number) {
    expect(total).toBe(amount);
});

Given("User navigates to page {string}", async (url: string) => {
    try {
        await context.page.goto(url);
    } catch (error) {
        console.log(error);
    }
});
