// memoria.js

const cardsData = [
  { img: "img/img1.jpg", fecha: "24/09/2024" },
  { img: "img/img2.jpg", fecha: "21/09/2024" },
  { img: "img/img3.webp", fecha: "03/03/2024" },
  { img: "img/img4.jpg", fecha: "21/03/2025" },
  { img: "img/img5.webp", fecha: "28/02/2025" },
  { img: "img/img6.webp", fecha: "22/02/2025" },
];

const memoryContainer = document.getElementById("memory-container");
const soundCorrect = document.getElementById("sound-correct");
const soundWrong = document.getElementById("sound-wrong");
const restartBtn = document.getElementById("restart-btn");

let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function crearTablero() {
  let cards = [];

  // Creamos pares: imagen y fecha (como palabra)
  cardsData.forEach((item, index) => {
    cards.push({ type: "img", ...item, id: index });
    cards.push({ type: "word", ...item, id: index });
  });

  shuffle(cards);

  memoryContainer.innerHTML = "";

  cards.forEach((card) => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.dataset.id = card.id;
    cardEl.dataset.type = card.type;

    cardEl.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">
          ${
            card.type === "img"
              ? `<img src="${card.img}" alt="Imagen memoria">`
              : `<span>${card.fecha}</span>`
          }
        </div>
      </div>
    `;

    cardEl.addEventListener("click", () => {
      if (lockBoard) return;
      if (flippedCards.includes(cardEl)) return;
      voltearCarta(cardEl);
    });

    memoryContainer.appendChild(cardEl);
  });
}

function voltearCarta(card) {
  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    lockBoard = true;
    setTimeout(() => {
      checarPareja();
    }, 1000);
  }
}

function checarPareja() {
  const [card1, card2] = flippedCards;
  if (
    card1.dataset.id === card2.dataset.id &&
    card1.dataset.type !== card2.dataset.type
  ) {
    // Acertaron pareja
    soundCorrect.play();
    matchedPairs++;
    if (matchedPairs === cardsData.length) {
      setTimeout(() => alert("¡Felicidades! Has encontrado todas las parejas 💖"), 500);
    }
    flippedCards = [];
    lockBoard = false;
  } else {
    // No acertaron
    soundWrong.play();
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
      lockBoard = false;
    }, 1200);
  }
}

function reiniciarJuego() {
  matchedPairs = 0;
  flippedCards = [];
  lockBoard = false;
  crearTablero();
}

restartBtn.addEventListener("click", reiniciarJuego);

window.onload = crearTablero;
