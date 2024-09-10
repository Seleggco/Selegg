document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.receta-carousel');
    const recetaGrid = document.querySelector('.receta-grid');
    const recetas = document.querySelectorAll('.receta-card');
    let currentIndex = 0;
    const visibleRecetas = 3;

    // Función para actualizar la posición del carrusel
    function updateCarousel() {
        const recetaWidth = recetas[0].offsetWidth;
        const newPosition = -currentIndex * recetaWidth;
        recetaGrid.style.transform = `translateX(${newPosition}px)`;
    }

    // Función para mover a la siguiente receta
    function nextReceta() {
        if (currentIndex < recetas.length - visibleRecetas) {
            currentIndex++;
            updateCarousel();
        }
    }

    // Función para mover a la receta anterior
    function prevReceta() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    // Manejo de eventos táctiles
    let startX, moveX;
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchmove', (e) => {
        e.preventDefault();
        moveX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', () => {
        if (startX - moveX > 50) {
            nextReceta();
        } else if (moveX - startX > 50) {
            prevReceta();
        }
    });

    // Manejo de eventos de mouse
    let isDown = false;
    let startMouseX;
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        startMouseX = e.pageX - carousel.offsetLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = x - startMouseX;
        if (walk < -50) {
            nextReceta();
            isDown = false;
        } else if (walk > 50) {
            prevReceta();
            isDown = false;
        }
    });

    // Ajustar el ancho del contenedor para mostrar solo 3 recetas
    function adjustCarouselWidth() {
        const recetaWidth = recetas[0].offsetWidth;
        carousel.style.width = `${recetaWidth * visibleRecetas}px`;
    }

    // Ejecutar ajuste inicial y en cada redimensionamiento
    adjustCarouselWidth();
    window.addEventListener('resize', adjustCarouselWidth);

    // Navegación suave para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});