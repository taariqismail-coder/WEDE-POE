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


/* FAQ */

const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach(button=>{

button.addEventListener("click", ()=>{

const answer = button.nextElementSibling;

if(answer.style.display === "block"){

answer.style.display = "none";

}

else{

answer.style.display = "block";

}

});

});
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

let service =
parseInt(document.getElementById("service").value);

let hours =
parseInt(document.getElementById("hours").value);

let total = service + hours;

document.getElementById("price").innerText =
"R" + total;

}


