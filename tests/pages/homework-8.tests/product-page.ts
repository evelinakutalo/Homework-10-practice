import { expect, Page } from "@playwright/test";

export default class ProductPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //locators
  getBuyButton = () => this.page.getByText("Купить");
  getCheckoutPopup = () =>
    this.page.locator("div").filter({ hasText: "Корзина +1" }).nth(2);

  getCloseWindowButton = () =>
    this.page.locator("#popup__window > .popup-close");

  getCheckoutItem = () => this.page.locator(".product-list_product-item");
  getCloseCheckoutButton = () =>
    this.page.locator(".popup__window > .popup-close");

  getItem = () => this.page.locator(".product-list_product-item").first();
  getSecondItem = () =>
    this.page.locator("li:nth-child(2) > .product-list_product-item");

  //actions
  public async clickBuyButton() {
    await this.getBuyButton().click();
  }

  public async checkCheckoutPopup() {
    await this.getCheckoutPopup().click();
  }

  public async closeCheckoutWindow() {
    await this.getCloseCheckoutButton().click();
  }

  public async checkCheckoutItem() {
    await this.getCheckoutItem().click();
  }
  public async closePopupWindow() {
    await this.getCloseWindowButton().click();
  }
}
