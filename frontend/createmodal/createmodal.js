const openCreateModal = document.querySelector('.btn-open-create');
const createModal = document.querySelector('.create-modal');

function openCreate() {
    fetch('createmodal/createmodal.html')
    .then(res => res.text())
    .then(data => {
        createModal.innerHTML = data;

        createModal.style.display = 'flex';

        document.querySelector('.btn-close-create').addEventListener('click', closeCreate);
    })
    .catch(error => {
        console.log('Error loading create modal :', error);
    });
}

function closeCreate() {
    createModal.style.display = 'none';
}

openCreateModal.addEventListener('click', openCreate);

function createPost() {
    const uploadTitleText = document.querySelector('.uploadTitle');
    const uploadContentText = document.querySelector('.uploadContent');

    fetch("/posts/create",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer <your_jwt_token>"
        },
        body: JSON.stringify({
            title: uploadTitleText.value,
            content: uploadContentText.value
        }),
    })
    // 나중에 token예외처리 해줄예정 반응은 나중에 할 예정.
        .then((res) => res.json())
        .then((data) => console.log(data));
}