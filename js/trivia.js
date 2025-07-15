const preguntas = [
  {
    pregunta: "¿Dónde fue nuestro primer beso?",
    opciones: ["En el parque", "En el cine", "En el metro", "En una cafetería"],
    respuestaCorrecta: 2
  },
  {
    pregunta: '¿Quién fue el primero en decir "te amo"?',
    opciones: ["Cindy", "Diego", "Ninguno, fue al mismo tiempo", "Todavía no lo hemos dicho"],
    respuestaCorrecta: 1
  },
  {
    pregunta: "¿Cuál fue el primer regalo que te di?",
    opciones: ["Un libro", "Una camiseta", "Un reloj", "Una flor"],
    respuestaCorrecta: 2
  },
  {
    pregunta: "¿Qué es lo primero que noto cuando te veo?",
    opciones: ["Tu sonrisa", "Tu ropa", "Tu voz", "Tu mirada"],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Qué me hace sentir más feliz cuando estamos juntos?",
    opciones: ["Tus abrazos", "Tus regalos", "Tus palabras", "Tu risa"],
    respuestaCorrecta: 0
  }
];

const contenedorPregunta = document.getElementById('pregunta-container');
const btnSiguiente = document.getElementById('btn-siguiente');
const divResultado = document.getElementById('resultado');
const btnRegresar = document.getElementById('btn-regresar');

let indicePregunta = 0;
let puntaje = 0;
let seleccionada = null;

function mostrarPregunta() {
  seleccionada = null;
  divResultado.style.display = 'none';
  btnSiguiente.disabled = true;

  const pregunta = preguntas[indicePregunta];
  let html = `<h3>${pregunta.pregunta}</h3>`;
  pregunta.opciones.forEach((opcion, i) => {
    html += `<div class="opcion" data-index="${i}">${opcion}</div>`;
  });

  contenedorPregunta.innerHTML = html;
  contenedorPregunta.style.display = 'block';

  btnSiguiente.style.display = 'inline-block';
  btnRegresar.classList.add('d-none');

  const opciones = document.querySelectorAll('.opcion');
  opciones.forEach(opcion => {
    opcion.addEventListener('click', () => {
      opciones.forEach(o => o.classList.remove('selected'));
      opcion.classList.add('selected');
      seleccionada = parseInt(opcion.getAttribute('data-index'));
      btnSiguiente.disabled = false;
    });
  });
}

btnSiguiente.addEventListener('click', () => {
  if(seleccionada === null) return;

  if(seleccionada === preguntas[indicePregunta].respuestaCorrecta) {
    puntaje++;
  }

  indicePregunta++;

  if(indicePregunta < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarResultado();
  }
});

function mostrarResultado() {
  contenedorPregunta.style.display = 'none';
  btnSiguiente.style.display = 'none';
  divResultado.style.display = 'block';
  divResultado.textContent = `¡Terminaste! Respondiste correctamente ${puntaje} de ${preguntas.length} preguntas.`;

  btnRegresar.classList.remove('d-none');
}

document.addEventListener('DOMContentLoaded', mostrarPregunta);
