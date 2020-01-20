import renderBeerCards from "./grid.js";
import renderBeer from "./beer.js";

import { STORAGE_SEARCH_KEY } from "./search.js";

const storedSearch = 
localStorage.hasOwnProperty(STORAGE_SEARCH_KEY) ? localStorage.getItem(STORAGE_SEARCH_KEY)
: "";


page("/", () => {renderBeerCards(storedSearch)});
page("/beer/:id", ctx => renderBeer(ctx.params.id));
page();

