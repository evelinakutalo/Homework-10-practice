import { expect, Page } from "@playwright/test";

export default class CatalogPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async goto() {
    await this.page.goto("https://makeup.com.ua/");
  }

  public preparePage() {
    this.page.setViewportSize({ width: 1280, height: 1080 });
  }

  //locators

  getSearchButton = () => this.page.locator(".search-button").first();
  getSearchInput = () => this.page.locator("#search-input");
  getItemCatalog = () => this.page.locator(".catalog");
  getItem = () => this.page.getByRole("link", { name: "Крем" });
  getSecondItem = () => this.page.getByRole("link", { name: "Perfume" });


  //actions
  public async clickSearchButton() {
    await this.getSearchButton().click();
  }

  public async fillSearchField() {
    await this.getSearchInput().fill("Body Cream");
  }

  public async fillSecondProductSearchField() {
    await this.getSearchInput().fill("Perfume");
  }

  public async enterSearchField() {
    await this.getSearchInput().press("Enter");
  }

  public async clickCatalogItem() {
    await this.getItem().first().click();
  }

  public async clickSecondCatalogItem() {
    await this.getSecondItem().first().click();
  }

  public async checkItemCatalog() {
    await this.getItemCatalog().press("Enter");
  }

  public async findCatalogItem() {
    await this.getItem().click();
  }

  public async clearSearchInput() {
    await this.getSearchInput().clear();
  }
}
