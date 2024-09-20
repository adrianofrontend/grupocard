export default function Sliders() {
    new Swiper(".swiper", {
        // Optional parameters
        direction: "horizontal",
        loop: true,
        autoHeight: true,

        // If we need pagination
        pagination: {
            el: ".swiper-pagination"
        },

        // Navigation arrows
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }

        // And if we need scrollbar
        /*scrollbar: {
        el: '.swiper-scrollbar',
      },*/
    });




  
   

    let swiperPartners = undefined;
    function initSwiperPartners() {
        let screenWidth = $(window).width();
        if (screenWidth < 992 && swiperPartners == undefined) {
            swiperPartners = new Swiper('.swiper-container-partners', {
                slidesPerView: 1,
                spaceBetween: 10,
                autoplay: true,
                centeredSlides: true,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                loop: true,
                autoplay: {
                    delay: 2000,
                },
                breakpoints: {
                    // when window width is <= 499px
                    320: {
                        slidesPerView: 1,
                        centeredSlides: true,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        }
                    },
                    499: {
                        slidesPerView: 2,

                    },
                    // when window width is <= 999px
                    999: {
                        slidesPerView: 3,
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                    }
                }
            });
        } else if (screenWidth > 991 && swiperPartners != undefined) {
            swiperPartners.destroy();
            swiperPartners = undefined;

            jQuery('.swiper-wrapper').removeAttr('style');
            jQuery('.swiper-slide').removeAttr('style');
        }
    }

    let swiperProducts = undefined;
    function initSwiperProducts() {
        let screenWidth = $(window).width();
        if (screenWidth < 992 && swiperProducts == undefined) {
            swiperProducts = new Swiper('.swiper-container-products', {
                slidesPerView: 1,
                spaceBetween: 10,
                freeMode: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                loop: true,
                autoplay: {
                    delay: 2000,
                },
                breakpoints: {
                    // when window width is <= 499px
                    320: {
                        slidesPerView: 1,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        }
                    },
                    499: {
                        slidesPerView: 2,

                    },
                    // when window width is <= 999px
                    999: {
                        slidesPerView: 3,
                        /* navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }, */
                    }
                }
            });
        } else if (screenWidth > 991 && swiperProducts != undefined) {
            swiperProducts.destroy();
            swiperProducts = undefined;

            jQuery('.swiper-wrapper').removeAttr('style');
            jQuery('.swiper-slide').removeAttr('style');
        }
    }





    //Swiper plugin initialization
    initSwiperProducts();
    initSwiperPartners();

    //Swiper plugin initialization on window resize
    $(window).on('resize', function () {
        initSwiperProducts();
        initSwiperPartners();
    });

}