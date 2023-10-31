const slideContainer = document.querySelector('.slide');
let isDown = false;
let startX;
let scrollLeft;

slideContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    slideContainer.style.cursor = 'grabbing';
    startX = e.pageX - slideContainer.offsetLeft;
    scrollLeft = slideContainer.scrollLeft;
});

slideContainer.addEventListener('mouseleave', () => {
    isDown = false;
    slideContainer.style.cursor = 'grab';
});

slideContainer.addEventListener('mouseup', () => {
    isDown = false;
    slideContainer.style.cursor = 'grab';
});

slideContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slideContainer.offsetLeft;
    const walk = (x - startX) * 2;
    slideContainer.scrollLeft = scrollLeft - walk;
});

slideContainer.addEventListener('touchstart', (e) => {
    isDown = true;
    slideContainer.style.cursor = 'grabbing';
    startX = e.touches[0].clientX - slideContainer.offsetLeft;
    scrollLeft = slideContainer.scrollLeft;
});

slideContainer.addEventListener('touchend', () => {
    isDown = false;
    slideContainer.style.cursor = 'grab';
});

slideContainer.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].clientX - slideContainer.offsetLeft;
    const walk = (x - startX) * 2;
    slideContainer.scrollLeft = scrollLeft - walk;
});
