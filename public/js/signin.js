import BeerFlixAPI from "./api-beerflix.js";
import cookieManager from "./cookieManager.js";
export const API_KEY_COOKIE_NAME = "api_key";

const apiKey = cookieManager.getCookie(API_KEY_COOKIE_NAME);
const signInButtonElement = document.querySelector(".bf-signin");

const signOut = () => {
  cookieManager.deleteCookie(API_KEY_COOKIE_NAME);
  localStorage.clear();
  window.location.reload();
};

const removeSigInDialog = () => {
  document.querySelector(".bf-signin-dialog").remove();
  document.body.classList.remove("blocked");
};

const alertErrorSigInDialog = (input, msg) => {
  const signInDialog = document.querySelector(".bf-signin-dialog");
  const infoPanel = document.querySelector(".bf-signin-info");

  infoPanel.innerHTML = `${msg}`;
  signInDialog.style.animation = `shake .1s normal 0s 3`;
  input.classList.add("invalid");
};

const submitSigIn = async () => {
  const inputEmail = document.querySelector(".bf-signin-input");

  if (!inputEmail.validity.valid || inputEmail.value.trim() == "") {
    alertErrorSigInDialog(inputEmail, "Invalid Email Format");
  } else {
    try {
      const newApiKey = await BeerFlixAPI.signIn(inputEmail.value);
      cookieManager.setCookie(API_KEY_COOKIE_NAME, newApiKey, 30);
      window.location.reload();
      removeSigInDialog();
    } catch (Error) {
      console.error(Error);
      alertErrorSigInDialog(inputEmail, "Email not found");
    }
  }
};
const renderSigInDialog = () => {
  document.body.classList.add("blocked");
  document.body.insertAdjacentHTML(
    "beforebegin",
    `
  <div class="bf-signin-dialog">
    <input class="bf-signin-input" type="email" placeholder="Email">
    <div class="bf-signin-info">
    </div>
    <div>
    <button class="bf-signin-button submit">Sig-in</button>
    <button class="bf-signin-button cancel">Cancel</button>
    </div>
  </div>`
  );

  document.querySelector(".bf-signin-button.submit").onclick = submitSigIn;
  document.querySelector(
    ".bf-signin-button.cancel"
  ).onclick = removeSigInDialog;
};

if (apiKey) {
  signInButtonElement.innerHTML = `Sign Out`;
  signInButtonElement.classList.add("signout");
  signInButtonElement.onclick = signOut;
} else {
  signInButtonElement.onclick = renderSigInDialog;
}

export default renderSigInDialog;
