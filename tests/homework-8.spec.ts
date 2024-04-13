import { test, expect } from "@playwright/test";
import CatalogPage from "./pages/homework-8.tests/catalog-page";
import ProductPage from "./pages/homework-8.tests/product-page";
import FiltersPage from "./pages/homework-8.tests/filters-page";

test.describe("Makeup Tests", () => {
  let catalogPage: CatalogPage;
  let productPage: ProductPage;
  let filtersPage: FiltersPage;

  test.beforeEach(async ({ page }) => {
    catalogPage = new CatalogPage(page);
    productPage = new ProductPage(page);
    filtersPage = new FiltersPage(page);
    catalogPage.preparePage();
    await catalogPage.goto();
    await productPage.closePopupWindow();
    await catalogPage.clickSearchButton();
  });

  test("Add new item to Checkout", async ({ page }) => {
    await catalogPage.fillSearchField();
    await catalogPage.enterSearchField();
    await expect(catalogPage.getItemCatalog()).toBeVisible();

    await catalogPage.clickCatalogItem();
    await expect(page).toHaveURL(/.*makeup.com.ua.*product.*/);

    await productPage.clickBuyButton();
    await page.waitForTimeout(5000);
    await expect(productPage.getCheckoutPopup()).toContainText("Корзина");
  });

  test("Filter searched items", async ({ page }) => {
    await catalogPage.fillSearchField();
    await catalogPage.enterSearchField();
    await expect(catalogPage.getItemCatalog()).toBeVisible();

    await filtersPage.filterBrand();
    await page.waitForTimeout(1000);
    await expect(filtersPage.getFilterTag()).toBeVisible();
  });

  test("Filter by several parameters", async ({ page }) => {
    await catalogPage.fillSearchField();
    await catalogPage.enterSearchField();
    await expect(catalogPage.getItemCatalog()).toBeVisible();

    await filtersPage.filterBrand();
    await page.waitForTimeout(1000);
    await expect(filtersPage.getFilterTag()).toBeVisible();

    await filtersPage.filterBrandSeries();
    await page.waitForTimeout(1000);
    await expect(filtersPage.getFilterSeriesTag()).toBeVisible();
  });

  test("Sort items by price", async ({ page }) => {
    await catalogPage.fillSearchField();
    await catalogPage.enterSearchField();
    await expect(catalogPage.getItemCatalog()).toBeVisible();

    await filtersPage.clickSortingDropdown();
    await filtersPage.clickSortingDropdownOption();

    await expect(page).toHaveURL(/.*makeup.com.ua.*sort=price&direction=asc.*/);
  });

  test("Add several items to the cart", async ({ page }) => {
    await catalogPage.fillSearchField();
    await catalogPage.enterSearchField();
    await expect(catalogPage.getItemCatalog()).toBeVisible();

    await catalogPage.clickCatalogItem();
    await expect(page).toHaveURL(/.*makeup.com.ua.*product.*/);

    await productPage.clickBuyButton();

    await page.waitForTimeout(3000);
    await expect(productPage.getCheckoutPopup()).toContainText("Корзина");
    await page.waitForTimeout(3000);

    //close the popup
    await productPage.closeCheckoutWindow();
    await page.waitForTimeout(3000);

    //add second item
    await catalogPage.clickSearchButton();

    await expect(catalogPage.getSearchInput()).toBeVisible();
    await catalogPage.clearSearchInput();

    await catalogPage.fillSecondProductSearchField();
    await catalogPage.enterSearchField();

    await expect(catalogPage.getItemCatalog()).toBeVisible();

    await catalogPage.clickSecondCatalogItem();

    await expect(page).toHaveURL(/.*makeup.com.ua.*product.*/);

    await productPage.clickBuyButton();
    await page.waitForTimeout(1000);
    await expect(productPage.getCheckoutPopup()).toContainText("Корзина");

    //check if both items are added to the cart
    await expect(await productPage.getItem()).toBeVisible();
    await expect(await productPage.getSecondItem()).toBeVisible();
  });
});
