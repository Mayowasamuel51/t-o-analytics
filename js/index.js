const menuBar = document.querySelector(".hamburger")
const Nav = document.querySelector("nav")

menuBar.addEventListener("click", ()=> {
    if (!Nav.classList.contains("show")) {
        menuBar.innerHTML = `<i class="fa-solid fa-xmark text-2xl"></i>`
        Nav.classList.add("show")
    }else {
        menuBar.innerHTML = `<i class="fa-solid fa-bars text-2xl"></i>`
        Nav.classList.remove("show")
    }
})