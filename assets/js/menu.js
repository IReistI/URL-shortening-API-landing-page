document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector("#menu");
    const heroImg = document.querySelector(".hero");
    const nav = document.querySelector("#nav-menu");
    let isHeroVisible = false;

    function toggleMenuVisibility() {
        if (window.innerWidth >= 768) {
            heroImg.style.display = "block";
            nav.style.display = "none";
        } else {
            if (isHeroVisible) {
                heroImg.style.display = "none";
                nav.style.display = "flex";
            } else {
                heroImg.style.display = "block";
                nav.style.display = "none";
            }
        }
    }

    window.addEventListener("resize", toggleMenuVisibility);

    menu.addEventListener("click", () => {
        isHeroVisible = !isHeroVisible;
        toggleMenuVisibility();
    });
});

