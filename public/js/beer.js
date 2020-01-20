import BeerFlixAPI from "./beerflix-api.js";
import resetMain from "./reset.js";

const templateBeerIngredients = ingredients => {
  return `<p>Malt:</p>
  ${ingredients.malt
    .map(malt => {
      return `<li>
      ${malt.name} - ${malt.amount.value} ${malt.amount.unit}
      </li>
      `;
    })
    .join("")}
<p>Hops:</p>
${ingredients.hops
  .map(hops => {
    return `<li>
      ${hops.name} - ${hops.amount.value} ${hops.amount.unit}. 
      Add: ${hops.add}. 
      Attribute: ${hops.attribute}
      </li>
      
      `;
  })
  .join("")}
<p>Yeast:</p>
<p>${ingredients.yeast}</p>`;
};

const templateBeerPage = beer => {
  return `
  <div class="bf-beer-portrait">
    <img class="bf-beer-image" src="${beer.image}" alt="${beer.name}">
    </div>
    <div class="bf-beer-info">
<h1 class="bf-beer-title">
${beer.name}
</h1>

<h4><i>${beer.firstBrewed}</i></h4>
<p class="bf-beer-synopsis">
${beer.description}
</p>
<p><b>Ingredients:</b></p>
${templateBeerIngredients(beer.ingredients)}
<p><b>Tips:</b></p>
<p>${beer.brewersTips}</p>
<p><i>By: ${beer.contributedBy}</i></p>
</div>`;
};

const renderBeer = async beerID => {
  const beer = await BeerFlixAPI.getBeer(beerID);
  const beerPage = resetMain("bf-beer-page");
  beerPage.innerHTML = templateBeerPage(beer);
};

export default renderBeer;
