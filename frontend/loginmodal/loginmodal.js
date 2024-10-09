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

const loginButton = document.querySelector(".btn-login");

function userLogin() {
  const userId = document.querySelector(".userid");
  const userPassWord = document.querySelector(".password");

  fetch("users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userId.value,
      password: userPassWord.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.data.jwtToken) {
        localStorage.setItem("jwtToken", data.data.jwtToken);
        alert(data.message);
      } else {
        alert(data.message);
      }
    });
}
