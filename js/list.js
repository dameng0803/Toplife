$(function() {
    var goods = new Goods("./libs/data.json", ".goods_wrap")

})

function Goods(url, selector) {
    this.url = url;
    this.main = $(selector);
    //console.log(this.main);
    console.log(this.url)
    this.init();
}
Goods.prototype = {
    constructor: Goods,
    init() {
        this.loading()
            .then(function(res) {
                res = JSON.parse(res);
                console.log(res)

                // this.json = res[0].data.wares;
                this.render(res)
                    //console.log(res);
                    //console.log(this.json);
            }.bind(this));
        $(document).on("scroll", $.proxy(this.is_load, this))

    },
    loading() {

        return ajaxGet(this.url);
    },
    render(res) {
        var list_string = "";
        //console.log(res);
        res.forEach(function(item) {
            //console.log(item);
            list_string += `<li class="goods" id="${item.wareId}">
                        <img src="${item.img}">
                        <div class="good_info">
                            <p class="good_en">${item.slogan}</p>
                            <p class="good_cn">${item.wareName}</p>
                            <p class="price">￥ ${item.price}</p>
                        </div>
                    </li>`

        }.bind(this));
        //console.log(res);
        //console.log(list_string);
        this.main.html(list_string);
        //console.log(this.main);
        this.main.delegate("li", "click", function(res) {
            console.log(this.id);
            var url = "detail.html?id=" + this.id;
            window.location.href = url;
            //console.log(url);
        })
    },
    // is_load() {
    //     // this.loading = false;
    //     this.scrollTop = $("html,body").scrollTop();
    //     this.clientHeight = document.documentElement.clientHeight;
    //     this.lastTop = this.main.find("li").eq(this.main.find("li").length - 1)[0].offsetTop;
    //     console.log(this.lastTop);
    //     this.load = false; //是否符合加载条件;
    //     if (this.scrollTop + this.clientHeight >= this.lastTop) {
    //         this.load = true;
    //     }
    //     // console.log(this.scrollTop,this.clientHeight,this.lastTop)
    //     if (!this.load || this.loading_msg) return 0;

    //     // console.log("加载次数",this.loading,this.loading_msg);
    //     this.loading_msg = true; //是否正在加载数据如果加载数据那么不执行其余代码;
    //     this.loading()
    //         .then(function(res) {
    //             res = JSON.parse(res);
    //             console.log(res)

    //             // this.json = res[0].data.wares;
    //             this.render(res)
    //             this.loading_msg = false;
    //         }.bind(this))

    // }

}
$(document).on("scroll", function() {
        if ($(".slidebar_box").offset().top > $(".wrapper")[0].scrollHeight) {
            $(".slidebar_box").fadeOut();
        } else {
            $(".slidebar_box").fadeIn();
        }
    }

)