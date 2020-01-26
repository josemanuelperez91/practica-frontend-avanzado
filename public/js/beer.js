import BeerFlixAPI from "./api-beerflix.js";
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
</div>

<div class="bf-comments">
<div class="bf-like">
<h2><img class="bf-like-icon" src="/icons/like-empty.svg">
<span class="bf-like-counter">${beer.likes}</span></h2>
</div>
<h2>Comments:</h2>
<div class="bf-comment-list">
  <p><i>No comments yet...</i></p>
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
  </div>
`;
};

const renderBeer = async beerID => {
  const beer = await BeerFlixAPI.getBeer(beerID);
  const beerPage = resetMain("bf-beer-page");

  beerPage.innerHTML = templateBeerPage(beer);

  const commentInput = document.querySelector(".bf-comment-input");
  const commentButton = document.querySelector(".bf-comment-button");
  const likeButton = document.querySelector(".bf-like-icon");

  const isLiked = Boolean(localStorage.getItem(`liked_${beerID}`));
  if (isLiked) {
    likeButton.style.pointerEvents = "none";
    likeButton.src = `/icons/like.svg`;
  } else {
    likeButton.onclick = async event => {
      likeButton.style.pointerEvents = "none";
      try {
        const updatedNumLikes = await BeerFlixAPI.postLike(beerID);
        const likeCounterElement = document.querySelector(".bf-like-counter");
        likeCounterElement.innerText = updatedNumLikes;
        localStorage.setItem(`liked_${beerID}`, true);
        likeButton.src = `/icons/like.svg`;
      } catch (Error) {
        likeButton.style.pointerEvents = "all";
      }
    };
  }

  commentInput.oninput = event => {
    event.target.style.height = "";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  renderComments(beer.comments);

  commentButton.onclick = async event => {
    const commentText = commentInput.value;

    if (commentText.trim() != "") {
      const updatedComments = await BeerFlixAPI.postComment(
        beerID,
        commentText
      );
      commentInput.value = "";
      renderComments(updatedComments);
    }
  };
};

const renderComments = comments => {
  const commentsListContainer = document.querySelector(".bf-comment-list");
  if (comments.length > 0) {
    commentsListContainer.innerHTML = comments
      .map(comment => templateComment(comment))
      .join("");
  }
};

export default renderBeer;
