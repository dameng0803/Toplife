function Register(options) {
    this.username = $(options.username);
    //console.log(this.username.val());
    this.pwd = $(options.pwd);
    this.password = $(options.password);
    this.goregister = $(options.goregister);
    //console.log(this.username, this.pwd, this.password, this.goregister);
    this.init();
}
Register.prototype = {
    constructor: Register,
    init() {
        //绑定事件
        this.username.on("blur", $.proxy(this.userVerification, this));
        this.pwd.on("blur", $.proxy(this.pwdVerification, this));
        this.password.on("blur", $.proxy(this.passwordVerification, this));
        this.goregister.on("click", $.proxy(this.resRegister, this));
    },
    //判断邮箱格式
    userVerification() {
        var string = this.username.val();
        console.log(string);
        var userReg = /\w{6,20}@[a-z0-9]{2,6}\.[a-z]{2,6}/;
        var bool = userReg.test(string);
        if (bool == false) {
            this.username.val("");
            this.username.css({ "border-color": "red" })
        }
    },
    //判断密码格式
    pwdVerification() {
        var string = this.pwd.val();
        console.log(string);
        var pwdReg = /^[a-z0-9\u0021-\u002f]{6,20}$/i;
        var bool = pwdReg.test(string);
        if (bool == false) {
            this.pwd.val("");
            this.pwd.css({ "border-color": "red" })
        }
    },
    //判断密码是否一致
    passwordVerification() {
        var string = this.password.val();
        console.log($("#psw"))
        var pwdStr = $("#psw").val();
        if (string !== pwdStr) {
            this.password.val("");
            this.password.css({ "border-color": "red" })
        }
    },
    resRegister() {
        //注册信息交给后台
        if (this.username.val() == "" || this.pwd.val() == "" || this.password.val() == "") return;
        var username = this.username.val();
        var pwd = this.pwd.val();
        var opt = {
            url: "http://localhost/toplife3/php/user.php",
            type: "POST",
            data: { username: username, password: pwd, type: "register" }
        }
        $.ajax(opt)
            .then(function(res) {
                if (res == 2) {
                    console.log(res)
                    alert("用户名已经注册！")
                } else if (res == 1) {
                    console.log(res)
                    window.location.href = "login.html"
                } else {
                    console.log(res)

                }
            })
    }
}
new Register({
    username: "#username",
    pwd: "#psw",
    password: "#confirmpw",
    goregister: "#register"
})