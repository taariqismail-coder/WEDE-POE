/* LOADER */

window.addEventListener("load", function(){

    setTimeout(()=>{
        document.getElementById("loader").style.display="none";
    },2000);

});


/* TYPEWRITER */

const text = "RIQOS PRODUCTIONS";

let i = 0;

function typing(){

    if(i < text.length){

        document.getElementById("typewriter").innerHTML += text.charAt(i);

        i++;

        setTimeout(typing,100);
    }

}

if(document.getElementById("typewriter")){
    typing();
}


/* COUNTERS */

const counters = document.querySelectorAll(".counter");

function runCounter(){

    counters.forEach(counter=>{

        const target = +counter.dataset.target;

        let count = 0;

        const update = ()=>{

            count += Math.ceil(target/100);

            if(count < target){

                counter.innerText = count;

                requestAnimationFrame(update);

            }

            else{
                counter.innerText = target;
            }

        }

        update();

    });

}

runCounter();


/* REVEAL */

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", ()=>{

    reveals.forEach(item=>{

        const top = item.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){

            item.classList.add("active");

        }

    });

});


/* BACK TO TOP */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", ()=>{

    if(window.scrollY > 400){

        topBtn.style.display = "block";

    }

    else{

        topBtn.style.display = "none";

    }

});

topBtn.onclick = ()=>{

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

}


/* DARK MODE */

const theme = document.getElementById("themeToggle");

theme.onclick = ()=>{

    document.body.classList.toggle("light");

};


/* 3D CARD EFFECT */

document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const x = e.offsetX;
const y = e.offsetY;

const rotateX = -(y/20);
const rotateY = x/20;

card.style.transform =
`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform = "rotateX(0) rotateY(0)";

});

});
/* SERVICE SEARCH */

const search = document.getElementById("serviceSearch");

if(search){

search.addEventListener("keyup", ()=>{

let filter = search.value.toLowerCase();

let items = document.querySelectorAll(".service-item");

items.forEach(item=>{

if(item.innerText.toLowerCase().includes(filter)){

item.style.display = "block";

}

else{

item.style.display = "none";

}

});

});

}


/* ARTIST PLAY BUTTON */

document.querySelectorAll(".artist-play-btn").forEach(btn=>{

btn.addEventListener("click", (e)=>{

    e.stopPropagation();

    const card = btn.closest(".artist-card");
    const name = card.querySelector("h3").innerText;

    btn.innerText = "⏸";

    setTimeout(()=>{
        btn.innerText = "▶";
    }, 1500);

});

});


/* SERVICE RESPONSE PANEL */

const serviceItems = document.querySelectorAll(".service-item");
const serviceResponse = document.getElementById("serviceResponse");

if(serviceResponse){

serviceItems.forEach(item=>{

item.addEventListener("click", ()=>{

    serviceItems.forEach(i=>i.classList.remove("selected"));
    item.classList.add("selected");

    document.getElementById("respName").innerText =
        item.dataset.name;

    document.getElementById("respPrice").innerText =
        item.dataset.price;

    document.getElementById("respTurnaround").innerText =
        item.dataset.turnaround;

    const list = document.getElementById("respIncludes");
    list.innerHTML = "";

    item.dataset.includes.split(",").forEach(point=>{
        const li = document.createElement("li");
        li.innerText = point;
        list.appendChild(li);
    });

    serviceResponse.classList.add("active");

    serviceResponse.scrollIntoView({behavior:"smooth", block:"center"});

});

});

}



/* gallery filter */

function filterGallery(category){

let items = document.querySelectorAll(".gallery-item");

items.forEach(item=>{

if(category === "all"){

item.style.display = "block";

}

else if(item.classList.contains(category)){

item.style.display = "block";

}

else{

item.style.display = "none";

}

});

}


/* lightbox */

function openLightbox(src){

document.getElementById("lightbox").style.display = "flex";

document.getElementById("lightbox-img").src = src;

}

function closeLightbox(){

document.getElementById("lightbox").style.display = "none";

}


/* booking */
function calculateBooking(){
    let service = parseInt(document.getElementById("service").value);
    let hours = parseInt(document.getElementById("hours").value);
    let total = service + hours;
    document.getElementById("price").innerText = "R" + total;

    const msg = document.getElementById("formMsg");
    if(msg){
        msg.textContent = "Price updated.";
        msg.className = "form-msg success";
    }
}

function sendBooking(method){
    const msg = document.getElementById("formMsg");
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const serviceSelect = document.getElementById("service");
    const hoursSelect = document.getElementById("hours");
    const details = document.getElementById("details").value.trim();
    const price = document.getElementById("price").innerText;

    if(!name || !email || !details){
        msg.textContent = "Please fill in your name, email and project details before sending.";
        msg.className = "form-msg error";
        return;
    }

    const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
    const hoursName = hoursSelect.options[hoursSelect.selectedIndex].text;

    const subject = "New Booking Enquiry - " + name;
    const body = `New Booking Enquiry\n\n` +
                 `Name: ${name}\n` +
                 `Email: ${email}\n` +
                 `Service: ${serviceName}\n` +
                 `Session: ${hoursName}\n` +
                 `Details: ${details}\n` +
                 `Estimated Price: ${price}`;

    if(method === 'whatsapp'){
        const text = encodeURIComponent(body);
        const whatsappURL = "https://wa.me/27840428473?text=" + text;
        msg.textContent = "Opening WhatsApp...";
        msg.className = "form-msg success";
        window.open(whatsappURL, "_blank");
    } 
    else if(method === 'email'){
        // Opens default email client
        const mailto = `mailto:taariqismail21@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        msg.textContent = "Opening email client...";
        msg.className = "form-msg success";
        window.location.href = mailto;
    }
}
// Active Nav Highlight
function setActiveNav() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Gallery Filter + Lightbox
function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    document.querySelectorAll('.filter-buttons button').forEach(btn => btn.classList.remove('active'));
    
    if (category === 'all') {
        items.forEach(item => item.style.display = 'block');
    } else {
        items.forEach(item => {
            item.style.display = item.getAttribute('data-category') === category ? 'block' : 'none';
        });
    }
    
    // Highlight active filter button
    event.currentTarget.classList.add('active');
}

function openLightbox(el) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = el.src || el.querySelector('img').src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Service search
function filterServices() {
    const searchTerm = document.getElementById('serviceSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.service-item');
    
    cards.forEach(card => {
        const name = card.getAttribute('data-name') || '';
        card.style.display = name.toLowerCase().includes(searchTerm) ? 'block' : 'none';
    });
}

// Run on load
window.onload = function() {
    setActiveNav();
    // Other init functions...
};
// Service click handler + search
document.addEventListener('DOMContentLoaded', () => {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            showServiceDetails(item);
        });
    });
});

function showServiceDetails(item) {
    document.getElementById('respName').textContent = item.querySelector('h3').textContent;
    document.getElementById('respPrice').textContent = item.dataset.price;
    document.getElementById('respTurnaround').textContent = item.dataset.turnaround;
    
    const includesList = document.getElementById('respIncludes');
    includesList.innerHTML = '';
    item.dataset.includes.split(',').forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.trim();
        includesList.appendChild(li);
    });
    
    document.getElementById('serviceResponse').style.display = 'block';
}

function filterServices() {
    const searchTerm = document.getElementById('serviceSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.service-item');
    
    cards.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        card.style.display = name.includes(searchTerm) ? 'block' : 'none';
    });
}
// Toggle artist profile (Part-2 style)
function toggleProfile(card) {
    const details = card.querySelector('.profile-details');
    const isVisible = details.style.display === 'block';
    
    // Close all other profiles
    document.querySelectorAll('.profile-details').forEach(d => {
        d.style.display = 'none';
    });
    
    // Toggle current
    details.style.display = isVisible ? 'none' : 'block';
}