/**
 * Created by  on 2015/12/23.
 */

// if touchEvent in Window
var demo = {
    size: [854, 270],
    url: ["demo.jpg", "demo.jpg", "demo.jpg", "demo.jpg"],
    speed: [2000]
};

(function ($) {
    $.fn.alider = function (obj) {
        if (!obj) return;
        //检测是否支持触摸事件
        var strimg = [];
        var strcir = "";
        for (var i = obj.url.length - 1; i >= 0; i--) {
            strimg[i] = '<a><img class="alider-img" src=' + obj.url[i] + ' /></a>';
            strcir += '<li class="alider-circle-dot"></li>';
        }
        //html element ,$.append("<div></div><p></p>")  no[,]
        var $strcir = $(strcir);
        this.append([
            '<div class="alider-screen"></div>',
            '<button class="alider-button-left"></button>',
            '<button class="alider-button-right"></button>',
            '<ul class="alider-circle-papa"></ul>'
        ]);
        var cirpapa = this.find(".alider-circle-papa");
        var imgpapa = this.children(".alider-screen");
        imgpapa.append(strimg).css("margin-left", 0);
        cirpapa.append($strcir);
        $strcir.eq(0).addClass("alider-cir-on");
        this.css("width", obj.size[0]).css("height", obj.size[1]);

        //slider roll
        /*touch left and */
        /*var rollX = 0;
         var tm = null;
         (function (one) {
         one.find(".alider-button-right").on("click", function () {
         rollX++;
         if (rollX > (obj.url.length - 1)) {
         rollX = 0
         }
         slideroll(rollX);
         });
         one.find(".alider-button-left").on("click", function () {
         rollX--;
         if (rollX < 0) {
         rollX = (obj.url.length - 1);
         }
         slideroll(rollX);
         });
         one.find(".alider-circle-dot").on("click", function () {
         rollX = $(this).index();
         slideroll($(this).index());
         })
         })(this);
         function slideroll(rollX) {
         imgpapa.css("margin-left", -rollX * 100 + "%");
         $strcir.removeClass("alider-cir-on");
         $strcir.eq(rollX).addClass("alider-cir-on");
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

         var stop = function () {
         if (tm) {
         clearInterval(tm);
         }
         };
         autoplay(); //init
         this.on("mouseover", stop).on("mouseout", autoplay);*/

        //touchEvent
        //获得向左or向右，表示幻灯向左 or 向右。 X比起始点小，向左。
        var Sdot = {};
        var del = {};
        var end = {};
        var trans = 0;
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
                Sdot = getDot(e);
                console.log("movestart", 1)
            },
            Tmove: function (e) {
                var Mdot = getDot(e);
                del = {
                    X: Mdot.X - Sdot.X,
                    Y: Mdot.Y - Sdot.Y,
                    time: Mdot.time - Sdot.time
                };
                console.log(del.X);
                translate(del.X);
            },
            Tend: function (e) {
                var Edot = getDot(e);
                end = {
                    X: Edot.X - Sdot.X,
                    Y: Edot.Y - Sdot.Y,
                    time: Edot.time - Sdot.time
                };
                if (end.X < 0) {/*点击左按钮事件，trans为一个单位*/
                    trans++;
                    imgpapa.css("transform", "translateX(-" + trans * 100 + "%)")
                        .addClass("movTrans").on("transitionend", function () {
                            $(this).removeClass("movTrans")
                        });
                }
                if (end.X > 0) {/*点击左按钮事件，trans清零*/
                    trans--;
                    imgpapa.css("transform", "translateX(-" + trans * 100 + "%)")
                        .addClass("movTrans").on("transitionend", function () {
                            $(this).removeClass("movTrans")
                        });
                }
            }
        };

        function getDot(e) {
            var dot = {};
            dot.X = e.originalEvent.changedTouches[0].pageX;
            dot.Y = e.originalEvent.changedTouches[0].pageY;
            dot.time = e.originalEvent.timeStamp;
            return dot;
        }

        function translate(delX) {
            console.log(trans, delX, imgpapa.width());
            imgpapa.css("transform", "translateX(" + trans * 100 + Math.abs(delX) / imgpapa.width() + "%)");
        }

        //触摸启动
        if ('ontouchstart' in window || 'ontouchstart' in document.documentElement) {
            this.css("width", '100%').css("height", '100%');
            imgpapa.on("touchstart touchmove touchend", function (e) {
                touchEvent.touch(e)
            })
        }
        /*return this;*/
    };
})(jQuery);



