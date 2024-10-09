const registerModal = document.querySelector(".register-modal");

function openRegister() {
  fetch("register/register.html")
    .then((res) => res.text())
    .then((data) => {
      // 기존 모달 숨기기
      document.querySelector(".modal").style.display = "none";
      // register.html 내용을 모달에 삽입
      registerModal.innerHTML = data;
      registerModal.style.display = "flex";

      // 내용이 로드된 후, 닫기 버튼을 찾아서 클릭 이벤트 할당
      const closeButton = document.querySelector(".btn-close-register-modal");
      if (closeButton) {
        closeButton.onclick = closeRegister;
      } else {
        console.log("닫기 버튼을 찾을 수 없습니다.");
      }
    })
    .catch((error) => {
      console.log("Error loading register modal:", error);
    });
}

function closeRegister() {
  registerModal.style.display = "none";
}

// 회원가입 버튼 누른 후

function userRegister() {
  const userRegisterId = document.querySelector(".user-register-id");
  const userRegisterPassWord = document.querySelector(
    ".user-register-password"
  );
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userRegisterId.value,
      password: userRegisterPassWord.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => alert(data.message));
}
