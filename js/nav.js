function nav(selector) {
    this.init();
}
nav.prototype = {
    constructor: nav,
    init: function() {
        $(".list1>li")
            .on("mouseenter", function() {
                //console.log(1);
                //console.log($(this).find("span"));
                $(this).find("span").css({
                    fontSize: "0"
                })
                $(this).find("ul")
                    .stop()
                    .fadeIn()
            })
            .on("mouseleave", function() {
                $(this).find("span").css({
                    fontSize: "16px"
                })
                $(this).find("ul")
                    .stop()
                    .fadeOut()
            })

    }.bind(this),
}
new nav(".list1")