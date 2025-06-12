import { test, expect } from '@playwright/test';

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

test("Find results are displayed correctly", async ({ page }) => {
    await page.goto(FRONTEND_URL);
    await page.getByPlaceholder("Title...").fill("Is marabou");
    await page.getByRole("button", { name: "Find" }).click();
    await expect(page.getByText(/reviews with title/i)).toBeVisible();
    await expect(page.getByText("Is Marabou good?")).toBeVisible();
})