import categories from "../data/categories.js";
import quotes from "../data/quotes.js";

let activeCategoryId = categories[0].id;
let quotesHistory = [];
let historyIndex = -1;
let categorizedQuoteIndex = 0;

const getQuotesByCategoryId = (categoryId) => {
    return quotes.filter((quote) => quote.categoryId === categoryId);
};

const getQuoteById = (id) => {
    return quotes.find((quote) => quote.id === id);
};
const pushFirstActiveQuoteToHistory = () => {
    const activeQuotes = getQuotesByCategoryId(activeCategoryId);
    quotesHistory.push(activeQuotes[0]?.id);
};

const pushCategorisedQuote = () => {
    const activeQuotes = getQuotesByCategoryId(activeCategoryId);
    if (categorizedQuoteIndex > activeQuotes.length - 1) {
        categorizedQuoteIndex = 0;
    }
    quotesHistory.push(activeQuotes[categorizedQuoteIndex]?.id);
};

const showLastQuoteFromHistory = () => {
    updateQuoteDisplay(getQuoteById(quotesHistory[quotesHistory.length - 1]));
};

const showCurrentQuoteFromHistory = () => {
    updateQuoteDisplay(getQuoteById(quotesHistory[historyIndex]));
};

const changeActiveCategory = (categoryId) => {
    if (categoryId === activeCategoryId) {
        return;
    }

    categorizedQuoteIndex = 0;
    activeCategoryId = categoryId;
    pushFirstActiveQuoteToHistory();
    historyIndex++;
    showLastQuoteFromHistory();
    populateAllCategoriesMenu();
};

function populateCategoriesMenu(menuSelector) {
    const menu = document.querySelector(menuSelector);
    menu.innerHTML = "";

    categories.forEach((category) => {
        const li = document.createElement("li");
        li.classList.add("categories-menu-item");

        const button = document.createElement("button");
        button.classList.add("categories-button");
        button.textContent = category.name;

        if (category.id === activeCategoryId) {
            button.classList.add("active");
        }
        button.addEventListener("click", () => {
            changeActiveCategory(category.id);
        });

        li.appendChild(button);
        menu.appendChild(li);
    });
}

const updateQuoteDisplay = (quote) => {
    console.log(quotesHistory, historyIndex);
    const quoteTextElement = document.querySelector(".quote");
    const quoteAuthorElement = document.querySelector(
        ".author-wrapper span:last-child"
    );

    quoteTextElement.innerHTML = "";

    const openQuoteMark = document.createElement("span");
    openQuoteMark.classList.add("quotation-mark");
    openQuoteMark.textContent = "“";

    const quoteText = document.createElement("span");
    quoteText.textContent = quote.text;

    const closeQuoteMark = document.createElement("span");
    closeQuoteMark.classList.add("quotation-mark");
    closeQuoteMark.textContent = "”";

    quoteTextElement.appendChild(openQuoteMark);
    quoteTextElement.appendChild(quoteText);
    quoteTextElement.appendChild(closeQuoteMark);

    quoteAuthorElement.textContent = quote.author;
};

const activateProperCategory = () => {
    activeCategoryId = getQuoteById(quotesHistory[historyIndex]).categoryId;
    populateAllCategoriesMenu();
};

const showNextQuote = () => {
    if (historyIndex < quotesHistory.length - 1) {
        historyIndex++;
        showCurrentQuoteFromHistory();
        activateProperCategory();
    } else {
        categorizedQuoteIndex++;
        pushCategorisedQuote();
        historyIndex++;
        showLastQuoteFromHistory();
    }
};

const showPrevQuote = () => {
    if (historyIndex > 0) {
        historyIndex--;
        showCurrentQuoteFromHistory();
        activateProperCategory();
    }
};

const populateAllCategoriesMenu = () => {
    populateCategoriesMenu(".main-categories-menu");
    populateCategoriesMenu(".drawer-categories-menu");
};

window.addEventListener("DOMContentLoaded", () => {
    populateAllCategoriesMenu();
    pushFirstActiveQuoteToHistory();
    historyIndex++;
    showLastQuoteFromHistory();
});

document
    .getElementById("next-quote-btn")
    .addEventListener("click", showNextQuote);

document
    .getElementById("prev-quote-btn")
    .addEventListener("click", showPrevQuote);
