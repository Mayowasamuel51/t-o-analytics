"use strict"
const menuBar = document.querySelector(".hamburger");
const navContainer = document.querySelector("nav>ul");
const Nav = document.querySelector("nav");
const links = document.querySelectorAll("nav>ul>li>a")
const Header = document.getElementsByTagName("header");
const currloc = window.location.pathname;


// NAVBAR
menuBar.addEventListener("click", ()=> {
    if (!Nav.classList.contains("show")) {
        menuBar.innerHTML = `<i class="fa-solid fa-xmark text-3xl"></i>`
        Nav.classList.add("show")
    }else {
        menuBar.innerHTML = `<i class="fa-solid fa-bars text-2xl"></i>`
        Nav.classList.remove("show")
    }
})
// NAVBAR ONSCROLL
window.addEventListener("scroll", ()=> {
    const scrolldis = scrollY;
    if (scrolldis > 20) {
        Nav.classList.add("fixed")
    }
    else {
        Nav.classList.remove("fixed")
    }
})


// SLIDE
document.addEventListener("DOMContentLoaded", ()=> {
    const splide = new Splide(".splide", {
        type : 'loop',
        drag : 'free',
        perPage: 1,
        gap: '20px',
        perMove: 1,
        autoplay: true,
        interval: 3000,
        speed: 2000,
        arrows: false,
    })
    splide.mount()
})