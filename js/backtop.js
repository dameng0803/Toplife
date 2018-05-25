$(function() {
    var timer;
    //console.log(document.documentElement.scrollTop);
    $(".backtop .backtop_item")
        .on("click", function() {
            timer = setInterval(function() {

                if (document.documentElement.scrollTop <= 0) {
                    document.documentElement.scrollTop = 0;
                    clearInterval(timer);
                } else {
                    document.documentElement.scrollTop = document.documentElement.scrollTop - 50;
                }
            }, 60)


        })
})

$(document).on("scroll", function() {
        console.log($(".backtop").offset().top);
        console.log($(window).height());
        if ($(".backtop").offset().top < $(window).height()) {
            $(".backtop").fadeOut();
        } else {
            $(".backtop").fadeIn();
        }
    }

)