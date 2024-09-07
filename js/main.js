const categoryBtn = document.querySelector("#category-btn");
const drawerWrapper = document.querySelector("#drawer-wrapper");
const closeBtn = document.querySelector("#close-btn");

const handleCategoryBtnClick = () => {
    drawerWrapper.classList.toggle("shown");
};

const handleCloseBtnClick = () => {
    drawerWrapper.classList.remove("shown");
};

categoryBtn.addEventListener("click", handleCategoryBtnClick);
closeBtn.addEventListener("click", handleCloseBtnClick);
