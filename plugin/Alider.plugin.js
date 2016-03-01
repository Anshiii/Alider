/**
 * Created by  on 2015/12/23.
 */

// if touchEvent in Window
var demo = {
    size: [854, 270, true],//natural尺寸，是否固定
    url: ["demo.jpg", "demo.jpg", "demo.jpg", "demo.jpg"],
    speed: [2000],

};

(function ($) {
    $.fn.alider = function (obj) {
        if (!obj) return;
        var that = this;

        //@Q1真奇怪啊..that.css("width", obj.size[0]).css("height", obj.size[1])不写在if语句
        //cir就不生效。。。


        var strimg = [];
        var strcir = "";
        for (var i = obj.url.length - 1; i >= 0; i--) {
            strimg[i] = '<a><img class="alider-img" src=' + obj.url[i] + ' /></a>';
            strcir += '<li class="alider-circle-dot"></li>';
        }
        //html element ,$.append("<div></div><p></p>")  no[,]
        var $strcir = $(strcir);
        that.append([
            '<div class="alider-screen"></div>',
            '<button class="alider-button-left"></button>',
            '<button class="alider-button-right"></button>',
            '<ul class="alider-circle-papa"></ul>'
        ]);
        var cirpapa = that.find(".alider-circle-papa");
        var imgpapa = that.children(".alider-screen");

        if (obj.size[2] === true) {
            that.css("width", obj.size[0]).css("height", obj.size[1]);
        } else {
            that.css("width", '100%');
            imgpapa.on("touchstart touchmove touchend", function (e) {
                touchEvent.touch(e)
            });
        }

        imgpapa.append(strimg).css("transform", "translateX(" + 0 + "%)");
        cirpapa.append($strcir);
        $strcir.eq(0).addClass("alider-cir-on");


        //slider roll in pc
        var rollX = 0;
        var tm = null;
        (function () {
            that.find(".alider-button-right").on("click", function () {
                rollX++;
                if (rollX > (obj.url.length - 1)) {
                    rollX = 0
                }
                slideroll(rollX);
            });
            that.find(".alider-button-left").on("click", function () {
                rollX--;
                if (rollX < 0) {
                    rollX = (obj.url.length - 1);
                }
                slideroll(rollX);
            });
            that.find(".alider-circle-dot").on("click", function () {
                rollX = that.index();
                slideroll(rollX);
            })
        })();

        function slideroll(rollX) {
            //@q这里用margin-left做会有虚化？？trans好像也有虚化呵呵@q用100%滑动起来不那么精准
            imgpapa.css("transform", "translateX(-" + rollX * 100 + "%)").addClass("transition")
                .on("transitionend", function () {
                    imgpapa.removeClass("transition")
                });//-放在引号右边无效
            $strcir.removeClass("alider-cir-on");
            $strcir.eq(rollX).addClass("alider-cir-on");
            /* console.log(imgpapa[0].style.transform);//用正则获取
             console.log(parseFloat(imgpapa[0].getAttribute("style")));//用正则获取
             console.log(window.getComputedStyle(imgpapa[0]).transform);
             console.log(imgpapa.css("webkit-transform"));*/
            //@q2 css能拿到，attr不行。属性其实只是style?...
        }

        //pc done

        //mb
        var dot = [];
        var SD = {};
        var ND = {};
        var del = {};
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
                SD = getDot(e);
                dot[0] = SD;
                console.log("movestart", 1)
            },
            Tmove: function (e) {
                ND = getDot(e);
                dot[1] = ND;
                console.log(dot);
                del = {
                    X: dot[1].X - dot[0].X,
                    Y: dot[1].Y - dot[0].Y
                    /*time: Mdot.time - Sdot.time*/
                };
                dot[0] = dot[1];
                translate(del.X);
            },
            Tend: function (e) {
                var ED = getDot(e);
                var end = {
                    X: ED.X - SD.X,
                    Y: ED.Y - SD.Y,
                    time: ED.time - SD.time
                };
                console.log(end.X / end.time);
                if (end.X / end.time > 0.7) {
                    rollX--;
                    if (rollX < 0) {
                        rollX = (obj.url.length - 1);
                    }
                    slideroll(rollX);
                } else if (end.X / end.time < -0.5) {
                    rollX++;
                    if (rollX > (obj.url.length - 1)) {
                        rollX = 0
                    }
                    slideroll(rollX);
                } else if (3 * Math.abs(end.X) > imgpapa.width()) {
                    if (end.X < 0) {
                        rollX++;
                        if (rollX > (obj.url.length - 1)) {
                            rollX = 0
                        }
                        slideroll(rollX);
                    }
                    if (end.X > 0) {
                        rollX--;
                        if (rollX < 0) {
                            rollX = (obj.url.length - 1);
                        }
                        slideroll(rollX);
                    }
                } else {
                    slideroll(rollX);
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
            console.log(imgpapa[0].style.transform);
            var nowTrans = parseFloat(imgpapa[0].style.transform.slice(11, -2));//@大问题，不同浏览器返回的值是不是不一样
            //console.log(parseInt(imgpapa[0].style.transform.slice(transNumIdx, -2)));
            //console.log(Math.abs(delX), "del", imgpapa.width(), "width", Math.round(Math.abs(delX) * 100 / imgpapa.width()), "%");
            imgpapa.css("transform", "translateX(" + Math.round(nowTrans + (delX) * 100 / imgpapa.width()) + "%)");
            console.log(imgpapa[0].style.transform, "nowtrans");
            console.log((delX) * 100 / imgpapa.width());
        }

        //mb done

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
        autoplay();
        that.on("mouseover", stop).on("mouseout", autoplay);
        that.on("touchstart", stop).on("touchend", autoplay);
    };
})
(jQuery);



