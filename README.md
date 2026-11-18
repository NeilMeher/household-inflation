# Inflation for Different Households

How does a change in spending shares alter household exposure to the same prices?

Using urban December 2025 official category rates, the fictional food-heavy, rent-heavy, and health and services baskets give 0.65%, 2.20%, and 2.77%. Switching Basket A between the first and third presets reverses the ordering against the rent-heavy basket.

## Run locally

Use Node.js 20 or later. Run `node --test calculator.test.js` and `node report.js`. Open `index.html`. Switch Basket A from the food-heavy preset to the health and services preset. The chart-free table reports each category's contribution in percentage points. No third-party dependencies or keys are required.

Source is MoSPI's December 2025 CPI release, published 12 January 2026, Annexure II urban column (linked in the app). Divide every nonnegative weight by the total before multiplying by the reported group rate. This is a fixed-weight illustration and the weights describe invented households. Discuss why doubling every weight changes nothing and why food can contribute negatively.

Neil Meher specified the project and its requirements. Codex transcribed the published rates and chose the fictional preset weights. Neil's independent sample calculation is pending.
