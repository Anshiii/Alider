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

        //检测终端
        /*function browserRedirect() {
         var sUserAgent = navigator.userAgent.toLowerCase();
         var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
         var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
         var bIsMidp = sUserAgent.match(/midp/i) == "midp";
         var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
         var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
         var bIsAndroid = sUserAgent.match(/android/i) == "android";
         var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
         var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
         }*/

        //如果没有根元素，退出
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


        //pc 幻灯逻辑
        /*       var rollX = 0;
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
         */
        //适配手机,touch事件。
        var Sdot = {};
        var del = {};
        var end = {};
        var touchEvent = {
            touch: function (e) {
                e.preventDefault();
                switch (e.originalEvent.type) {
                    case "touchstart":
                        this.Tstart(e);
                        break;
                    case "touchmove":
                        this.Tmove(e);
                        break;
                    case "touchend":
                        this.Tend(e);
                        break;
                }
            },
            Tstart: function (e) {
                //记录X和Y,和时间戳
                Sdot = getDot(e);
                console.log("movestart",1)
            },
            Tmove: function (e) {
                var Mdot = getDot(e);
                del = {
                    X: Mdot.X - Sdot.X,
                    Y: Mdot.Y - Sdot.Y,
                    time: Mdot.time - Sdot.time
                };
                translate(del.X);
                console.log(+new Date,2)

            },
            Tend: function (e) {
                var Edot = getDot(e);
                end = {
                    X: Edot.X - Sdot.X,
                    Y: Edot.Y - Sdot.Y,
                    time: Edot.time - Sdot.time
                };
                console.log("moveEnd",3)
            }
        };

        function getDot(e) {
            var dot = {};
            dot.X = e.originalEvent.changedTouches[0].pageX;
            dot.Y = e.originalEvent.changedTouches[0].pageY;
            dot.time = e.originalEvent.timeStamp;
            return dot;
        }

        function translate(delX, delY, dre) {
            imgpapa.css("transform", "translateX(" + delX + "px)");
            console.log(+new Date,1)
        }

        imgpapa.on("touchstart touchmove touchend", function (e) {
            touchEvent.touch(e)
        });

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


