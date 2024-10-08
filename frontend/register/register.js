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

// 이 부분은 register.html이 로드되기 전에 실행되므로 오류 발생 가능성 있음
const openRegisterModal = document.querySelector(".btn-register-modal");
if (openRegisterModal) {
  openRegisterModal.onclick = openRegister;
} else {
  console.log("회원가입 버튼을 찾을 수 없습니다.");
}
