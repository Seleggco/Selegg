document.querySelectorAll('.receta-card').forEach(card => {
    const button = card.querySelector('.btn-receta');
    const title = card.querySelector('h3');

    button.addEventListener('mouseenter', () => {
        title.style.color = 'var(--color-azul-vainilla)';
    });

    button.addEventListener('mouseleave', () => {
        title.style.color = 'var(--color-verde-natural)';
    });
});
