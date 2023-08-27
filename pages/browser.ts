import { expect, type Locator, type Page } from '@playwright/test';

export class BrowserPage {
    readonly page: Page;
    readonly browserHistory: Locator;

    constructor(page: Page) {
        this.page = page;
        this.browserHistory = page.getByTestId('search-history').getByTestId('merListItem-container');
    }

    async verifyBrowserHistoryCount(count) {
       expect( await this.page.getByTestId('search-history').getByTestId('merListItem-container').count()).toEqual(count);
    }

    async verifyBrowserHistoryText(index, text) {
       expect(await this.page.getByTestId('search-history').getByTestId('merListItem-container').nth(index).textContent()).toEqual(text);
    }

    async selectLatestBrowserHistory() {
        await this.browserHistory.first().click();
    }
}