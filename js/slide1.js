certifySwiper = new Swiper('.certify1 .swiper-container', {
    watchSlidesProgress: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    loopedSlides: 5,
    autoplay: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        progress: function(progress) {
            for (i = 0; i < this.slides.length; i++) {
                //console.log(this.slides.length)
                var slide = this.slides.eq(i);
                var slideProgress = this.slides[i].progress;
                //console.log(slideProgress);
                modify = 1;
                if (Math.abs(slideProgress) > 1) {
                    modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                }
                translate = slideProgress * modify * 260 + 'px';
                //console.log(translate);
                scale = 1 - Math.abs(slideProgress) / 5;
                //console.log(scale);
                zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                slide.css('zIndex', zIndex);
                slide.css('opacity', 1);
                if (Math.abs(slideProgress) > 3) {
                    slide.css('opacity', 0);
                }
            }
        },
        setTransition: function(transition) {
            for (var i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i)
                slide.transition(transition);
            }

        }
    }

})