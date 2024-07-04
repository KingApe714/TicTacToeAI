export function modal() {
  const modalBtn = document.querySelector(".modal-button");
  const modalBg = document.querySelector(".modal-bg");
  const modalClose = document.querySelector(".modal-close");
  const modalChild = document.querySelector(".modal-child");
  const modalTitle = document.querySelector(".modal-title");

  const modalInner = document.querySelector(".modal-inner");

  modalBtn.addEventListener("click", function () {
    modalBg.classList.add("bg-active");
    modalTitle.innerHTML = "INSTRUCTIONS";
    modalChild.innerHTML =
      "-Make as many words as you can by swiping through adjacent tiles.<br>-Only words that are 3 letters or longer will be accepted.<br>-You can repeat words so long as you use a different arrangement of letters.";
  });

  modalClose.style.display = "block";
  modalClose.addEventListener("click", function () {
    modalBg.classList.remove("bg-active");
  });
}
