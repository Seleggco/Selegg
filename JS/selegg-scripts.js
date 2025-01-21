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
    function updateCarousel(smooth = true) {
        const recetaWidth = recetas[0].offsetWidth;
        if (isMobile()) {
            carousel.scrollTo({
                left: currentIndex * recetaWidth,
                behavior: smooth ? 'smooth' : 'auto'
            });
        } else {
            const newPosition = -currentIndex * recetaWidth;
            recetaGrid.style.transition = smooth ? 'transform 0.3s ease' : 'none';
            recetaGrid.style.transform = `translateX(${newPosition}px)`;
        }
        updateButtonStates();
    }

    // Function to move to the next recipe
    function nextReceta() {
        if (currentIndex < recetas.length - (isMobile() ? 1 : visibleRecetas)) {
            currentIndex++;
            updateCarousel();
        }
    }

    // Function to move to the previous recipe
    function prevReceta() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    // Function to update button states
    function updateButtonStates() {
        if (prevBtn && nextBtn) {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === recetas.length - (isMobile() ? 1 : visibleRecetas);
        }
    }

    // Start auto-scroll (only for non-mobile devices)
    function startAutoScroll() {
        if (!isMobile() && !autoScrollInterval) {
            autoScrollInterval = setInterval(() => {
                if (currentIndex < recetas.length - visibleRecetas) {
                    nextReceta();
                } else {
                    stopAutoScroll(); // Stop auto-scroll when reaching the end
                }
            }, 3000); // Change every 3 seconds
        }
    }

    // Stop auto-scroll
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
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

    // // Touch slide functionality for mobile
    // let startX, isDragging = false, startScrollLeft;
    // const sensitivity = 0.1; // Adjust this value to change swipe sensitivity (in pixels)

    // if (isMobile()) {
    //     carousel.addEventListener('touchstart', (e) => {
    //         startX = e.touches[0].clientX;
    //         startScrollLeft = carousel.scrollLeft;
    //         isDragging = true;
    //     });

    //     carousel.addEventListener('touchmove', (e) => {
    //         if (!isDragging) return;
    //         e.preventDefault(); // Prevent page scrolling
    //         const currentX = e.touches[0].clientX;
    //         const diff = startX - currentX;
    //         carousel.scrollLeft = startScrollLeft + diff;
    //     });

    //     carousel.addEventListener('touchend', () => {
    //         isDragging = false;
    //         const totalScroll = carousel.scrollLeft - startScrollLeft;
            
    //         if (Math.abs(totalScroll) > sensitivity) {
    //             if (totalScroll > 0) {
    //                 nextReceta();
    //             } else {
    //                 prevReceta();
    //             }
    //         } else {
    //             // If the scroll wasn't significant, snap back to the current recipe
    //             updateCarousel();
    //         }
    //     });
    // }

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
    updateButtonStates();
    window.addEventListener('resize', () => {
        adjustCarouselWidth();
        updateCarousel(false); // Update without smooth transition on resize
        stopAutoScroll(); // Always stop auto-scroll on resize
        if (!isMobile()) {
            startAutoScroll(); // Only start auto-scroll if not mobile
        }
    });

    // Start auto-scroll when loading the page (only for non-mobile devices)
    if (!isMobile()) {
        startAutoScroll();
    }
});