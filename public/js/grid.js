import BeerFlixAPI from "./beerflix-api.js";
import resetMain from "./reset.js";

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

const renderBeerCards = async (search, date, limit) => {
  let beers = await BeerFlixAPI.getBeers(search, limit);
  const cardGrid = resetMain("bf-beer-grid");

  if (date) {
    const numDate = Number(date.split("-").join(""));
    console.log(numDate);

    beers = beers.filter(beer => {
      const numDateBeer = Number(
        beer.firstBrewed
          .split("/")
          .reverse()
          .join("")
      );
      console.log(numDateBeer);

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
