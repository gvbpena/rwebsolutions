// // Handling Click Scroll Down
// document.addEventListener("DOMContentLoaded", function() {

//     var cards = document.querySelectorAll(".second-section-container .card");
//     let isDragged = false;

//     cards.forEach(card => {
//         card.addEventListener("click", handleClick);
//     });

//     function handleClick(e) {
//         if (!isClickWithinCard(e) || isDragged) return;

//         e.preventDefault();
//         var targetId = this.getAttribute("data-target");
//         var targetSection = document.querySelector(targetId);

//         let scrollOffset = -270;

//         if (window.innerWidth <= 920) {
//             scrollOffset = -200;
//         } else if (window.innerWidth <= 1020) {
//             scrollOffset = -280;
//         }

//         var targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset + scrollOffset;

//         window.scrollTo({
//             top: targetPosition,
//             behavior: 'smooth'
//         });

//         this.blur();
//     }

//     function isClickWithinCard(e) {
//         return e.target.closest('.card') !== null;
//     }

//     // Handling Slider
//     var wrapper = document.querySelector(".second-section-container .wrapper");
//     var carousel = document.querySelector(".second-section-container .carousel");
//     var firstCardWidth = carousel.querySelector(".second-section-container .card").offsetWidth;
//     var carouselChildrens = [...carousel.children];
//     let isDragging = false;
//     let startX, startScrollLeft;
//     var cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

//     function cloneCards() {
//         carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
//             var clonedCard = card.cloneNode(true);
//             clonedCard.addEventListener("click", handleClick);
//             carousel.insertBefore(clonedCard, carousel.firstChild);
//         });

//         carouselChildrens.slice(0, cardPerView).forEach(card => {
//             var clonedCard = card.cloneNode(true);
//             clonedCard.addEventListener("click", handleClick);
//             carousel.appendChild(clonedCard);
//         });
//     }

//     cloneCards();
//     carousel.classList.add("no-transition");
//     carousel.scrollLeft = carousel.offsetWidth;
//     carousel.classList.remove("no-transition");

//     var dragStart = (e) => {
//         isDragging = true;
//         isDragged = false;
//         carousel.classList.add("dragging");
//         startX = e.pageX;
//         startScrollLeft = carousel.scrollLeft;
//     };

//     var dragging = (e) => {
//         if (!isDragging) return;
//         carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
//         isDragged = true;
//     };

//     var dragStop = () => {
//         isDragging = false;
//         carousel.classList.remove("dragging");
//     };

//     var infiniteScroll = () => {
//         if (carousel.scrollLeft === 0) {
//             carousel.classList.add("no-transition");
//             carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
//             carousel.classList.remove("no-transition");
//         } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
//             carousel.classList.add("no-transition");
//             carousel.scrollLeft = carousel.offsetWidth;
//             carousel.classList.remove("no-transition");
//         }

//         clearTimeout(timeoutId);
//         if (!isDragging && !wrapper.matches(":hover")) autoPlay();
//     };

//     let timeoutId;

//     var autoPlay = () => {
//         timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
//     };

//     autoPlay();

//     carousel.addEventListener("mousedown", dragStart);
//     carousel.addEventListener("mousemove", dragging);
//     document.addEventListener("mouseup", dragStop);
//     carousel.addEventListener("scroll", infiniteScroll);
//     wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
//     wrapper.addEventListener("mouseleave", autoPlay);
// });
