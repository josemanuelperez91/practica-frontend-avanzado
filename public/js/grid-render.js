import BeerFlixAPI from "./beerflix-api.js";

const templateBeerCard = beer => {
  return `
        <div data-href="${beer.beerId}" class="bf-beer-card">
            <img src="${beer.image}" alt="${beer.name}">
            <div class="bf-beer-info">
            <h3>${beer.name}
            <br> ${beer.firstBrewed}</h3>
          </div>
        </div>
    `;
};

const renderBeerCards = async (search, limit) => {
  const beers = await BeerFlixAPI.getBeers(search, limit);

  const cardGrid = document.querySelector(".bf-beer-grid");
  cardGrid.innerHTML = "";
  cardGrid.innerHTML = beers
    .map(beer => {
      return templateBeerCard(beer);
    })
    .join("");
};

export default renderBeerCards;
