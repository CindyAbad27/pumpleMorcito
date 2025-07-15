const palabras = [
  "CORAZON",
  "AMOR",
  "CUMPLEAÑOS",
  "FELICIDAD",
  "BESOS",
  "ABRAZOS",
  "CARIÑO",
  "DETALLES",
  "CONEXION",
  "RISAS"
];

const gridSize = 12;
const gridElement = document.getElementById("grid");
const palabrasLista = document.getElementById("palabras");

let grid = [];
let seleccion = [];
let seleccionando = false;

function crearGridVacia() {
  grid = [];
  for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = "";
    }
  }
}

function colocarPalabraHorizontal(palabra, fila, col) {
  for (let i = 0; i < palabra.length; i++) {
    grid[fila][col + i] = palabra[i];
  }
}

function colocarPalabraVertical(palabra, fila, col) {
  for (let i = 0; i < palabra.length; i++) {
    grid[fila + i][col] = palabra[i];
  }
}

function puedeColocarHorizontal(palabra, fila, col) {
  if (col + palabra.length > gridSize) return false;
  for (let i = 0; i < palabra.length; i++) {
    if (grid[fila][col + i] !== "" && grid[fila][col + i] !== palabra[i]) return false;
  }
  return true;
}

function puedeColocarVertical(palabra, fila, col) {
  if (fila + palabra.length > gridSize) return false;
  for (let i = 0; i < palabra.length; i++) {
    if (grid[fila + i][col] !== "" && grid[fila + i][col] !== palabra[i]) return false;
  }
  return true;
}

function colocarPalabras() {
  for (const palabra of palabras) {
    let colocada = false;
    let intentos = 0;
    while (!colocada && intentos < 100) {
      const horizontal = Math.random() < 0.5;
      const fila = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      if (horizontal) {
        if (puedeColocarHorizontal(palabra, fila, col)) {
          colocarPalabraHorizontal(palabra, fila, col);
          colocada = true;
        }
      } else {
        if (puedeColocarVertical(palabra, fila, col)) {
          colocarPalabraVertical(palabra, fila, col);
          colocada = true;
        }
      }
      intentos++;
    }
  }
}

function llenarEspaciosVacios() {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === "") {
        grid[i][j] = letras.charAt(Math.floor(Math.random() * letras.length));
      }
    }
  }
}

function crearCuadricula() {
  gridElement.innerHTML = "";
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement("div");
      cell.classList.add("celda");
      cell.dataset.fila = i;
      cell.dataset.col = j;
      cell.textContent = grid[i][j];
      gridElement.appendChild(cell);
    }
  }
}

function empezarSeleccion(e) {
  if (e.target.classList.contains("celda") && !e.target.classList.contains("resaltada")) {
    seleccion = [e.target];
    seleccionando = true;
    actualizarSeleccion();
  }
}

function continuarSeleccion(e) {
  if (seleccionando && e.target.classList.contains("celda") && !e.target.classList.contains("resaltada")) {
    const last = seleccion[seleccion.length - 1];
    const filaLast = parseInt(last.dataset.fila);
    const colLast = parseInt(last.dataset.col);
    const filaCurr = parseInt(e.target.dataset.fila);
    const colCurr = parseInt(e.target.dataset.col);

    const dx = colCurr - colLast;
    const dy = filaCurr - filaLast;

    if (
      (Math.abs(dx) <= 1 && dy === 0) || // horizontal
      (dx === 0 && Math.abs(dy) <= 1) || // vertical
      (Math.abs(dx) === 1 && Math.abs(dy) === 1) // diagonal
    ) {
      if (!seleccion.includes(e.target)) {
        seleccion.push(e.target);
        actualizarSeleccion();
      }
    }
  }
}

function terminarSeleccion() {
  if (seleccion.length > 0) {
    checarPalabraSeleccionada();
  }
  seleccionando = false;
  seleccion = [];
  limpiarSeleccion();
}

function actualizarSeleccion() {
  limpiarSeleccion();
  for (const celda of seleccion) {
    celda.classList.add("seleccionada");
  }
}

function limpiarSeleccion() {
  document.querySelectorAll(".celda.seleccionada").forEach(c => c.classList.remove("seleccionada"));
}

function checarPalabraSeleccionada() {
  const palabraSeleccionada = seleccion.map(c => c.textContent).join("");
  const palabraInvertida = palabraSeleccionada.split("").reverse().join("");
  const index = palabras.findIndex(p => p === palabraSeleccionada || p === palabraInvertida);
  if (index !== -1) {
    marcarEncontrada(palabras[index]);
    mantenerResaltado();
  }
}

function marcarEncontrada(palabra) {
  const items = palabrasLista.querySelectorAll("li");
  items.forEach(li => {
    if (li.textContent.toUpperCase() === palabra) {
      li.classList.add("encontrada");
    }
  });
}

function mantenerResaltado() {
  for (const celda of seleccion) {
    celda.classList.add("resaltada");
    celda.classList.remove("seleccionada");
    celda.style.cursor = "default";
  }
}

function init() {
  crearGridVacia();
  colocarPalabras();
  llenarEspaciosVacios();
  crearCuadricula();

  palabrasLista.innerHTML = "";
  for (const palabra of palabras) {
    const li = document.createElement("li");
    li.textContent = palabra;
    palabrasLista.appendChild(li);
  }

  gridElement.addEventListener("mousedown", empezarSeleccion);
  gridElement.addEventListener("mouseover", continuarSeleccion);
  window.addEventListener("mouseup", terminarSeleccion);
}

window.onload = init;
