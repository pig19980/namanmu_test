// const openCardModal = document.querySelector('.post-card');
// const cardModal = document.querySelector('.card-modal');

// function openCard() {
//     fetch('cardmodal/cardmodal.html')
//     .then(res => res.text())
//     .then(data => {
//         cardModal.innerHTML = data;

//         cardModal.style.display = 'flex';

//         document.querySelector('.btn-close-card').addEventListener('click', closeCard);
//     })
//     .catch(error => {
//         console.log("Error loading card modal : ", error);
//     });
// }

// function closeCard() {
//     cardModal.style.display = 'none';
// }

// openCardModal.addEventListener('click', openCard);

// function openCard(card_id) {
//   fetch("/posts/view", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       id: card_id,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       const cards = data.data.Post;
//       console.log(cards);
//       makeCardDetail(cards["id"], cards["createdUsername"], cards["title"], cards["content"], cards["createdAt"], cards["likes"], cards["imageURL"])
//     });
// }
// function makeCardDetail(card_id, createdUsername, title, content, createdAt, likes, imageURL) {
//   let temp_html = `<div class="post-card">
//             <div class="post-text">
//                 <h5>${createdUsername}</h5>
//                 <h3>${title}</h3>
//                 <h6>${content}</h6>
//             </div>
//             <div class='date'>
//                 <h6>${createdAt}</h6>
//                 <h6>${likes}</h6>
//             </div>
//             <div class=img-box>
//                 <img src="${imageURL}" width=100% height=100%>
//             </div>
//         </div>`;
//     document.querySelector(".card-modal").innerHTML += temp_html;
// }
