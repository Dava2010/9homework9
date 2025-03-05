const apiKey = "6489d5a9eaa061f37c905b2b"; 
const baseUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");
const resultElement = document.getElementById("result");

const currencyFlags = {
    USD: "🇺🇸", EUR: "🇪🇺", UZS: "🇺🇿", RUB: "🇷🇺", GBP: "🇬🇧",
    JPY: "🇯🇵", CNY: "🇨🇳", KZT: "🇰🇿", CAD: "🇨🇦", AUD: "🇦🇺",
    TRY: "🇹🇷", AED: "🇦🇪", CHF: "🇨🇭", INR: "🇮🇳", KRW: "🇰🇷",
    BRL: "🇧🇷", MXN: "🇲🇽", IDR: "🇮🇩", SGD: "🇸🇬", HKD: "🇭🇰"
};

async function fetchCurrency() {
    try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        const currencies = Object.keys(data.conversion_rates);

        fromCurrency.innerHTML = toCurrency.innerHTML = currencies
            .map(currency => `<option value="${currency}">${currencyFlags[currency] || "🏳️"} ${currency}</option>`)
            .join("");

        fromCurrency.value = "USD";
        toCurrency.value = "UZS";
    } catch (error) {
        console.error("Xatolik:", error);
    }
}

async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    if (!amount || amount <= 0) return (resultElement.innerText = "Iltimos, to‘g‘ri miqdor kiriting.");

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`);
        const data = await response.json();
        const rate = data.conversion_rates[toCurrency.value];
        const convertedAmount = (amount * rate).toFixed(2);

        resultElement.innerText = `${currencyFlags[fromCurrency.value] || "🏳️"} ${amount} ${fromCurrency.value} ≈ 
                                   ${currencyFlags[toCurrency.value] || "🏳️"} ${convertedAmount} ${toCurrency.value}`;
    } catch (error) {
        console.error("Xatolik:", error);
        resultElement.innerText = "Konvertatsiya amalga oshmadi.";
    }
}

swapBtn.addEventListener("click", () => {
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
    if (amountInput.value) convertCurrency();
});

fetchCurrency();
convertBtn.addEventListener("click", convertCurrency);
