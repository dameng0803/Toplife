//登录信息
$("#login1").on("click", function() {
    //把登陆信息交给后台验证;

    var username = $("#userId").val();
    var pwd = $("#password").val();
    console.log(username, pwd);
    var opt = {
        url: "http://localhost/toplife3/php/user.php",
        type: "POST",
        data: { username: username, password: pwd, type: "login" }
    }
    $.ajax(opt)
        .then(function(res) {
            if (!$.cookie("loginCookie")) {
                //第一次存数据;
                var loginCookie = [{
                    id: username,
                    type: 1
                }]
                $.cookie("loginCookie", JSON.stringify(loginCookie))
                console.log($.cookie("loginCookie"));
                window.location.href = "index.html";
            }
            // console.log(res);
            // if (res == 0) {
            //     console.log(res);
            //     alert("用户名或密码错误！")
            // } else {
            //     console.log(res);
            //     if (!$.cookie("loginCookie")) {
            //         //第一次存数据;
            //         var loginCookie = [{
            //             id: "login",
            //             type: 1
            //         }]
            //         $.cookie("loginCookie", JSON.stringify(loginCookie))
            //         console.log($.cookie("loginCookie"));
            //         window.location.href = "index.html";
            //     }

            // }
        })
})