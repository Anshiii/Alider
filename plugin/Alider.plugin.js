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
        var rollX = 0;
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
        autoplay();
        this.on("mouseover", stop).on("mouseout", autoplay);
    };
})(jQuery);



