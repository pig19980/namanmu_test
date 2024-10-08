const openCardModal = document.querySelector('.post-card');
const cardModal = document.querySelector('.card-modal');

function openCard() {
    fetch('cardmodal/cardmodal.html')
    .then(res => res.text())
    .then(data => {
        cardModal.innerHTML = data;

        cardModal.style.display = 'flex';

        document.querySelector('.btn-close-card').addEventListener('click', closeCard);
    })
    .catch(error => {
        console.log("Error loading card modal : ", error);
    });
}

function closeCard() {
    cardModal.style.display = 'none';
}

openCardModal.addEventListener('click', openCard);