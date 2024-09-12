document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.receta-carousel');
    const recetaGrid = document.querySelector('.receta-grid');
    const recetas = document.querySelectorAll('.receta-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    const visibleRecetas = 3;
    let autoScrollInterval;

    // Function to update the carousel position
    function updateCarousel() {
        const recetaWidth = recetas[0].offsetWidth;
        const newPosition = -currentIndex * recetaWidth;
        recetaGrid.style.transform = `translateX(${newPosition}px)`;
    }

    // Function to move to the next recipe
    function nextReceta() {
        if (currentIndex < recetas.length - visibleRecetas) {
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
            currentIndex = recetas.length - visibleRecetas; // Go to the end if at the beginning
        }
        updateCarousel();
    }

    // Start auto-scroll
    function startAutoScroll() {
        autoScrollInterval = setInterval(nextReceta, 3000); // Change every 3 seconds
    }

    // Stop auto-scroll
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Mouse events to stop/resume auto-scroll
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);

    // Button click events
    nextBtn.addEventListener('click', () => {
        stopAutoScroll();
        nextReceta();
        startAutoScroll();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoScroll();
        prevReceta();
        startAutoScroll();
    });

    // Adjust the width of the container to show only 3 recipes
    function adjustCarouselWidth() {
        const recetaWidth = recetas[0].offsetWidth;
        carousel.style.width = `${recetaWidth * visibleRecetas}px`;
    }

    // Execute initial adjustment and on each resize
    adjustCarouselWidth();
    window.addEventListener('resize', adjustCarouselWidth);

    // Smooth navigation for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Start auto-scroll when loading the page
    startAutoScroll();
});