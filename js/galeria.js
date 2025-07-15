// Selecciona todas las imágenes de la galería
const mensajeCards = document.querySelectorAll('.mensaje-card img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.caption');
const closeBtn = document.querySelector('.close');

// Asigna el evento de clic a cada imagen
mensajeCards.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.alt;
    lightbox.classList.add('show');
  });
});

// Cierra el lightbox al hacer clic en la X
closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('show');
});

// Cierra el lightbox al hacer clic fuera de la imagen
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('show');
  }
});

// Opcional: navegación con teclado (Escape para cerrar)
document.addEventListener('keydown', (e) => {
  if (lightbox.classList.contains('show') && e.key === 'Escape') {
    lightbox.classList.remove('show');
  }
});
