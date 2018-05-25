function ChangeIndex(url, selector) {
    this.url = url;
    this.main = $(selector)
        //console.log(this.url);
    this.init();
}
ChangeIndex.prototype = {
    constructor: ChangeIndex,
    init() {
        this.path = window.location.href.split("=")[1];
        //console.log(this.path);
        this.loading()
            .then(function(res) {
                res = JSON.parse(res);
                //console.log(res);
                for (let i in res) {
                    if (res[i].wareId == this.path) {
                        //console.log(res[i])
                        this.render(res[i])
                    }
                }
            }.bind(this));
        this.carNum = $(".car_num");
        this.car_val = $(".carnum").val();
        console.log(this.car_val);
        this.carNum.html(this.getSum());
        console.log(this.getSum());
        this.main.on("click.addcar", "button[data-id]", $.proxy(this.addCar, this));
        this.main.on("click.changeNum", "button[data-id]", $.proxy(this.changeNum(), this));

    },
    loading() {
        return ajaxGet(this.url);
    },
    render(res) {
        var detail_string = "";
        //console.log(res.wareName)
        detail_string += `<div class="detail_title">
                                <p>TOPLIFE > 美妆个护 > ALANCHAN CREATIONS </p>
                            </div>
                            <div class="detail_intro">
                                <div class="detail_inner">
                                    <div class="img_show">
                                        <div class="small_show">
                                            <div class="wrap"></div>
                                            <img src="${res.bigimg}" class="opacity-img" alt="">
                                            <span class="grayBox"></span>
                                        </div>

                                        <div class="slide_pic">
                                            <div class="small1">
                                                <img src="${res.image[0]}" alt="">
                                            </div>
                                            <div class="small2">
                                                <img src="${res.image[1]}" alt="">
                                            </div>
                                            <div class="small3">
                                                <img src="${res.image[2]}" alt="">
                                            </div>
                                            <div class="small4">
                                                <img src="${res.image[3]}" alt="">
                                            </div>
                                            <div class="small5">
                                                <img src="${res.image[4]}" alt="">
                                            </div>
                                        </div>

                                    </div>
                                    <div class="big_show">
                                        <img src="${res.bigimg}" alt="">
                                    </div>

                                    <div class="tab_head">
                                        <p class="tab_left">商品描述</p>
                                        <p class="tab_right">服务说明</p>
                                    </div>

                                    <div class="img_intro">
                                        <img src="${res.lk}" alt="">
                                    </div>

                                </div>

                            </div>
                            <div class="introduce">
                                <h1>
                                    <p class="brandName">${res.slogan}</p>
                                    <p class="pName">${res.wareName}</p>
                                </h1>

                                <p class="brand_price">￥ ${res.price}</p>

                                <div class="peisong">
                                    <span>配送至 &nbsp;&nbsp;&nbsp;&nbsp;:</span>
                                    <p class="p1">北京朝阳区三环以内</p>
                                    <p class="p2"><strong>有货</strong></p>
                                    <p class="p3">(由 TOPLIFE 发货, Alan Chan Creations提供售后服务。)</p>
                                </div>
                                <div class="leixing">
                                    <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:</span>
                                    <p>AC101</p>
                                </div>
                                <div class="num">
                                    <span>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量:</span>
                                    <button class="btn1 btnleft">-</button>
                                    <input class="carnum" type="text" value="1">
                                    <button class="btn1 btnright">+</button>
                                    <p class="addCar">
                                        <button class="car_btn" data-id=${res.wareId}>加入购物车</button>
                                    </p>

                                </div>`
        this.main.html(detail_string);

        var num2 = $(".carnum").attr("value");
        console.log(num2);
        $(".num").delegate(".btnleft", "click", function() {
            num2--;
            if (num2 > 0) {
                $(".carnum").attr("value", num2);
            } else {
                $(".carnum").attr("value", "0");
            }
            console.log(num2);
        }.bind(this));
        $(".num").delegate(".btnright", "click", function() {
            num2++;
            $(".carnum").attr("value", num2);
            //console.log(num2);
        }.bind(this));

        function Magnifier(options) {
            this.small_ele = $(options.small_ele);
            this.focus_ele = $(options.focus_ele);
            //console.log(this.small_ele);
            this.big_ele = $(options.big_ele);
            this.small_show = $(options.small_show);
            //console.log(this.big_ele)

            if (this.small_ele.length == 0 || this.focus_ele.length == 0 || this.big_ele.length == 0) return;
            this.init();

        }
        Magnifier.prototype = {
            constructor: Magnifier,
            init() {
                //绑定鼠标移入事件
                this.scale = this.big_ele.width() / this.focus_ele.width();
                this.ratio();
                this.small_ele.on("mouseenter", {
                    hidden: false
                }, $.proxy(this.toggleFocus, this));
                this.small_ele.on("mouseleave", {
                    hidden: true
                }, $.proxy(this.toggleFocus, this));
                this.small_ele.on("mousemove.smallMove", $.proxy(this.smallMove, this));
                this.small_ele.on("mousemove.bigMove", $.proxy(this.bigMove, this));
                this.small_click(res);


            },
            small_click(res) {
                $(".slide_pic").delegate("div img", "click", function(e) {
                    var target = e.target;
                    $(".opacity-img").attr("src", target.src);


                })

            },
            toggleFocus(event) {
                var opacity_img = this.small_ele.find(".opacity-img");
                //console.log(opacity_img);
                if (event.data.hidden) {
                    this.focus_ele.stop().fadeOut(200);
                    this.big_ele.stop().fadeOut(200);
                    opacity_img.stop().fadeTo("fast", 1);
                } else {
                    this.focus_ele.stop().fadeIn(200);
                    this.big_ele.stop().fadeIn(200);
                    opacity_img.stop().fadeTo("fast", 0.3);
                }
            },
            smallMove(event) {
                var eleX = event.offsetX - this.focus_ele.width() / 2;
                var eleY = event.offsetY - this.focus_ele.height() / 2;

                //边界检测
                var maxWidth = this.small_ele.width() - this.focus_ele.width();
                var maxHeight = this.small_ele.height() - this.focus_ele.height();

                //console.log(maxWidth, maxHeight);

                eleX = eleX <= 0 ? 0 : eleX;
                eleX = eleX >= maxWidth ? maxWidth : eleX;

                eleY = eleY <= 0 ? 0 : eleY;
                eleY = eleY >= maxHeight ? maxHeight : eleY;

                this.focus_ele.css({
                    left: eleX,
                    top: eleY,
                    backgroundPosition: `${-eleX}px ${-eleY}px`
                })

                var fullLongX = this.small_ele.width() - this.focus_ele.width();
                var fullLongY = this.small_ele.height() - this.focus_ele.height();
                //console.log(fullLongX, fullLongY);
                this.propX = Math.round(eleX / fullLongX * 100);
                this.propY = Math.round(eleY / fullLongY * 100);
                //console.log(this.propX, this.propY);

            },
            bigMove() {
                var bigImg = this.big_ele.find("img");
                var fullLongX = bigImg.width() - this.big_ele.width();
                var fullLongY = bigImg.height() - this.big_ele.height();

                var eleX = -Math.round(fullLongX * this.propX / 100);
                var eleY = -Math.round(fullLongY * this.propY / 100);

                bigImg.css({
                    left: eleX,
                    top: eleY
                })
            },
            ratio() {
                var bigImg = this.big_ele.find("img");
                bigImg.css({
                    width: Math.round(this.small_ele.width() * this.scale),
                    height: Math.round(this.small_ele.height() * this.scale)
                })
            },

        }

        new Magnifier({
            small_ele: ".small_show",
            focus_ele: ".grayBox",
            big_ele: ".big_show",
            small_show: ".slide_pic"
        })
    },
    addCar(event) {
        //获取id 
        var target = event.target || event.srcElement;
        var goodsId = $(target).attr("data-id");
        //console.log(goodsId);

        //操作cookie存入购物车
        if (!$.cookie("changeIndex")) {
            //表示是第一次存入购物车
            var shopCarArray = [{
                id: goodsId,
                num: 1
            }]
            $.cookie("changeIndex", JSON.stringify(shopCarArray))

            return 0;
        }
        //其余次数进行加入购物车
        //id是否在购物车之中存在

        var shopCarString = $.cookie("changeIndex");
        var shopCarArray = JSON.parse(shopCarString);

        console.log(shopCarArray);
        var hasItem = false;
        shopCarArray.forEach(function(item) {
            console.log(item);
            //如果购物车列表之中有当前项，让商品数量自增
            if (item.id == goodsId) {
                item.num++;
                hasItem = true;
            }
        })
        if (!hasItem) {
            var item = {
                id: goodsId,
                num: 1
            }
            shopCarArray.push(item);
        }
        console.log(JSON.stringify(shopCarArray));
        $.cookie("changeIndex", JSON.stringify(shopCarArray));
        //console.log($.cookie("changeIndex"));
    },
    changeNum() {
        this.carNum.html(this.getSum());
    },
    getSum() {
        var shopCarString = $.cookie("changeIndex");
        if (shopCarString) {
            var shopCarArray = JSON.parse(shopCarString);
            //console.log(shopCarArray);
            var sum = 0;
            shopCarArray.forEach(function(item) {
                console.log(item);
                sum += Number(item.num);
            })
            return sum;
        }
        return 0;
    }
}
new ChangeIndex("./libs/data.json", ".detailMain_center");