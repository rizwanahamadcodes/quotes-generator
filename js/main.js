import categories from "../data/categories.js";

let activeCategoryId = 1;

const updateCategories = () => {
    populateCategoriesMenu(".main-categories-menu");
    populateCategoriesMenu(".drawer-categories-menu");
};
updateCategories();

const changeActiveCategory = (categoryId) => {
    activeCategoryId = categoryId;
    updateCategories();
};

function populateCategoriesMenu(menuSelector) {
    const menu = document.querySelector(menuSelector);
    menu.innerHTML = "";

    categories.forEach((category) => {
        const li = document.createElement("li");
        li.classList.add("categories-menu-item");

        const button = document.createElement("button");
        if (category.id === activeCategoryId) {
            button.classList.add("active");
        }

        button.classList.add("categories-button");
        button.textContent = category.name;
        button.addEventListener("click", () => {
            changeActiveCategory(category.id);
        });

        li.appendChild(button);
        menu.appendChild(li);
    });
}
