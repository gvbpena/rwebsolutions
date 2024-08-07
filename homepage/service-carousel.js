var service_wrapper = document.querySelector(" .wrapper");
var service_carousel = document.querySelector(" .carousel");
var service_firstCardWidth = service_carousel.querySelector(" .card").offsetWidth;
var service_arrowBtns = document.querySelectorAll(" .wrapper i");
var service_carouselChildrens = [...service_carousel.children];
let service_isDragging = false,
    service_isAutoPlay = true,
    service_startX,
    service_startScrollLeft,
    service_timeoutId,
    service_mouseDownX,
    service_mouseDownY;
let service_cardPerView = Math.round(service_carousel.offsetWidth / service_firstCardWidth);
let service_recentlyDragged = false;

// Duplicate cards for seamless looping
service_carouselChildrens
    .slice(-service_cardPerView)
    .reverse()
    .forEach((card) => {
        service_carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

service_carouselChildrens.slice(0, service_cardPerView).forEach((card) => {
    service_carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Start from the middle of the carousel
service_carousel.classList.add("no-transition");
service_carousel.scrollLeft = service_carousel.offsetWidth;
service_carousel.classList.remove("no-transition");

service_arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        service_carousel.scrollLeft += btn.id == "left" ? -service_firstCardWidth : service_firstCardWidth;
    });
});

var service_dragStart = (e) => {
    service_isDragging = true;
    service_recentlyDragged = true;
    service_carousel.classList.add("dragging");

    service_startX = e.pageX;
    service_mouseDownX = e.pageX;
    service_mouseDownY = e.pageY;
    service_startScrollLeft = service_carousel.scrollLeft;
};

var service_dragging = (e) => {
    if (!service_isDragging) return;

    service_carousel.scrollLeft = service_startScrollLeft - (e.pageX - service_startX);
};

var service_dragStop = (e) => {
    service_isDragging = false;
    service_recentlyDragged = true;
    service_carousel.classList.remove("dragging");

    if (Math.abs(e.pageX - service_mouseDownX) < 5 && Math.abs(e.pageY - service_mouseDownY) < 5) {
        let card = e.target.closest(".card");
        if (card) {
            window.location.href = card.querySelector("a").getAttribute("href");
        }
    }

    setTimeout(() => {
        service_recentlyDragged = false;
    }, 200);
};

var service_infiniteScroll = () => {
    if (service_carousel.scrollLeft <= 0) {
        service_carousel.classList.add("no-transition");
        service_carousel.scrollLeft = service_carousel.scrollWidth - 2 * service_carousel.offsetWidth;
        service_carousel.classList.remove("no-transition");
    } else if (Math.ceil(service_carousel.scrollLeft) >= service_carousel.scrollWidth - service_carousel.offsetWidth) {
        service_carousel.classList.add("no-transition");
        service_carousel.scrollLeft = service_carousel.offsetWidth;
        service_carousel.classList.remove("no-transition");
    }

    clearTimeout(service_timeoutId);
    if (!service_wrapper.matches(":hover")) service_autoPlay();
};

var service_autoPlay = () => {
    service_timeoutId = setTimeout(() => (service_carousel.scrollLeft += service_firstCardWidth), 2500);
};

service_autoPlay();

service_carousel.addEventListener("mousedown", service_dragStart);
service_carousel.addEventListener("mousemove", service_dragging);
document.addEventListener("mouseup", service_dragStop);
service_carousel.addEventListener("scroll", service_infiniteScroll);
service_wrapper.addEventListener("mouseenter", () => clearTimeout(service_timeoutId));
service_wrapper.addEventListener("mouseleave", service_autoPlay);

document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (e) => {
        if (service_recentlyDragged) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
});
