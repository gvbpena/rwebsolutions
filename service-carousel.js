$(document).ready(function () {
    var $serviceWrapper = $(".third-section-container .wrapper");
    var $serviceCarousel = $(".third-section-container .carousel");
    var $serviceFirstCard = $(".third-section-container .card").first();
    var serviceFirstCardWidth = $serviceFirstCard.outerWidth(true);
    var $serviceArrowBtns = $(".third-section-container .wrapper i");
    var $serviceCarouselChildren = $serviceCarousel.children();
    var serviceIsDragging = false;
    var serviceIsAutoPlay = true;
    var serviceStartX;
    var serviceStartScrollLeft;
    var serviceTimeoutId;
    var serviceMouseDownX;
    var serviceMouseDownY;
    var serviceCardPerView = Math.round($serviceCarousel.width() / serviceFirstCardWidth);
    var serviceRecentlyDragged = false;

    // Clone items for seamless looping
    $serviceCarouselChildren
        .slice(-serviceCardPerView)
        .reverse()
        .each(function () {
            $serviceCarousel.prepend($(this).clone());
        });

    $serviceCarouselChildren.slice(0, serviceCardPerView).each(function () {
        $serviceCarousel.append($(this).clone());
    });

    $serviceCarousel.addClass("no-transition").scrollLeft($serviceCarousel.width());
    $serviceCarousel.removeClass("no-transition");

    // Arrow button click event
    $serviceArrowBtns.on("click", function () {
        var scrollAmount = $(this).attr("id") === "left" ? -serviceFirstCardWidth : serviceFirstCardWidth;
        $serviceCarousel.scrollLeft($serviceCarousel.scrollLeft() + scrollAmount);
    });

    // Drag functionality
    $serviceCarousel
        .on("mousedown", function (e) {
            serviceIsDragging = true;
            serviceRecentlyDragged = true;
            $serviceCarousel.addClass("dragging");

            serviceStartX = e.pageX;
            serviceMouseDownX = e.pageX;
            serviceMouseDownY = e.pageY;
            serviceStartScrollLeft = $serviceCarousel.scrollLeft();
        })
        .on("mousemove", function (e) {
            if (serviceIsDragging) {
                $serviceCarousel.scrollLeft(serviceStartScrollLeft - (e.pageX - serviceStartX));
            }
        })
        .on("mouseup", function (e) {
            serviceIsDragging = false;
            serviceRecentlyDragged = true;
            $serviceCarousel.removeClass("dragging");

            if (Math.abs(e.pageX - serviceMouseDownX) < 5 && Math.abs(e.pageY - serviceMouseDownY) < 5) {
                var $card = $(e.target).closest(".card");
                if ($card.length) {
                    window.location.href = $card.find("a").attr("href");
                }
            }

            setTimeout(function () {
                serviceRecentlyDragged = false;
            }, 200);
        });

    // Infinite scroll logic
    function serviceInfiniteScroll() {
        var scrollLeft = $serviceCarousel.scrollLeft();
        var scrollWidth = $serviceCarousel.prop("scrollWidth");
        var carouselWidth = $serviceCarousel.width();

        if (scrollLeft === 0) {
            $serviceCarousel.addClass("no-transition").scrollLeft(scrollWidth - 2 * carouselWidth);
            $serviceCarousel.removeClass("no-transition");
        } else if (Math.ceil(scrollLeft) === scrollWidth - carouselWidth) {
            $serviceCarousel.addClass("no-transition").scrollLeft(carouselWidth);
            $serviceCarousel.removeClass("no-transition");
        }

        clearTimeout(serviceTimeoutId);
        if (!$serviceWrapper.is(":hover")) {
            serviceAutoPlay();
        }
    }

    // Auto-play functionality
    function serviceAutoPlay() {
        serviceTimeoutId = setTimeout(function () {
            $serviceCarousel.scrollLeft($serviceCarousel.scrollLeft() + serviceFirstCardWidth);
        }, 2500);
    }

    serviceAutoPlay();

    $serviceCarousel.on("scroll", serviceInfiniteScroll);
    $serviceWrapper
        .on("mouseenter", function () {
            clearTimeout(serviceTimeoutId);
        })
        .on("mouseleave", serviceAutoPlay);

    $(".card").on("click", function (e) {
        if (serviceRecentlyDragged) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
});
