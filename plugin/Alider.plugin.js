/**
 * Created by Anshi on 2015/12/23.
 */

/*手机swipe适配，原点点击事件选择*/
/*3d酷炫效果 哈哈哈哈*/
/*幻灯的速度也要暴露出来才行。*/
/*阻止冒泡*/
var demo = {
    size: [854, 270],
    url: ["demo.jpg", "demo.jpg", "demo.jpg", "demo.jpg"],
    speed: [2000]
};

(function ($) {

    $.fn.alider = function (obj) {
        //如果没有根元素，退出
        if (obj) return;
        var strimg = [];
        var strcir = "";
        for (var i = obj.url.length - 1; i >= 0; i--) {
            strimg[i] = '<a><img class="aliderAnshi-img" src=' + obj.url[i] + ' /></a>';
            strcir += '<li class="aliderAnshi-circle-dot"></li>';
        }
        /*jq中append的字符串为无空格长字符串，若带空格则选中的是带text的空文本借点，like Dom*/
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
        this.css("width", obj.size[0]).css("height", obj.size[1]);
        //幻灯逻辑
        var rollX = 0;
        var tm = null;
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
            }, obj.speed);
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

        //适配手机,touch事件。
        var Sdot = {};
        var del = {};
        var touchEvent = {
            touch: function (e) {
                e.preventDefault();
                switch (e.originalEvent.type) {
                    case "touchstart":
                        Tstart(e);
                        break;
                    case "touchmove":
                        Tmove(e);
                        break;
                    case "touchend":
                        Tend(e);
                        break;
                }
            },
            dot: {start: [x, y]},
            Tstart: function (e) {
                //记录X和Y,和时间戳
                Sdot = {
                    X: e.originalEvent.changedTouches[0].pageX,
                    Y: e.originalEvent.changedTouches[0].pageY,
                    time: e.originalEvent.timeStamp
                };
            },
            Tmove: function (e) {
                var Smove = {
                    X: e.originalEvent.changedTouches[0].pageX,
                    Y: e.originalEvent.changedTouches[0].pageY,
                    time: e.originalEvent.timeStamp
                };
                del = {
                    X: Smove.X - Sdot.X,
                    Y: Smove.Y - Sdot.Y,
                    time: Smove.time - Sdot.time
                };
                translate(del.X,del.Y,dre)
            },
            Tend: function () {

            }
        };

        function translate (delX,delY,dre){

        }
        /*return this;*/
    };
})(jQuery);
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


