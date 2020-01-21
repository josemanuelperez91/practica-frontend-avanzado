import BeerFlixAPI from "./beerflix-api.js";
import resetMain from "./reset.js";

const commentInput = document.querySelector(".bf-comment-input");
const commentButton = document.querySelector(".bf-comment-button");

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
</div>
<div class="bf-comments">
<h2>Comments:</h2>
<div class="bf-comment-list">
  <i>No comments yet...</i>
</div>
<div class="bf-comment-form">
  <textarea class="bf-comment-input" placeholder="Write your opinion here"></textarea>
  <button class="bf-comment-button">Send</button>
</div>
</div>
`;
};

const templateComment = comment => {
  const formattedDate = new Date(comment.dateComment).toLocaleString("en-GB");
  return `
  <div class="bf-comment-item">
  <span class="bf-comment-date">${formattedDate}</span>
  <div class="bf-comment-text">${comment.comment}</div>
  <div>
`;
};

const renderBeer = async beerID => {
  const beer = await BeerFlixAPI.getBeer(beerID);
  const beerPage = resetMain("bf-beer-page");
  beerPage.innerHTML = templateBeerPage(beer);
  commentInput.oninput = handleInputArea;
  commentButton.onclick = handleSubmit;

  renderComments(beer.comments);
};

const renderComments = comments => {
  console.log(comments);
  const commentList = document.querySelector(".bf-comment-list");
  commentList.innerHTML = comments.map(templateComment).join("");
};

const handleInputArea = event => {
  event.target.style.height = "";
  event.target.style.height = event.target.scrollHeight + "px";
};

const handleSubmit = event => {
  const commentText = commentInput.value;

  if (commentText.trim() != "") {
    event.target.setAttribute("disabled", true);
    BeerFlixAPI.postComment(commentText);
  }
};

searchInputElement.oninput = handleSearch;

export default renderBeer;
