import { expect, type Locator, type Page } from '@playwright/test';

export class TopPage {
    readonly page: Page;
    readonly searchBox: Locator;
    readonly categorySearch: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBox = page.getByPlaceholder('なにをお探しですか？');
        this.categorySearch = page.getByRole('link', { name: 'カテゴリーからさがす' })
    }

    async gotoURL() {
        await this.page.goto("https://jp.mercari.com/");
    }

    async setKeyword(text) {
        await this.searchBox.type(text);
        await this.page.keyboard.press('Enter');
    }

    async clickSearchBox() {
        await this.searchBox.click();
    }

    async selectCategory() {
        await this.categorySearch.click();
    }
}