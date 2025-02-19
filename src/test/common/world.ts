//src/test/common/world.ts
import { After, AfterAll, Before, BeforeAll, setDefaultTimeout, setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "@playwright/test";
import { context } from "./context";
import dotenv from "dotenv";

class CustomWorld extends World {
    async init() {
        // Kiểm tra và gán giá trị mặc định nếu service không tồn tại
        const serviceName = (process.env.service || 'gdn').toUpperCase();
        const envName = process.env.NODE_ENV || 'development';

        // Load env file
        dotenv.config({
            path: `envs/.env.${envName}`
        });

        // Khởi tạo browser context
        if (!context.browser) {
            context.browser = await chromium.launch({ headless: false });
        }
    }
}

setWorldConstructor(CustomWorld);

let browser: Browser;
let contextBrowser: BrowserContext;

setDefaultTimeout(60000);

BeforeAll(async () => {
    browser = await chromium.launch({ headless: false });
});

Before(async () => {
    const serviceName = (process.env.service ?? 'gdn').toUpperCase();

    if (process.env.BASIC_EMAIL && process.env.BASIC_PASSWORD) {
        contextBrowser = await browser.newContext({
            httpCredentials: {
                username: process.env.BASIC_EMAIL,
                password: process.env.BASIC_PASSWORD
            }
        });
    } else {
        contextBrowser = await browser.newContext();
    }
    const page = await contextBrowser.newPage();
    context.page = page;
});

// Before(async () => {
//   contextBrowser = await browser.newContext();
//   const page = await contextBrowser.newPage();
//   context.page = page;
// });

After(async () => {
    await context.page.close();
    await contextBrowser.close();
});

AfterAll(async () => {
    await browser.close();
});