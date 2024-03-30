function show_hide_mobileNabar() {
    let mobileHeader = document.getElementById("mobile-header");
    let listBtn = document.getElementById("list-btn");

    if (mobileHeader.classList.contains("active")) {
        mobileHeader.classList.remove("active");
        listBtn.classList.replace("fa-xmark", "fa-bars");
    } else {
        mobileHeader.classList.add("active");
        listBtn.classList.replace("fa-bars", "fa-xmark");
    }
}

function hide_mobileNabar() {
    let mobileHeader = document.getElementById("mobile-header");
    let listBtn = document.getElementById("list-btn");
    mobileHeader.classList.remove("active");
    listBtn.classList.replace("fa-xmark", "fa-bars");
}


function show_hide_static_mobileNabar() {
    let mobileHeader = document.getElementById("mobile-static-header");
    let listBtn = document.getElementById("list-static-btn");

    if (mobileHeader.classList.contains("active")) {
        mobileHeader.classList.remove("active");
        listBtn.classList.replace("fa-xmark", "fa-bars");
    } else {
        mobileHeader.classList.add("active");
        listBtn.classList.replace("fa-bars", "fa-xmark");
    }
}

function hide_static_mobileNabar() {
    let mobileHeader = document.getElementById("mobile-static-header");
    let listBtn = document.getElementById("list-static-btn");
    mobileHeader.classList.remove("active");
    listBtn.classList.replace("fa-xmark", "fa-bars");
}


window.onscroll = ()=>{
    let static_mobile_header = document.getElementById("static_header");
    if (scrollY > 3) {
        static_mobile_header.classList.add("active");
    } else {
        static_mobile_header.classList.remove("active")
    }

    let larg_static_header = document.getElementById("larg-static-header");
    if (scrollY > 100) {
        larg_static_header.classList.add("active");
    } else {
        larg_static_header.classList.remove("active");
    }
}