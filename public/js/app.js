import renderBeerCards from "./grid.js";
import renderBeer from "./beer.js";

import { STORAGE_SEARCH_KEY, STORAGE_MONTH_KEY } from "./filters.js";

const storedSearch = localStorage.hasOwnProperty(STORAGE_SEARCH_KEY)
  ? localStorage.getItem(STORAGE_SEARCH_KEY)
  : "";

let storedMonth = localStorage.hasOwnProperty(STORAGE_MONTH_KEY)
  ? localStorage.getItem(STORAGE_MONTH_KEY)
  : "";

page("/", () => {
  renderBeerCards(storedSearch, storedMonth);
});
page("/beer/:id", ctx => renderBeer(ctx.params.id));
page();
