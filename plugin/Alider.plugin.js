/**
 * Created by Anshi on 2015/12/23.
 */

/*�ֻ�swipe���䣬ԭ�����¼�ѡ��*/
/*3d����Ч�� ��������*/
/*�õƵ��ٶ�ҲҪ��¶�������С�*/
/*��ֹð��*/
var demo = {
    size: [854, 270],
    url: ["demo.jpg", "demo.jpg", "demo.jpg", "demo.jpg"],
    speed: [2000]
};

(function ($) {

    $.fn.alider = function (obj) {
        //���û�и�Ԫ�أ��˳�
        if (obj) return;
        var strimg = [];
        var strcir = "";
        for (var i = obj.url.length - 1; i >= 0; i--) {
            strimg[i] = '<a><img class="aliderAnshi-img" src=' + obj.url[i] + ' /></a>';
            strcir += '<li class="aliderAnshi-circle-dot"></li>';
        }
        /*jq��append���ַ���Ϊ�޿ո��ַ����������ո���ѡ�е��Ǵ�text�Ŀ��ı���㣬like Dom*/
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
        //�õ��߼�
        var rollX = 0;
        var tm = null;
        //����߼�
        (function () {
            //��ͷ���
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
            //ԲȦ���
            $(".aliderAnshi-circle-dot").on("click", function () {
                slideroll($(this).index());
            })
        })(this);
        //slider�����߼�
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

        //ֹͣ�Զ�����
        var stop = function () {
            if (tm) {
                clearInterval(tm);
            }
        };
        autoplay.apply();
        //�������ֹͣ����
        this.on("mouseover", stop).on("mouseout", autoplay);

        //�����ֻ�,touch�¼���
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
                //��¼X��Y,��ʱ���
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
 //���һ������div����ʹ�ã�ͼƬ������Ӧ��С�ġ���ť�Ĵ�С����ԲȦ��λ�ÿ��Ե�����
 //��ʹ��jq�����ٿ������...��ô��= =��������������

 //htmlԪ������
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

 //�õ��߼�
 var rollX = 0;
 var tm = 0;
 //��ʼ����Ĭ��չʾ��һ�ţ�
 (function init() {
 $(".aliderAnshi-circle-papa").eq(0).addClass("aliderAnshi-cir-on");
 $(".aliderAnshi-screen").css("margin-left", 0);
 console.log($(".aliderAnshi-img").width());
 $(".aliderAnshi-wrap").css("width", 854);
 $(".aliderAnshi-wrap").css("height", 270);
 })();
 //����߼�
 (function click() {
 //��ͷ���
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
 //ԲȦ���
 $(".aliderAnshi-circle-dot").on("click", function () {
 console.log($(this).index());
 slideroll($(this).index());
 })
 })();
 //slider�����߼�
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

 //ֹͣ�Զ�����
 var stop = function () {
 if (tm) {
 clearInterval(tm);
 }
 };
 autoplay();
 //�������ֹͣ����
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


