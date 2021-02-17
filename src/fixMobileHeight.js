export function fixHeight () {
    const section$$ = document.querySelector('.section');
    const height = window.innerHeight;
    if (section$$) {
        section$$.style.minHeight = `${ height - 120 }px`;
        section$$.style.transition = `min-height 0.5s`;
    }
    window.addEventListener('resize', fixHeight)
}

