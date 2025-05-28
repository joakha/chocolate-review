import { test, expect } from '@playwright/test';
import path from 'path';

const FRONTEND_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
    await page.goto(FRONTEND_URL);
    await page.getByRole("link", { name: "Login" }).click();
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

    //fill in user credentials and attempt login
    await page.locator("[name=email]").fill("testuser@testusermail.com");
    await page.locator("[name=password]").fill("mypassword123");
    await page.getByRole("button", { name: "Login" }).click();

    //if user is logged in, there are links to their reviews, comments and there is a button for logging out
    await expect(page.getByText("Logged in!")).toBeVisible();
});

test("appUser should be able to create a review", async ({ page }) => {
    await page.goto(`${FRONTEND_URL}/create-review`);
    await page.locator("[name=title]").fill("Review test title");

    await page.setInputFiles("[name=pictures]", [
        path.join(__dirname, "pictures", "testPicture.png"),
        path.join(__dirname, "pictures", "testPicture2.png")
    ]);

    await page.locator("[name=chocolate]").fill("Review test chocolate");
    await page.locator("[name=recommended]").check();

    await page.selectOption("select[name=rating]", "2");
    await page.locator("[name=price]").fill("5");

    await page.getByText("Coffee").click();
    await page.getByText("Cherry").click();

    await page.locator("[name=content]").fill("Review test content");

    await page.getByRole("button", { name: "Create Review" }).click();
    await expect(page.getByText("Created Your Review!")).toBeVisible();
});

test("users reviews should be displayed", async ({ page }) => {
    await page.goto(`${FRONTEND_URL}/your-reviews`);
    await expect(page.getByText("Trying out some chocolate")).toBeVisible();
    await expect(page.getByText("Hello, this is my first review.")).toBeVisible();
    await expect(page.getByText("Dark Chocolate")).toBeVisible();
    await expect(page.getByText("Recommended").first()).toBeVisible();
    await expect(page.getByText("Decent")).toBeVisible();
    await expect(page.getByText("4€")).toBeVisible();
    await expect(page.getByRole("link", { name: "View More" }).first()).toBeVisible();
});

test("User should be able to edit their reviews", async ({ page }) => {
    await page.goto(`${FRONTEND_URL}/your-reviews`);
    await page.getByRole("link", { name: "View More" }).first().click();

    await page.waitForSelector('[name=title]', { state: "attached" });
    await expect(page.locator('[name=title]')).toHaveValue("Trying out some chocolate");
    await page.locator('[name=title]').fill("Trying out some chocolate edited");
    await page.getByRole("button", { name: "Create Review" }).click();
    await expect(page.getByText("Updated Your Review!")).toBeVisible();

    await page.getByRole("link", { name: "View More" }).first().click();

    await expect(page.locator('[name=title]')).toHaveValue("Trying out some chocolate edited");
    await page.locator('[name=title]').fill("Trying out some chocolate");
    await page.getByRole("button", { name: "Create Review" }).click();
    await expect(page.getByText("Trying out some chocolate")).toBeVisible();
})