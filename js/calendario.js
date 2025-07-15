const fechasEspeciales = {
  "2024-03-07": "Nuestro primer beso 💋",
  "2024-03-02": "Primera vez que te quedaste en mi casa 😴",
  "2025-02-28": "Nuestro primer concierto 🎵",
  "2025-02-27": "Mi cumpleaños 🎉",
  "2025-07-15": "Tu cumpleaños 🎂",
  "2025-06-28": "Nuestro aniversario 🥳"
};

const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

// Obtener todos los meses y años únicos de las fechas especiales
function obtenerMesesUnicos() {
  const mesesUnicos = new Set();
  for (const fecha in fechasEspeciales) {
    const [anio, mes] = fecha.split("-");
    mesesUnicos.add(`${anio}-${mes}`);
  }
  return Array.from(mesesUnicos).sort();
}

// Crear un calendario para año y mes (0-based mes)
function crearCalendarioHTML(año, mes) {
  let primerDia = new Date(año, mes, 1).getDay();
  // Ajustar para que lunes sea 0 (Domingo=6)
  primerDia = (primerDia === 0) ? 6 : primerDia -1;

  const diasMes = new Date(año, mes + 1, 0).getDate();

  let tabla = `<table class="calendario"><thead><tr><th colspan="7">${meses[mes]} ${año}</th></tr><tr>`;

  for (const dia of diasSemana) {
    tabla += `<th>${dia}</th>`;
  }

  tabla += "</tr></thead><tbody><tr>";

  for (let i = 0; i < primerDia; i++) {
    tabla += "<td></td>";
  }

  for (let dia = 1; dia <= diasMes; dia++) {
    const fechaStr = `${año}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
    const mensaje = fechasEspeciales[fechaStr];
    const destacado = mensaje ? "destacado" : "";

    tabla += `<td class="${destacado}">${dia}`;
    if (mensaje) {
      tabla += `<div class="tooltip-text">${mensaje}</div>`;
    }
    tabla += `</td>`;

    if ((dia + primerDia) % 7 === 0 && dia !== diasMes) {
      tabla += "</tr><tr>";
    }
  }

  const ultFilaCeldas = (diasMes + primerDia) % 7;
  if (ultFilaCeldas !== 0) {
    for (let i = ultFilaCeldas; i < 7; i++) {
      tabla += "<td></td>";
    }
  }

  tabla += "</tr></tbody></table>";
  return tabla;
}

// Poner todos los calendarios en la página
function mostrarTodosCalendarios() {
  const contenedor = document.getElementById("calendarios");
  const mesesUnicos = obtenerMesesUnicos();

  for (const mesAnio of mesesUnicos) {
    const [anio, mesStr] = mesAnio.split("-");
    const año = parseInt(anio);
    const mes = parseInt(mesStr) - 1;

    const calendarioHTML = crearCalendarioHTML(año, mes);

    const div = document.createElement("div");
    div.innerHTML = calendarioHTML;

    contenedor.appendChild(div);
  }
}

document.addEventListener("DOMContentLoaded", mostrarTodosCalendarios);
