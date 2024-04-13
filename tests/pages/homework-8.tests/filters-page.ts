import { expect, Page } from "@playwright/test";

export default class FiltersPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async goto() {
    await this.page.goto("https://makeup.com.ua/");
  }

  //locators
  getFilterBrandCheckbox = () =>
    this.page.locator("#popularinput-checkbox-2243-1571127");
  getFilterSeriesCheckbox = () =>
    this.page.locator("#input-checkbox-2251-24353");

  getFilterTag = () => this.page.locator("label").filter({ hasText: "CeraVe" });
  getFilterSeriesTag = () =>
    this.page.locator("label").filter({ hasText: "Крем" });

  getSortingDropdown = () => this.page.getByText("Сортировать по:");
  getSortingDropdownButton = () => this.page.locator(".catalog-sort-list");
  getSortingDropdownOption = () => this.page.getByText("цене", { exact: true });

  // actions
  public async filterBrand() {
    await this.getFilterBrandCheckbox().click();
  }
  public async checkFilteTag() {
    await this.getFilterTag().click();
  }
  public async filterBrandSeries() {
    await this.getFilterSeriesCheckbox().click();
  }

  public async clickSortingDropdown() {
    await this.getSortingDropdown().click();
  }

  public async clickSortingDropdownButton() {
    await this.getSortingDropdownButton().first().click();
  }

  public async clickSortingDropdownOption() {
    await this.getSortingDropdownOption().first().click();
  }
}
