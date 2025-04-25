import { test, expect } from '@playwright/test';

const FRONTEND_URL = "http://localhost:5173/";

test('appUser should be able to login', async ({ page }) => {
  //go to the app and the login page
  await page.goto(FRONTEND_URL);
  await page.getByRole("link", { name: "Login" }).click();
  await expect(page.getByRole("heading", {name: "Login"})).toBeVisible();

  //fill in user credentials and attempt login
  await page.locator("[name=email]").fill("testuser@testusermail.com");
  await page.locator("[name=password]").fill("mypassword123");
  await page.getByRole("button", {name: "Login"}).click();

  //if user is logged in, there are links to their reviews, comments and there is a button for logging out
  await expect(page.getByText("Logged in!")).toBeVisible();
  await expect(page.getByRole("link", {name: "Your Reviews"})).toBeVisible();
  await expect(page.getByRole("link", {name: "Your Comments"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Logout"})).toBeVisible();
});
