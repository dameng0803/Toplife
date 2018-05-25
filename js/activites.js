$(function() {

    $(".barans>li")
        .on("mouseover", function() {
            $(this).find("a").stop().css({
                background: `rgba(${0},${0},${0},${0.3})`,

            })
            $(this).find("a img").stop().animate({ width: 200 })
        })
        .on("mouseleave", function() {
            $(this).find("a").stop().css({
                background: "#fff",
            })
            $(this).find("a img").stop().animate({ width: 165 })
        })

})