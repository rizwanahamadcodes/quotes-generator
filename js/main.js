import categories from "../data/categories.js";
import quotes from "../data/quotes.js";

let activeCategoryId = categories[0].id;
let quoteHistory = [];
let historyIndex = -1;

const getQuotesByCategoryId = (categoryId) => {
    return quotes.filter((quote) => quote.categoryId === categoryId);
};

const getQuoteById = (id) => {
    return quotes.find((quote) => quote.id === id);
};
const pushFirstActiveQuoteToHistory = () => {
    const activeQuotes = getQuotesByCategoryId(activeCategoryId);
    quoteHistory.push(activeQuotes[0]?.id);
};

const showLastQuote = () => {
    console.log(quoteHistory, historyIndex);
    updateQuoteDisplay(getQuoteById(quoteHistory[quoteHistory.length - 1]));
};

const changeActiveCategory = (categoryId) => {
    if (categoryId === activeCategoryId) {
        return;
    }

    activeCategoryId = categoryId;
    pushFirstActiveQuoteToHistory();
    historyIndex++;
    showLastQuote();
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

const populateAllCategoriesMenu = () => {
    populateCategoriesMenu(".main-categories-menu");
    populateCategoriesMenu(".drawer-categories-menu");
};

window.addEventListener("DOMContentLoaded", () => {
    populateAllCategoriesMenu();
    pushFirstActiveQuoteToHistory();
    historyIndex++;
    showLastQuote();
});
