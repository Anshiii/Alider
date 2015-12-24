/**
 * Created by Anshi on 2015/12/23.
 */
var demo = {

    url: ["demo.jpg", "demo.jpg", "demo.jpg", "demo.jpg"]
};

/*(function($){*/

$.fn.alider = function (obj) {
    var strimg = [];
    var strcir = "";
    for (var i = obj.url.length - 1; i >= 0; i--) {
        strimg[i] = '<a><img class="aliderAnshi-img" src=' + obj.url[i] + ' /></a>';
        strcir += '<li class="aliderAnshi-circle-dot"></li>';
    }
    console.log(strcir, 1); //长字符串（无逗号
    console.log($(strcir), 11); //多个节点
    console.log(strimg, 2); //数组
    console.log($(strimg), 22); //jq数组对象
    console.log($('<p></p>,<p></p>'), 22); //带逗号的字符串

    var $strcir = $(strcir);

    this.append([
        '<div class="aliderAnshi-screen"></div>',
        '<button class="aliderAnshi-button-left"></button>',
        '<button class="aliderAnshi-button-right"></button>',
        '<ul class="aliderAnshi-circle-papa"></ul>'
    ]);
    var cirpapa = this.find(".aliderAnshi-circle-papa");
    var imgpapa = this.children(".aliderAnshi-screen");
    imgpapa.append(strimg).css("margin-left", 0);
    cirpapa.append($strcir);
    $strcir.eq(0).addClass("aliderAnshi-cir-on");
    this.css("width", 854).css("height", 270);
    //幻灯逻辑
    var rollX = 0;
    var tm = 0;
    //点击逻辑
    (function () {
        //箭头点击
        $(".aliderAnshi-button-right").on("click", function () {
            rollX++;
            if (rollX > (obj.url.length - 1)) {
                rollX = 0
            }
            slideroll(rollX);
        });
        $(".aliderAnshi-button-left").on("click", function () {
            rollX--;
            if (rollX < 0) {
                rollX = (obj.url.length - 1);
            }
            slideroll(rollX);
        });
        //圆圈点击
        $(".aliderAnshi-circle-dot").on("click", function () {
            slideroll($(this).index());
        })
    })(this);
    //slider滚动逻辑
    function slideroll(rollX) {
        imgpapa.css("margin-left", -rollX * 100 + "%");
        $strcir.removeClass("aliderAnshi-cir-on");
        $strcir.eq(rollX).addClass("aliderAnshi-cir-on");
    }

    function autoplay() {
        tm = setInterval(function () {
            rollX++;
            if (rollX > (obj.url.length - 1)) {
                rollX = 0
            }
            slideroll(rollX);
        }, 2000);
    }

    //停止自动播放
    var stop = function () {
        if (tm) {
            clearInterval(tm);
        }
    };
    autoplay.apply();
    //鼠标悬浮停止播放
    this.on("mouseover", stop).on("mouseout", autoplay);
    return this;
};
/*})(jQuery);*/
/*var alider = function (obj) {
 //obj = {num:6,url:[1,2,3,4,5,6]
 //添加一个父级div就能使用，图片是自适应大小的。按钮的大小，和圆圈的位置可以调整。
 //先使用jq，后再考虑摒除...怎么用= =啊哈哈哈。。。

 //html元素生成
 var strimg = [];
 var strcir = [];
 var cirpapa = $(".aliderAnshi-circle-papa");
 for (var i = obj.url.length - 1; i >= 0; i--) {
 strimg[i] = '<a><img class="aliderAnshi-img" src=' + obj.url[i] + ' /></a>';
 strcir[i] = '<li class="aliderAnshi-circle-dot"></li>';
 }

 $(".aliderAnshi-wrap").append([
 '<div class="aliderAnshi-screen"></div>',
 '<button class="aliderAnshi-button-left"></button>',
 '<button class="aliderAnshi-button-right"></button>',
 '<ul class="aliderAnshi-circle-papa"></ul>'
 ]);
 $(".aliderAnshi-screen").append(strimg);
 $(".aliderAnshi-circle-papa").append(strcir);

 //幻灯逻辑
 var rollX = 0;
 var tm = 0;
 //初始化（默认展示第一张）
 (function init() {
 $(".aliderAnshi-circle-papa").eq(0).addClass("aliderAnshi-cir-on");
 $(".aliderAnshi-screen").css("margin-left", 0);
 console.log($(".aliderAnshi-img").width());
 $(".aliderAnshi-wrap").css("width", 854);
 $(".aliderAnshi-wrap").css("height", 270);
 })();
 //点击逻辑
 (function click() {
 //箭头点击
 $(".aliderAnshi-button-right").on("click", function () {
 rollX++;
 if (rollX > (obj.url.length - 1)) {
 rollX = 0
 }
 slideroll(rollX);
 });
 $(".aliderAnshi-button-left").on("click", function () {
 rollX--;
 if (rollX < 0) {
 rollX = (obj.url.length - 1);
 }
 slideroll(rollX);
 });
 //圆圈点击
 $(".aliderAnshi-circle-dot").on("click", function () {
 console.log($(this).index());
 slideroll($(this).index());
 })
 })();
 //slider滚动逻辑
 function slideroll(rollX) {
 $(".aliderAnshi-screen").css("margin-left", -rollX * 100 + "%");
 $(".aliderAnshi-circle-papa").children().removeClass("aliderAnshi-cir-on");
 $(".aliderAnshi-circle-papa").eq(rollX).addClass("aliderAnshi-cir-on");
 }

 function autoplay() {
 tm = setInterval(function () {
 rollX++;
 if (rollX > (obj.url.length - 1)) {
 rollX = 0
 }
 slideroll(rollX);
 },2000);
 }

 //停止自动播放
 var stop = function () {
 if (tm) {
 clearInterval(tm);
 }
 };
 autoplay();
 //鼠标悬浮停止播放
 $(".aliderAnshi-wrap").on("mouseover", stop).on("mouseout", autoplay);
 };*/


/*jQuery.fn.extend( {
 css: function( name, value ) {
 return access( this, function( elem, name, value ) {
 var styles, len,
 map = {},
 i = 0;

 if ( jQuery.isArray( name ) ) {
 styles = getStyles( elem );
 len = name.length;

 for ( ; i < len; i++ ) {
 map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
 }

 return map;
 }

 return value !== undefined ?
 jQuery.style( elem, name, value ) :
 jQuery.css( elem, name );
 }, name, value, arguments.length > 1 );
 }
 } );*/


