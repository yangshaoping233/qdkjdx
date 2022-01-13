var app = {

    init: function () {
        //导航切换
        if ($(window).width() <= 1200) {
            //移动端--显示菜单
            $('.head-box .menu').click(function () {
                $('.head-box .nav').show(0);
                $('.head-box .nav .mask').stop(false).animate({ right: 0 }, 300);
            })
            //移动端--隐藏菜单
            $('.head-box .nav,.head-box .nav .mask>a').click(function () {
                $('.head-box .nav .mask').stop(false).animate({ right: -200 }, 300);
                setTimeout(function () {
                    $('.head-box .nav').hide(0);
                }, 300);
            })
           
            //二级导航
            $('.nav2 dl dt').click(function () {
                $(this).parents('dl').find('dd').stop(false).slideToggle(300)
            })
            //显示搜索框
            $('.head-box .sea-box').click(function () {
                $('.head-box .seach').fadeIn(300);
            })
            //单击空白 隐藏搜索框
            $(document).bind("click", function (e) {
                var target = $(e.target);
                if (target.closest('.head-box .seach,.head-box .sea-box').length == 0) {
                    $('.head-box .seach').fadeOut(300);
                    //隐藏搜索框时清空搜索框
                    //$('.head-box .seach input').val('');
                }
            });
        } else {
            //PC端导航切换
            $('.head-box .nav a').click(function () {
                $(this).addClass('active').siblings().removeClass('active');
            })
            //二级导航
            $('.nav2 dl').hover(function () {
                $(this).find('dd').stop(false).slideDown(300)
            }, function () {
                $(this).find('dd').stop(false).slideUp(300)
            })
        }
         //搜索事件
         $('.head-box .seach span').click(function () {
            var text = $('.head-box .seach input').val();
            console.log(text);
        })
        //右侧悬浮窗导航
      
  $('.side-nav ul li:not(".back-top")').click(function () {
            var index = $(this).index();
            var scrolltop = $('.main-box .module').eq(index).offset().top;
            $('html,body').stop(false).animate({ scrollTop: scrolltop - 120 }, 300);
        })

        //滚动事件
        $(window).scroll(function () {
            var top = $(this).scrollTop();
            app.addAnimate(top)
            //匹配选中
           /* $('.main-box .module').each(function (i) {
                var h = $(this).offset().top - 120;
                if (top >= h) {
                    $('.side-nav ul li').eq(i).addClass('active').siblings().removeClass('active');
                }
            })*/
        })
        //回顶部
     $('.side-nav .back-top').click(function () {
            $('html,body').stop(false).animate({ scrollTop: 0 }, 300);
        })

        //二维码
        $(".foot-box .href-box img").click(function(){
            var code=$(this).attr('data-code');
            if(code){
                var url=code;
                var html="<div class='code-box'><img src='"+url+"'></div>";
                $('body').append(html)
            }
        })
        $(document).on('click','.code-box',function(){
            $('.code-box').remove();
        })
    },
  
    addAnimate: function (top) {
        //侧栏隐藏与显示
        if (top >=100) {
            if (!$('.side-nav').hasClass('show')) $('.side-nav').addClass('show');
        } else {
            if ($('.side-nav').hasClass('show')) $('.side-nav').removeClass('show');
        }

        //导航黑色透明度
        var opacity = 0.2 + 0.001 * top;
        if (opacity >= 0.7) opacity = 0.7
        $('.head-box').css({
            'background-color': 'rgba(0,0,0,' + opacity + ')'
        })
        //动画元素出现在视窗内增加动画
   
            $('.main-box .animated').each(function (i) {
                var el = $('.main-box .animated').eq(i);
                var elTop = el.offset().top + 100;
                var winH = $(window).height();
                if (top + winH >= elTop) {
                    el.addClass(el.attr('data-animated'))
                } else {
                    el.removeClass('fadeLeft fadeTop fadeRight fadeBottom')
                }
            })
        
    },
}
app.init();
app.addAnimate($(window).scrollTop());

// 判断浏览器版本过低提示
(function(window) {
    var theUA = window.navigator.userAgent.toLowerCase();
    if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
        var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
        if (ieVersion < 9) {
            var str = "本站不再支持您的浏览器，360、sogou等浏览器请切换到<strong>极速模式</strong>，<br>或升级您的浏览器到 <a href='http://browsehappy.osfipin.com/' target='_blank' style='text-decoration:underline'>更高的版本</a>！以获得更好的观看效果。";
            document.writeln("<pre class='ie8'>" + 
            "<p style='padding-top:200px;margin:0'>" + str + "</p></pre>");
            document.execCommand("Stop");
        };
    }
})(window);