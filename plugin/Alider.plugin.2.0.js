/**
 * Created by  on 2015/12/23.
 */

// if touchEvent in Window
var demo = {
    size: [854, 270],
    url: ["demo_1.jpg", "demo_2.jpg", "demo_2.jpg", "demo_4.jpg"],
    speed: [2000]
};

(function ($) {
    $.fn.alider = function (obj) {
        if (!obj) return;
        //检测是否支持触摸事件
        var strimg = [];
        var strcir = "";
        var that = this;

        //父级元素生成。
        that.append([
            '<div class="alider-screen"></div>',
            '<button class="alider-button-left"></button>',
            '<button class="alider-button-right"></button>',
            '<ul class="alider-circle-papa"></ul>'
        ]);
        var cirpapa = that.find(".alider-circle-papa");
        var imgpapa = that.children(".alider-screen");
        for (var i = obj.url.length - 1; i >= 0; i--) {
            strimg[i] = '<a class="alider-a"><img class="alider-img" src=' + obj.url[i] + ' /></a>';
            strcir += '<li class="alider-circle-dot"></li>';
        }
        var $strcir = $(strcir);
  /*      var that.find(".alider-a") = that.find(".alider-a");*/
        //html element ,$.append("<div></div><p></p>")  no[,]
        imgpapa.append(strimg);
        cirpapa.append($strcir);

        //触摸启动
        if ('ontouchstart' in window || 'ontouchstart' in document.documentElement) {
            that.css("width", '100%');
            that.find(".alider-a").css('width', that.width() + "px");
            console.log(that.find(".alider-a"));//????
            imgpapa.on("touchstart touchmove touchend", function (e) {
                touchEvent.touch(e)
            })
        } else {
            that.css("width", obj.size[0]).css("height", obj.size[1]);
        }
        console.log(that.width() + "px");
        imgpapa.css("width", that.width() * obj.url.length + "px").css("height",that.height()+"px");
        console.log(imgpapa.width());

        function threeShow(num) {
            //num表示当前显示幻灯的下标数。
            /*if (num < 0 || num >= that.find(".alider-a").length) return;*/
            const lastrans = 300;
            console.log(that.find(".alider-a"));
            imgpapa.children().hide();
            that.find(".alider-a").eq(num).show();
            $strcir.removeClass("alider-cir-on");
            $strcir.eq(num).addClass("alider-cir-on");
            if (num === that.find(".alider-a").length - 1) {
                that.find(".alider-a").eq(num - 1).show();
                that.find(".alider-a").eq(0).show().css("transform", "translateX(" + lastrans + "%)");
                imgpapa.css("left", -that.width() * 2 + "px");
            } else if (num === 0) {
                that.find(".alider-a").eq(num + 1).show();
                that.find(".alider-a").eq(that.find(".alider-a").length - 1).show().css("transform", "translateX(-" + lastrans + "%)");
            } else {
                that.find(".alider-a").eq(num + 1).show();
                that.find(".alider-a").eq(num - 1).show();
                imgpapa.css("left", -that.width() + "px");
            }
        }

        //@@@init
        threeShow(2);

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
                /*if (end.X < 0) {/!*点击左按钮事件，trans为一个单位*!/
                 trans++;
                 imgpapa.css("transform", "translateX(-" + trans * 100 + "%)")
                 .addClass("movTrans").on("transitionend", function () {
                 $(this).removeClass("movTrans")
                 });
                 }
                 if (end.X > 0) {/!*点击左按钮事件，trans清零*!/
                 trans--;
                 imgpapa.css("transform", "translateX(-" + trans * 100 + "%)")
                 .addClass("movTrans").on("transitionend", function () {
                 $(this).removeClass("movTrans")
                 });
                 }*/
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


        /*return this;*/
    };
})(jQuery);



