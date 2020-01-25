import renderBeerCards from "./grid.js";
import renderSigInDialog from "./signin.js";

export const STORAGE_SEARCH_KEY = "search_value";
export const STORAGE_MONTH_KEY = "month_value";

const searchInputElement = document.querySelector(".bf-input-search");
const monthInputElement = document.querySelector(".bf-input-month");
const monthFilterButtonElement = document.querySelector(
  ".bf-navbar-icon.month"
);
const searchFilterButtonElement = document.querySelector(
  ".bf-navbar-icon.search"
);
const signInButtonElement = document.querySelector(".bf-signin");

monthFilterButtonElement.onclick = function() {
  searchInputElement.style.display = "none";
  monthInputElement.style.display = "block";

  searchFilterButtonElement.classList.remove("active");
  this.classList.add("active");
};

searchFilterButtonElement.onclick = function() {
  monthInputElement.style.display = "none";
  searchInputElement.style.display = "block";

  monthFilterButtonElement.classList.remove("active");
  this.classList.add("active");
};

signInButtonElement.onclick = renderSigInDialog;

let searchValue = localStorage.hasOwnProperty(STORAGE_SEARCH_KEY)
  ? localStorage.getItem(STORAGE_SEARCH_KEY)
  : "";

searchInputElement.value = searchValue;

let monthValue = localStorage.hasOwnProperty(STORAGE_MONTH_KEY)
  ? localStorage.getItem(STORAGE_MONTH_KEY)
  : "";

monthInputElement.value = monthValue;

let searchExecution = () => {};
const searchTimer = searchInputValue => {
  window.clearTimeout(searchExecution);
  searchExecution = setTimeout(() => {
    searchValue = searchInputValue;
    localStorage.setItem(STORAGE_SEARCH_KEY, searchValue);
    renderFilteredBeerCards();
  }, 1000);
};

const renderFilteredBeerCards = () => {
  renderBeerCards(searchValue, monthValue);
};

const handleSearch = event => searchTimer(event.target.value);

const handleMonth = event => {
  monthValue = event.target.value;
  localStorage.setItem(STORAGE_MONTH_KEY, monthValue);
  renderFilteredBeerCards();
};

searchInputElement.oninput = handleSearch;
monthInputElement.oninput = handleMonth;
