import asyncio
import os
from playwright.async_api import async_playwright, expect

async def main():
    # A dictionary mapping component keys to a unique selector to wait for.
    # This confirms that the specific component has rendered.
    components_to_verify = {
        'GeminiAppCanvasCLIApp': "text=/CLI restored/",
        'DangerousCodeTestApp': "h1:has-text('Vulnerability Test Harness')",
        'GeminiAppCanvasAgentApp': "text=/G'day! The agent is now fully autonomous/",
        'GeminiAppJavascriptIntrospectorApp': "h1:has-text('JavaScript Introspector')",
        'GeminiAppProbeReactAppApp': "h1:has-text('Comprehensive Canvas Prober')",
        'GeminiCDNCanaryApp': "h1:has-text('CDN Canary')",
        'JulesIntrospectorApp': "h1:has-text(\"Jules' Comprehensive Introspector\")",
        'TestComponentApp': "h1:has-text('TestComponent Component')",
    }

    # Create a directory for screenshots if it doesn't exist
    screenshots_dir = "verification_screenshots"
    os.makedirs(screenshots_dir, exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        print("Navigating to the component dashboard...")
        await page.goto("http://localhost:8000/index.html")

        # Wait for the dashboard itself to load
        await expect(page.get_by_label("Load Component:")).to_be_visible()
        print("Dashboard loaded successfully.")

        for key, selector in components_to_verify.items():
            print(f"--- Verifying component: {key} ---")

            # Select the component from the dropdown
            await page.get_by_label("Load Component:").select_option(key)
            print(f"Selected '{key}' from dropdown.")

            # Wait for the unique element of that component to appear
            await expect(page.locator(f'#component-container').locator(selector)).to_be_visible(timeout=15000)
            print(f"Successfully found unique selector: '{selector}'")

            # Wait a moment for full rendering
            await page.wait_for_timeout(1000)

            # Take a screenshot
            screenshot_path = f"{screenshots_dir}/{key}.png"
            await page.screenshot(path=screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")
            print("--- Verification successful ---\n")

        await browser.close()
        print("All components verified successfully!")

if __name__ == "__main__":
    asyncio.run(main())