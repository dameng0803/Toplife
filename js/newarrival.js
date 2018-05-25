$(function() {
    var data1 = new Data1("./libs/dd.json", ".newarrival_mask");
})

function Data1(url, selector) {
    this.url = url;
    //console.log(this.url);
    this.main = $(selector);
    this.init();
};
Data1.prototype = {
    constructor: Data1,
    init() {
        this.loading()
            .then(function(res) {
                res = JSON.parse(res);
                console.log(res);
                this.render(res);
            }.bind(this))
            .catch(function() {
                this.load_error();
            }.bind(this));
    },
    loading() {
        return ajaxGet(this.url);
    },
    render(res) {
        var boxList = "";
        var i = 1;
        console.log(res);
        res.forEach(function(item) {
            boxString = `<div class="new${i} wow rollIn">
                                <img src="${item.img}" alt="">
                                <div class="text1">
                                    <p>${item.wareName}</p>
                                    <p>${item.slogan}</p>
                                    <span>￥${item.price}</span>
                                </div>
                        </div>`
            i++;
            boxList += boxString;
            //console.log(boxList);
        });

        this.main.html(boxList);

        //console.log(this.main)
    },
    load_error() {
        alert("加载出错");
    }


}