import renderBeerCards from "./grid.js";
import renderBeer from "./beer.js";
import { STORAGE_SEARCH_KEY, STORAGE_MONTH_KEY } from "./filters.js";
import cookieManager from "./cookieManager.js";
import renderSigInDialog, { API_KEY_COOKIE_NAME } from "./signin.js";

const storedSearch = localStorage.hasOwnProperty(STORAGE_SEARCH_KEY)
  ? localStorage.getItem(STORAGE_SEARCH_KEY)
  : "";

let storedMonth = localStorage.hasOwnProperty(STORAGE_MONTH_KEY)
  ? localStorage.getItem(STORAGE_MONTH_KEY)
  : "";

const apiKey = cookieManager.getCookie(API_KEY_COOKIE_NAME);

page("/", () => {
  if (apiKey) {
    renderBeerCards(storedSearch, storedMonth);
  } else {
    renderSigInDialog();
  }
});
page("/beer/:id", ctx => {
  if (apiKey) {
    renderBeer(ctx.params.id);
  } else {
    renderSigInDialog();
  }
});
page();
