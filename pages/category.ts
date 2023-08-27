import { expect, type Locator, type Page } from '@playwright/test';

export class CategoryPage {
    readonly page: Page;
    readonly tierOneCategory: Locator;
    readonly tierTwoCategory: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tierOneCategory = page.getByRole('combobox').nth(0);
        this.tierTwoCategory = page.getByRole('combobox').nth(1);
    }

    async setCategoryByLink(text) {
        await this.page.getByRole('link', { name: text }).first().click();
    }

    async setCategoryById(text) {
        await this.page.getByTestId('category-list').getByRole('link', { name: text }).first().click();
    }

    async getOptionValue() {
        var url = await this.page.url();
        return url.substring(url.lastIndexOf("=") + 1);
    }

    async verifyTierOneOption(optionValue){
        await expect(this.tierOneCategory).toHaveValue(optionValue);
    }

    async verifyTierTwoOption(optionValue){
        await expect(this.tierTwoCategory).toHaveValue(optionValue);
    }

    async verifyHasChecked(text){
        await expect(await this.page.getByLabel(text).isChecked()).toBeTruthy();
    }
}