
document.addEventListener("DOMContentLoaded", () => {

    initializeWebsite();

});

/*INITIALIZE WEBSITE*/

function initializeWebsite(){

    mobileNavigation();

    smoothScrolling();

    createBackToTopButton();

    darkMode();

    updateFooterYear();

    fadeInAnimation();

}

/*MOBILE NAVIGATION*/

function mobileNavigation(){

    const toggle = document.querySelector(".nav-toggle");

    const nav = document.querySelector("nav ul");

    if(!toggle || !nav) return;

    toggle.addEventListener("click",()=>{

        nav.classList.toggle("show");

    });

}

/*SMOOTH SCROLL*/

function smoothScrolling(){

    document.querySelectorAll('a[href^="#"]').forEach(link=>{

        link.addEventListener("click",function(e){

            const target=document.querySelector(this.getAttribute("href"));

            if(target){

                e.preventDefault();

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

}

/*BACK TO TOP BUTTON*/

function createBackToTopButton(){

    const button=document.createElement("button");

    button.innerHTML="↑";

    button.className="back-to-top";

    document.body.appendChild(button);

    window.addEventListener("scroll",()=>{

        if(window.scrollY>300){

            button.classList.add("show");

        }

        else{

            button.classList.remove("show");

        }

    });

    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*DARK MODE*/

function darkMode(){

    const darkButton=document.createElement("button");

    darkButton.innerHTML="🌙";

    darkButton.className="dark-mode-btn";

    document.body.appendChild(darkButton);

    if(localStorage.getItem("theme")==="dark"){

        document.body.classList.add("dark");

        darkButton.innerHTML="☀️";

    }

    darkButton.addEventListener("click",()=>{

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){

            localStorage.setItem("theme","dark");

            darkButton.innerHTML="☀️";

        }

        else{

            localStorage.setItem("theme","light");

            darkButton.innerHTML="🌙";

        }

    });

}

/*FOOTER YEAR*/

function updateFooterYear(){

    const footer=document.querySelector("footer p");

    if(!footer) return;

    footer.innerHTML=footer.innerHTML.replace("2026",new Date().getFullYear());

}

/*FADE IN ON SCROLL*/

function fadeInAnimation(){

    const items=document.querySelectorAll(

        ".card,.feature,.team-card,.value-card,.stat,.dashboard-card"

    );

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("appear");

            }

        });

    },{

        threshold:.2

    });

    items.forEach(item=>{

        observer.observe(item);

    });

}