
document.addEventListener("DOMContentLoaded", () => {

    initializeWebsite();
    advertisementPage();

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

/*ADVERTISEMENT PAGE*/

document.addEventListener("DOMContentLoaded",()=>{

});

function advertisementPage(){

    liveSearch();

    categoryFilter();

    sortAdvertisements();

    favorites();

    shoppingCart();

    detailsModal();

}

/*LIVE SEARCH*/

function liveSearch(){

    const input=document.getElementById("searchInput");

    if(!input) return;

    input.addEventListener("keyup",()=>{

        const value=input.value.toLowerCase();

        document.querySelectorAll(".card").forEach(card=>{

            const title=card.dataset.name.toLowerCase();

            card.style.display=

            title.includes(value)

            ?"block"

            :"none";

        });

    });

}

/*CATEGORY FILTER*/

function categoryFilter(){

    const filter=document.getElementById("categoryFilter");

    if(!filter) return;

    filter.addEventListener("change",()=>{

        document.querySelectorAll(".card").forEach(card=>{

            const category=card.dataset.category;

            if(filter.value==="all"||category===filter.value){

                card.style.display="block";

            }

            else{

                card.style.display="none";

            }

        });

    });

}

/*CONTACT FORM*/

contactForm();

function contactForm(){

    const form=document.getElementById("contact-form");

    if(!form) return;

    form.addEventListener("submit",saveReport);

}

function saveReport(e){

    e.preventDefault();

    const report={

        id:Date.now(),

        name:document.getElementById("name").value,

        email:document.getElementById("email").value,

        subject:document.getElementById("subject").value,

        message:document.getElementById("message").value,

        date:new Date().toLocaleString()

    };

    let reports=

    JSON.parse(localStorage.getItem("reports"))||[];

    reports.push(report);

    localStorage.setItem(

        "reports",

        JSON.stringify(reports)

    );

    document.getElementById("form-status").innerHTML=

    "✅ Report submitted successfully.";

    form.reset();

}

/*ADMIN DASHBOARD*/

loadReports();

function loadReports(){

    const table=document.getElementById("reportTable");

    if(!table) return;

    const reports=

    JSON.parse(localStorage.getItem("reports"))||[];

    table.innerHTML="";

    reports.forEach(report=>{

        table.innerHTML+=`

        <tr>

        <td>${report.name}</td>

        <td>${report.email}</td>

        <td>${report.subject}</td>

        <td>${report.message}</td>

        <td>${report.date}</td>

        <td>

        <button onclick="deleteReport(${report.id})">

        Delete

        </button>

        </td>

        </tr>

        `;

    });

    document.getElementById("totalReports").textContent=

    reports.length;

    updateDashboard(reports);

}

function updateDashboard(reports){

    let general=0;

    let listing=0;

    let technical=0;

    reports.forEach(report=>{

        if(report.subject==="General Enquiry")

            general++;

        if(report.subject==="Report a Listing")

            listing++;

        if(report.subject==="Technical Issue")

            technical++;

    });

    document.getElementById("generalReports").textContent=

    general;

    document.getElementById("listingReports").textContent=

    listing;

    document.getElementById("technicalReports").textContent=

    technical;

}

function deleteReport(id){

    let reports=

    JSON.parse(localStorage.getItem("reports"))||[];

    reports=reports.filter(

        report=>report.id!==id

    );

    localStorage.setItem(

        "reports",

        JSON.stringify(reports)

    );

    loadReports();

}

/*RESET CONTACT FORM*/

const resetButton = document.getElementById("resetForm");

if(resetButton){

    resetButton.addEventListener("click", function(){

        const confirmed = confirm(
            "Are you sure you want to clear the form?"
        );

        if(!confirmed){

            event.preventDefault();
            return;

        }

        document.getElementById("form-status").innerHTML = "";

    });

}
