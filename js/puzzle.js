const rows = 3;
const cols = 3;
const puzzle = document.getElementById('puzzle');
let pieces = [];

// Crear piezas y agregarlas a la cuadrícula mezcladas
function crearPuzzle() {
  pieces = [];
  puzzle.innerHTML = '';
  let positions = [];

  for (let i = 0; i < rows * cols; i++) {
    positions.push(i);
  }

  // Mezclar posiciones
  positions = positions.sort(() => Math.random() - 0.5);

  for (let i = 0; i < rows * cols; i++) {
    const piece = document.createElement('div');
    piece.classList.add('piece');

    const originalRow = Math.floor(i / cols);
    const originalCol = i % cols;

    const pos = positions[i];
    const posRow = Math.floor(pos / cols);
    const posCol = pos % cols;

    piece.style.backgroundPosition = `-${originalCol * 120}px -${originalRow * 120}px`;

    piece.style.gridRowStart = posRow + 1;
    piece.style.gridColumnStart = posCol + 1;

    piece.setAttribute('draggable', true);
    piece.dataset.pos = pos;
    piece.dataset.correctPos = i;

    piece.addEventListener('dragstart', dragStart);
    piece.addEventListener('dragover', dragOver);
    piece.addEventListener('drop', drop);
    piece.addEventListener('dragend', dragEnd);

    puzzle.appendChild(piece);
    pieces.push(piece);
  }
}

let draggedPiece = null;

function dragStart(e) {
  draggedPiece = e.target;
  e.target.classList.add('dragging');
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  if (!draggedPiece || draggedPiece === e.target) return;

  // Intercambiar posiciones
  const draggedPos = draggedPiece.dataset.pos;
  const targetPos = e.target.dataset.pos;

  draggedPiece.style.gridRowStart = Math.floor(targetPos / cols) + 1;
  draggedPiece.style.gridColumnStart = (targetPos % cols) + 1;
  draggedPiece.dataset.pos = targetPos;

  e.target.style.gridRowStart = Math.floor(draggedPos / cols) + 1;
  e.target.style.gridColumnStart = (draggedPos % cols) + 1;
  e.target.dataset.pos = draggedPos;

  checkSolved();
}

function dragEnd(e) {
  e.target.classList.remove('dragging');
}

function checkSolved() {
  const solved = pieces.every(piece => piece.dataset.pos == piece.dataset.correctPos);
  if (solved) {
    setTimeout(() => alert("¡Felicidades! Armaste el rompecabezas 💖"), 300);
  }
}

document.getElementById('resetBtn').addEventListener('click', crearPuzzle);

window.onload = crearPuzzle;
