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
      "-Play the damn game.<br>-It's working only a little bit for now.<br>-You're gay.";
  });

  modalClose.style.display = "block";
  modalClose.addEventListener("click", function () {
    modalBg.classList.remove("bg-active");
  });
}
