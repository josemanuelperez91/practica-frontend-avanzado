const resetMain = newClass => {
  const mainElement = document.querySelector(".bf-main");

  mainElement.classList = "bf-main";
  mainElement.classList.add(newClass);
  return mainElement;
};

export default resetMain;
