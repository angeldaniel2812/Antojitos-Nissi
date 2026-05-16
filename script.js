function filtrar(categoria) {

  const productos = document.querySelectorAll('.producto');
  const botones = document.querySelectorAll('.categoria');

  botones.forEach(boton => {
    boton.classList.remove('activo');
  });

  event.target.classList.add('activo');

  productos.forEach(producto => {
    if (categoria === 'todos') {
      producto.style.display = 'flex';
    } else if (producto.dataset.categoria === categoria) {
      producto.style.display = 'flex';
    } else {
      producto.style.display = 'none';
    }
  });
}




let indice = 0;

function moverCarrusel(direccion) {
  const track = document.querySelector('.carrusel-track');
  const imgs = track.querySelectorAll('img');
  const puntos = document.querySelectorAll('.punto');

  indice += direccion;

  if (indice < 0) indice = imgs.length - 1;
  if (indice >= imgs.length) indice = 0;

  track.style.transform = `translateX(-${indice * 100}%)`;

  puntos.forEach(p => p.classList.remove('activo'));
  puntos[indice].classList.add('activo');
}

function iniciarPuntos() {
  const track = document.querySelector('.carrusel-track');
  const imgs = track.querySelectorAll('img');
  const contenedor = document.getElementById('puntos');

  imgs.forEach((_, i) => {
    const punto = document.createElement('div');
    punto.classList.add('punto');
    if (i === 0) punto.classList.add('activo');
    punto.onclick = () => {
      indice = i - 1;
      moverCarrusel(1);
    };
    contenedor.appendChild(punto);
  });
}

iniciarPuntos();

// Cambia foto automaticamente cada 4 segundos
setInterval(() => moverCarrusel(1), 4000);

function abrirFoto(img) {
  const lightbox = document.getElementById('lightbox');
  const fotoGrande = document.getElementById('foto-grande');
  fotoGrande.src = img.src;
  lightbox.style.display = 'flex';
}

function cerrarFoto() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
}