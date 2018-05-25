$(function() {
    //console.log(JSON.parse($.cookie("loginCookie"))[0].id)
    if ($.cookie("loginCookie")) {
        var usercookie = JSON.parse($.cookie("loginCookie"))[0].id;
        console.log($(".login .gologin")[0].text);
        $(".login .gologin").text("欢迎" + usercookie);
        $(".login .goregist").text("退出");
        $(".login .goregist").on("click", function() {
            $.cookie("loginCookie", "", "{expires: -1}");
        })
    } else {
        $(".login .gologin").text("登录");
        $(".login .goregist").text("注册");
    }


})