import { Given, Then, When } from "@cucumber/cucumber";
import { context } from "../../common/context";
import { expect } from "@playwright/test";

Given("User navigates to page {string}", async (url: string) => {
    try {
        await context.page.goto(url);
    } catch (error) {
        console.log(error);
    }
});

When("User clicks on Your cart icon", async () => {
    await context.page.locator("img[alt='Cart']").click();
});

Then("User should see empty your cart", async () => {
    await expect(context.page.locator("(//h2[contains(text(),'You cart is empty!')])[1]")).toBeVisible();
});

When("User clicks on Add to cart button on {string} product", async (productName: string) => {
    await context.page.locator("//h4[contains(text(),'" + productName + "')]").click();
});

Then("User should see added this product's items & price", async () => {
    //todo
});