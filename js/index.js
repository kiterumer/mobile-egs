(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=640){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    recalc();
})(document, window);


var innerGroup = $(".innerwraper");
var spanGroup = $(".pagination span");
var imgWidth = $(".innerwraper img:first-child").eq(0).width();
var _index = 0;
var timer = null;

// 小圆点绑定点击事件
spanGroup.on("click", function() {
    //获取小圆点的在数组中的下标值，赋值给_index储存，从0开始
    _index = spanGroup.index($(this));
    selectPic(_index);
    clearInterval(timer);
})

function selectPic(num) {
    clearInterval(timer);
    // 让被点击的小圆点背景色变白
    $(".pagination span").eq(num).addClass("active").siblings().removeClass("active");
    if( num%4 == 0){
        // _index变为4时，进入if语句，将第一个小圆点设为激活，背景色变为白色
        $(".pagination span").eq(0).addClass("active").siblings().removeClass("active");
    }

    // 图片动画，位置相对于屏幕左边缘变化
    $(".inner").stop().animate({
        left: -num * imgWidth,
    }, 1000, function() {
        // 点击切换图片效果结束后，要开始自动播放了，以3秒为间隔
        timer = setInterval(go, 3000);
        //自动播放检查是否到最后一张
        if (_index == innerGroup.length-1) {
            // 最后一张图片时，让_index设为0，4%4结果为0
            _index %= 4;   //_index= _index % 4 
            $(".inner").css("left", "0px");
        }
    })
}
// 自动播放
(function autoGo(){
    //每3秒后，执行go函数
    timer = setInterval(go, 3000);
})()

//计时器的函数
function go() {
    //_index初始值位0，然后加一，1,2,3,4,然后又变为0，这样周而复始
    _index++;
    selectPic(_index);
}

