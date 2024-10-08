const openModal = document.querySelector(".btn-open-modal");
const Modal = document.querySelector(".modal");

function openLogin() {
  fetch("loginmodal/loginmodal.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("modal").innerHTML = data;

      document.querySelector(".modal").style.display = "flex";

      document
        .querySelector(".btn-close-modal")
        .addEventListener("click", closeLogin);
    })
    .catch((error) => {
      console.log("Error loading modal :", error);
    });
}

function closeLogin() {
  document.querySelector(".modal").style.display = "none";
}

openModal.addEventListener("click", openLogin);

