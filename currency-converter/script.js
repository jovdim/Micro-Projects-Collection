//If you find this useful, please star the repo and follow me on github: https://github.com/jovdim/Micro-Projects-Collection

const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertButton = document.getElementById("convert-button");
const resultDiv = document.getElementById("result");

// API URLs src: https://github.com/fawazahmed0/exchange-api
const primaryAPI =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const fallbackAPI = "https://latest.currency-api.pages.dev/v1/currencies";

// Fetch all available currencies and their names
async function fetchCurrencies() {
  try {
    const response = await fetch(`${primaryAPI}.json`);
    if (!response.ok) throw new Error("Primary API failed");
    return await response.json();
  } catch {
    const fallbackResponse = await fetch(`${fallbackAPI}.json`);
    if (!fallbackResponse.ok) throw new Error("Fallback API failed");
    return await fallbackResponse.json();
  }
}

// Fetch conversion rates for a given base currency
async function fetchConversionRate(base) {
  try {
    const response = await fetch(`${primaryAPI}/${base}.json`);
    if (!response.ok) throw new Error("Primary API failed");
    return await response.json();
  } catch {
    const fallbackResponse = await fetch(`${fallbackAPI}/${base}.json`);
    if (!fallbackResponse.ok) throw new Error("Fallback API failed");
    return await fallbackResponse.json();
  }
}

// Populate the dropdowns with the list of currencies
function populateDropdowns(currencies) {
  for (const currency in currencies) {
    const optionFrom = document.createElement("option");
    const optionTo = document.createElement("option");

    optionFrom.value = currency;
    optionFrom.textContent = `${currency.toUpperCase()} - ${
      currencies[currency]
    }`;
    optionTo.value = currency;
    optionTo.textContent = `${currency.toUpperCase()} - ${
      currencies[currency]
    }`;

    fromCurrency.appendChild(optionFrom);
    toCurrency.appendChild(optionTo);
  }

  // Set default values
  fromCurrency.value = "usd";
  toCurrency.value = "eur";
}

// Convert currency based on the input amount and selected currencies
async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = "Please enter a valid amount.";
    return;
  }

  const from = fromCurrency.value;
  const to = toCurrency.value;

  // Fetch the conversion data for the base currency (e.g., "usd")
  const conversionData = await fetchConversionRate(from);

  // Debugging: Log the full conversion data to inspect its structure
  console.log("Full Conversion Data:", conversionData); //u can remove this if you want

  // Check if the response contains the 'from' currency and the 'to' currency conversion rate
  if (
    conversionData &&
    conversionData[from] &&
    conversionData[from].hasOwnProperty(to)
  ) {
    const rate = conversionData[from][to];
    const convertedAmount = (amount * rate).toFixed(2);
    resultDiv.textContent = `Converted Amount: ${to.toUpperCase()} ${convertedAmount}`;
  } else {
    console.error("Conversion rate not found for:", from, "to", to);
    resultDiv.textContent = "Conversion rate not found.";
  }
}

// Initialize the application when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const currencies = await fetchCurrencies();
    populateDropdowns(currencies);
  } catch (error) {
    console.error("Failed to fetch currencies:", error);
    resultDiv.textContent = "Failed to load currency data.";
  }
});

// Add event listener to the convert button
convertButton.addEventListener("click", convertCurrency);
