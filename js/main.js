const header = document.querySelector(".header");
const heroBg = document.querySelector(".hero-bg")
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
    const scrolled = window.scrollY;
    heroBg.style.transform = `translateY(${scrolled * 0.25}px) scale(1.08)`;

    
});




if (menuToggle && navMenu) {
    
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.classList.toggle("menu-open");
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            navMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
        });
    });

}



// GALLERY
const images = ["p1.png", "p2.jpg", "p3.jpg", "p4.jpg", "p5.jpg"];
let index = 0;

const mainImg = document.getElementById("mainProductImage");
const thumbs = document.querySelectorAll(".thumb");
const dots = document.querySelectorAll(".dot");

function updateGallery(i) {
    index = i;

    mainImg.src = `assets/images/${images[i]}`;

    thumbs.forEach((t,idx) => t.classList.toggle("active", idx===i));

    dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx == i);
    });
}

document.getElementById("nextImg").onclick = ()=> updateGallery((index+1)%images.length);
document.getElementById("prevImg").onclick = ()=> updateGallery((index-1+images.length)%images.length);

thumbs.forEach((thumb,i)=>thumb.onclick=()=>updateGallery(i));

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        updateGallery(i);
    });
});


updateGallery(0);



// SUBSCRIPTION COLLAPSE

const subscriptionBoxes = document.querySelectorAll(".subscription-box");

subscriptionBoxes.forEach(box => {
    const radio = box.querySelector('input[type="radio"]');

    radio.addEventListener("change", () => {
        subscriptionBoxes.forEach(other => {
            other.classList.remove("active");
            other.querySelector('input[type="radio"]').checked = false;
        });

        box.classList.add("active");
        radio.checked = true;
    });
});



const fragranceMap = {
    original: 0,
    lily: 1,
    rose: 2
};


const fragranceCards = document.querySelectorAll(".fragrance-card")

fragranceCards.forEach(card => {
  card.addEventListener("click", () => {
        const radio = card.querySelector("input[type='radio']");

        // Check radio
        radio.checked = true;

        // Remove active from all
        fragranceCards.forEach(c => c.classList.remove("active"));

        // Add active to selected
        card.classList.add("active");
    });
});






// ACCORDION TABLE => COLLECTION

const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach(item => {
    item.addEventListener("click", () => {
        accordionItems.forEach(i => {
            i.classList.remove("active");
            const icon = i.querySelector(".icon");
            if (icon) icon.textContent = "+";
        });

        item.classList.add("active");
        const icon = item.querySelector(".icon");
        if (icon) icon.textContent = "-";
    });
});

 

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".stat h3");
    let started = false;

    const animateCounter = (el) => {
        const target = +el.getAttribute("data-target");
        const duration = 1800;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * target);
            const suffix = el.dataset.suffix || "";

            el.textContent = value.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !started) {
                    counters.forEach(counter => animateCounter(counter));
                    started = true;
                    observer.disconnect();
                }
            });
        },
        { threshold: 0.4 }
    );

    observer.observe(document.querySelector(".collection-stats"));
});



gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(".badge", {
        y: 20,
        opacity: 0,
        duration: 0.6
    })
    .from(".hero-content h1", {
        y: 40,
        opacity: 0,
        duration: 0.8
    }, "-=0.3")
    .from(".hero-stats", {
        y: 30,
        opacity: 0,
        duration: 0.6
    }, "-=0.4")
    .from(".btn-primary", {
        y: 20,
        opacity: 0,
        duration: 0.6
    }, "-=0.4")
    .from(".hero-image", {
        scale: 0.95,
        opacity: 0,
        duration: 0.9
    }, "-=0.5");

