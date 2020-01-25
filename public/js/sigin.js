import BeerFlixAPI from "./api-beerflix.js";

const removeSigInDialog = () => {
  document.querySelector(".bf-sigin-dialog").remove();
  document.body.classList.remove("blocked");
};

const alertErrorSigInDialog = (input, msg) => {
  const sigInDialog = document.querySelector(".bf-sigin-dialog");
  const infoPanel = document.querySelector(".bf-sigin-info");

  infoPanel.innerHTML = `${msg}`;
  sigInDialog.style.animation = `shake .1s normal 0s 3`;
  input.classList.add("invalid");
};

const submitSigIn = async () => {
  const inputEmail = document.querySelector(".bf-sigin-input");

  if (!inputEmail.validity.valid || inputEmail.value.trim() == "") {
    alertErrorSigInDialog(inputEmail, "Invalid Email Format");
  } else {
    try {
      const newApiKey = await BeerFlixAPI.sigIn(inputEmail.value);
      //crear cookie con apikey
      //cambiar boton a sign out
      //cambiar la api para que funcione con nueva apikey
      removeSigInDialog();
    } catch (Error) {
      alertErrorSigInDialog(inputEmail, "Email not found");
    }
  }
};
const renderSigInDialog = () => {
  document.body.classList.add("blocked");
  document.body.insertAdjacentHTML(
    "beforebegin",
    `
  <div class="bf-sigin-dialog">
    <input class="bf-sigin-input" type="email" placeholder="Email">
    <div class="bf-sigin-info">
    </div>
    <div>
    <button class="bf-sigin-button submit">Sig-in</button>
    <button class="bf-sigin-button cancel">Cancel</button>
    </div>
  </div>`
  );

  document.querySelector(".bf-sigin-button.submit").onclick = submitSigIn;
  document.querySelector(".bf-sigin-button.cancel").onclick = removeSigInDialog;
};

export default renderSigInDialog;
