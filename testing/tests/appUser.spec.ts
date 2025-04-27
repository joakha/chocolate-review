import { test, expect } from '@playwright/test';

const FRONTEND_URL = "http://localhost:5173/";

const testerEmail= `testuser_${Date.now()}_email@testuseremail.com`;

test('appUser should be able to register', async ({ page }) => {
  //go to the app and the register page
  await page.goto(FRONTEND_URL);
  await page.getByRole("link", { name: "Register" }).click();
  await expect(page.getByRole("heading", {name: "Register"})).toBeVisible();

  //fill in user credentials and attempt registration
  await page.locator("[name=email]").fill(testerEmail);
  await page.locator("[name=username]").fill("testuser_username");
  await page.locator("[name=password]").fill("mypassword123");
  await page.locator("[name=repeatPassword]").fill("mypassword123");
  await page.getByRole("button", {name: "Register"}).click();

  //if user is registered, there are links to their reviews, comments and there is a button for logging out
  await expect(page.getByText("Registered successfully!")).toBeVisible();
  await expect(page.getByRole("link", {name: "Your Reviews"})).toBeVisible();
  await expect(page.getByRole("link", {name: "Your Comments"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Logout"})).toBeVisible();
});

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
