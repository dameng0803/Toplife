$(function() {
    var recommend_goods = new recommend_Goods("./libs/recommend.json", ".clearfix")
})

function recommend_Goods(url, selector) {
    this.url = url;
    this.main = $(selector);
    this.init();
}
recommend_Goods.prototype = {
    constructor: recommend_Goods,
    init() {
        this.loading()
            .then(function(res) {
                res = JSON.parse(res);
                // console.log(res);
                this.render(res)
            }.bind(this));

    },
    loading() {
        return ajaxGet(this.url);
    },
    render(res) {
        var recommend_list = "";
        //console.log(res);
        res.forEach(function(item) {
            recommend_list += `<div class="recommend_list">
                                    <img src="${item.img}" alt="">
                                    <p class="recommend_brand">ALANCHAN CREATIONS</p>
                                    <p class="recommend_name">${item.wareName}</p>
                                    <p class="recommend_price">￥ <span>${item.price}</span></p>
                                </div>`
        }.bind(this));
        //console.log(recommend_list);
        this.main.html(recommend_list);
    }
}