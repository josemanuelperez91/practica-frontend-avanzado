import BeerFlixAPI from "./api-beerflix.js";
import resetMain from "./reset.js";

const DEFAULT_GRID_LIMIT = 10;

const templateBeerCard = beer => {
  return `
  <a href='/beer/${beer.beerId}'>
        <div class="bf-beer-card">
            <img src="${beer.image}" alt="${beer.name}">
            <div class="bf-beer-card-info">
            <h3>${beer.name}
            <br> ${beer.firstBrewed}</h3>
          </div>
        </div>
        </a>
    `;
};

const renderBeerCards = async (search, date, limit = DEFAULT_GRID_LIMIT) => {
  let beers = await BeerFlixAPI.getBeers(search, limit);
  const cardGrid = resetMain("bf-beer-grid");

  if (date) {
    const numDate = Number(date.split("-").join(""));

    beers = beers.filter(beer => {
      const numDateBeer = Number(
        beer.firstBrewed
          .split("/")
          .reverse()
          .join("")
      );
      return numDateBeer >= numDate;
    });
  }

  cardGrid.innerHTML = beers
    .map(beer => {
      return templateBeerCard(beer);
    })
    .join("");
};

export default renderBeerCards;
