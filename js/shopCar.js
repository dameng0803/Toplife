$(function() {
    var a = $(".accountbar");
    var d = $(".itemlist");
    console.log($(d).height());
    //var b = a.offset(); //相对于文档偏移的位置
    var b = $(d).offset().top;
    //console.log(b)
    $(document).on("scroll", function() {
        var c = $(document).scrollTop();
        //console.log(c);
        if (b <= c) {
            a.css({ "position": "fixed", "top": "0px" })
        } else {
            a.css({
                "position": "absolute",
                "top": "300px"
            })
        }
    })
})

function carDeatil(url, seletor) {
    this.url = url;
    console.log(this.url)
    this.main = $(seletor);
    this.car_string = "";

    this.init();
}
carDeatil.prototype = {
    constructor: carDeatil,
    init() {
        var carCookie = $.cookie("changeIndex");
        //console.log(JSON.parse(carCookie));
        var carArray = JSON.parse(carCookie);
        console.log(carArray);
        // var car_id = JSON.parse(carCookie)[0].id;
        // var car_num = JSON.parse(carCookie).num;
        // console.log(car_num);
        this.loading()
            .then(function(res) {
                res = JSON.parse(res);
                //console.log(res);
                res.forEach(function(item) {
                    for (var i = 0; i < carArray.length; i++) {
                        if (item.wareId == carArray[i].id) {
                            console.log(item);
                            console.log(carArray[i].num)
                            var num = carArray[i].num;
                            this.render(item, num);
                            this.deleteCar(item);
                        }
                    }
                }.bind(this));
            }.bind(this));


    },
    loading() {
        return ajaxGet(this.url);
    },
    render(item, num) {
        // console.log(num)
        this.car_string += `<div class="itemlist">
                            <form>
                                <input type="checkbox" name="items" />
                            </form>

                            <div class="item_header">
                                <a href="list.html"><img src="${item.img}" alt=""></a>
                                <div class="item_info">
                                    <p class="item_name">${item.wareName}</p>
                                </div>
                            </div>
                            <div class="skuitem_attr">
                                <ul class="skuitem_attr_list">
                                    <li title="AC101 ">类型：AC101 </li>
                                </ul>
                            </div>
                            <div class="skuitem_price_wrap">
                                <div class="skuitem_price">¥ ${item.price}</div>
                            </div>
                            <div class="counter">
                                <span class="counter_minus">-</span>
                                <input class="counter_count" type="text" value="${num}">
                                <span class="counter_plus">+</span>
                            </div>
                            <div class="delete">
                                <a href="##">删除</a>
                            </div>
                        </div>
                        <div class="accountbar"> 
                            <form>
                                <input type="checkbox" id="CheckAll" />全选
                            </form>
                            <p class="deleteAll">删除选中的商品</p>
                            <div class="accountbar_total">
                                <p class="accountbar_price">
                                    <span>合计(不算运费):</span>
                                    <span class="totle_price">￥ <strong>0</strong> </span>
                                </p>
                                <button class="accountbar_submit">去结算</button>
                            </div>
                        </div>`
            // console.log(car_string);
        this.main.html(this.car_string);
        $("#CheckAll").click(function() {
            $("input:checkbox").prop("checked", this.checked);
        });
        $('[name=items]:checkbox').click(function() {
            $(".totle_price strong").text(item.price * num);
            $(".deleteAll").click(function(item) {
                if (!$.cookie("loginCookie")) {
                    $(function() {
                        var $obox = `<div class="box">
                                        <div class="box1">
                                          <img src="images/gwc.png">
                                          <p>购物车中还没有商品，赶紧选购吧!</p> 
                                        </div>
                                    </div>`;
                        $(".car_warp").append($obox);
                        $(".box").css({
                            width: "1190px",
                            height: "200px",
                            background: "#fff",
                            position: "relative",
                            margin: "0 auto",
                        });
                        $(".box .box1").css({
                            width: "1190px",
                            height: "60px",
                            top: "50px",
                            background: "#fff",
                            position: "absolute",
                        });
                        $(".box .box1 img").css({
                            width: "60px",
                            height: "60px",
                            left: "470px",
                            float: "left",
                            position: "absolute"
                        });
                        $(".box .box1 p").css({
                            left: "550px",
                            position: "absolute",
                            font_size: "30px",
                            top: "20px"
                        });
                        $(".accountbar").remove();

                    })
                } else {
                    $.cookie("changeIndex", "", "{expires: -1}");
                }

            })
        });

        //console.log($(".counter_count").attr("value"));
        var num1 = $(".counter_count").attr("value");
        //console.log(num1);
        $(".counter").delegate(".counter_minus", "click", function() {
            num1--;
            if (num1 > 0) {
                $(".counter_count").attr("value", num1);
                $(".totle_price")
            } else {
                $(".counter_count").attr("value", "0");
            }
            console.log(num1);
        }.bind(this));
        $(".counter").delegate(".counter_plus", "click", function() {
            num1++;
            $(".counter_count").attr("value", num1);
            console.log(num1);
        }.bind(this));
    },
    deleteCar(item) {
        //console.log(item);
        $(".delete").on("click", function(item) {
            //console.log(1);
            if (!$.cookie("loginCookie")) {
                $(function() {
                    var $obox = `<div class="box">
                                    <div class="box1">
                                      <img src="images/gwc.png">
                                      <p>购物车中还没有商品，赶紧选购吧!</p> 
                                    </div>
                                </div>`;
                    $(".car_warp").append($obox);
                    $(".box").css({
                        width: "1190px",
                        height: "200px",
                        background: "#fff",
                        position: "relative",
                        margin: "0 auto",
                    });
                    $(".box .box1").css({
                        width: "1190px",
                        height: "60px",
                        top: "50px",
                        background: "#fff",
                        position: "absolute",
                    });
                    $(".box .box1 img").css({
                        width: "60px",
                        height: "60px",
                        left: "470px",
                        float: "left",
                        position: "absolute"
                    });
                    $(".box .box1 p").css({
                        left: "550px",
                        position: "absolute",
                        font_size: "30px",
                        top: "20px"
                    });
                    $(".accountbar").remove();

                })
            } else {
                $.cookie("changeIndex", "", "{expires: -1}");
            }


        })
    },
    getCar() {

    },
}
new carDeatil("./libs/data.json", ".sku_list");