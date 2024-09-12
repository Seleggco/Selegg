document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.receta-carousel');
    const recetaGrid = document.querySelector('.receta-grid');
    const recetas = document.querySelectorAll('.receta-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    const visibleRecetas = 3;
    let autoScrollInterval;

    // Funcionalidad para el menú hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-menu-active');
    });

    // Función para comprobar si es un dispositivo móvil
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Function to update the carousel position
    function updateCarousel() {
        if (isMobile()) {
            const recetaWidth = recetas[0].offsetWidth;
            carousel.scrollTo({
                left: currentIndex * recetaWidth,
                behavior: 'smooth'
            });
        } else {
            const recetaWidth = recetas[0].offsetWidth;
            const newPosition = -currentIndex * recetaWidth;
            recetaGrid.style.transform = `translateX(${newPosition}px)`;
        }
    }

    // Function to move to the next recipe
    function nextReceta() {
        if (currentIndex < recetas.length - (isMobile() ? 1 : visibleRecetas)) {
            currentIndex++;
        } else {
            currentIndex = 0; // Return to the beginning if it reaches the end
        }
        updateCarousel();
    }

    // Function to move to the previous recipe
    function prevReceta() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = recetas.length - (isMobile() ? 1 : visibleRecetas); // Go to the end if at the beginning
        }
        updateCarousel();
    }

    // Start auto-scroll (only for non-mobile devices)
    function startAutoScroll() {
        if (!isMobile()) {
            autoScrollInterval = setInterval(nextReceta, 3000); // Change every 3 seconds
        }
    }

    // Stop auto-scroll
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Mouse events to stop/resume auto-scroll (only for non-mobile devices)
    if (!isMobile()) {
        carousel.addEventListener('mouseenter', stopAutoScroll);
        carousel.addEventListener('mouseleave', startAutoScroll);
    }

    // Button click events
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoScroll();
            nextReceta();
            if (!isMobile()) {
                startAutoScroll();
            }
        });

        prevBtn.addEventListener('click', () => {
            stopAutoScroll();
            prevReceta();
            if (!isMobile()) {
                startAutoScroll();
            }
        });
    }

    // Adjust the width of the container
    function adjustCarouselWidth() {
        if (isMobile()) {
            carousel.style.width = '100%';
        } else {
            const recetaWidth = recetas[0].offsetWidth;
            carousel.style.width = `${recetaWidth * visibleRecetas}px`;
        }
    }

    // Improved touch slide functionality for mobile
    let startX, isDragging = false;
    const sensitivity = 0.1; // Adjust this value to change swipe sensitivity

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        const recetaWidth = recetas[0].offsetWidth;

        if (Math.abs(diff) > recetaWidth * sensitivity) {
            if (diff > 0) {
                nextReceta();
            } else {
                prevReceta();
            }
            isDragging = false;
        }
    });

    carousel.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Smooth navigation for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Execute initial adjustment and on each resize
    adjustCarouselWidth();
    window.addEventListener('resize', () => {
        adjustCarouselWidth();
        updateCarousel();
        // Reiniciar auto-scroll solo si no es móvil
        if (!isMobile()) {
            stopAutoScroll();
            startAutoScroll();
        }
    });

    // Start auto-scroll when loading the page (only for non-mobile devices)
    startAutoScroll();
});