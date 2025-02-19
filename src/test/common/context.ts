//src/test/common/context.ts
import { Browser, Page } from '@playwright/test';

interface Context {
    page: Page;
    browser?: Browser;
}

export const context: Context = {
    page: {} as Page
};