function filtrar(event, categoria) {
  const productos = document.querySelectorAll('.producto');
  const botones = document.querySelectorAll('.categoria');

  botones.forEach(boton => boton.classList.remove('activo'));
  event.target.classList.add('activo');

  productos.forEach(producto => {
    const visible = categoria === 'todos' || producto.dataset.categoria === categoria;
    producto.style.display = visible ? 'flex' : 'none';
  });
}




let indice = 0;
let intervaloCarrusel;

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
      indice = i;
      moverCarrusel(0);
    };
    contenedor.appendChild(punto);
  });
}

function iniciarAutoplay() {
  intervaloCarrusel = setInterval(() => moverCarrusel(1), 4000);
}

// Pausa el autoplay al pasar el mouse sobre el carrusel
const carrusel = document.querySelector('.carrusel');
if (carrusel) {
  carrusel.addEventListener('mouseenter', () => clearInterval(intervaloCarrusel));
  carrusel.addEventListener('mouseleave', iniciarAutoplay);
}

iniciarPuntos();
iniciarAutoplay();

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



function abrirVideo(id) {
  const lightbox = document.getElementById('video-lightbox');
  const frame = document.getElementById('video-frame');
  frame.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
  lightbox.style.display = 'flex';
}

function cerrarVideo() {
  const lightbox = document.getElementById('video-lightbox');
  const frame = document.getElementById('video-frame');
  lightbox.style.display = 'none';
  frame.src = '';
}

// Cierra cualquier lightbox con la tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cerrarFoto();
    cerrarVideo();
  }
});

// ─── SCROLL REVEAL ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

// ─── FORMULARIO DE CONTACTO (AJAX) ───
const formulario = document.getElementById('formulario-contacto');
if (formulario) {
  formulario.addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = formulario.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    const datos = new FormData(formulario);

    try {
      const respuesta = await fetch('https://formspree.io/f/xbdwpwnp', {
        method: 'POST',
        body: datos,
        headers: { Accept: 'application/json' }
      });

      if (respuesta.ok) {
        formulario.reset();
        formulario.style.display = 'none';
        const exito = document.getElementById('mensaje-exito');
        if (exito) exito.style.display = 'block';

        // Vuelve a mostrar el formulario después de 5 segundos
        setTimeout(() => {
          formulario.style.display = 'flex';
          if (exito) exito.style.display = 'none';
          btn.disabled = false;
          btn.textContent = 'Enviar mensaje';
        }, 5000);
      } else {
        alert('Hubo un error al enviar. Por favor intenta de nuevo.');
        btn.disabled = false;
        btn.textContent = 'Enviar mensaje';
      }
    } catch {
      alert('Error de conexión. Verifica tu internet e intenta de nuevo.');
      btn.disabled = false;
      btn.textContent = 'Enviar mensaje';
    }
  });
}

// ─── PWA: REGISTRO DEL SERVICE WORKER ───
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}