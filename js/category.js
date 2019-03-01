(function (window) {
    // 初始化fastclick这个插件
    FastClick.attach(document.body);

    
    // 初始化左侧分类 swiper滑动
    var swiper1 = new Swiper('.category-left .swiper-container', {
        // 垂直滑动是垂直方向
        direction: 'vertical',
        // 一定要这个参数 是这个参数才支持内容并排在一起滑动
        slidesPerView: 'auto',
        // 为了添加惯性 用力滑一次性滑动距离很长
        freeMode: true,
        // scrollbar: {
        //     el: '.swiper-scrollbar',
        // },
        // 是否支持鼠标滚轮 意义不大手机没鼠标滚轮
        mousewheel: true,
    });
    // 初始化左侧分类 swiper滑动
    var swiper2 = new Swiper('.category-right .swiper-container', {
        // 垂直滑动是垂直方向
        direction: 'vertical',
        // 一定要这个参数 是这个参数才支持内容并排在一起滑动
        slidesPerView: 'auto',
        // 为了添加惯性 用力滑一次性滑动距离很长
        freeMode: true,
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        // 是否支持鼠标滚轮 意义不大手机没鼠标滚轮
        mousewheel: true,
    });
    var parentHeight = document.querySelector('.swiper-container').offsetHeight;
    var childrenHeight = document.querySelector('.swiper-slide').offsetHeight;
    var swiperWrapper = document.querySelector('.swiper-wrapper');
    /* 3. 分类页面的点击吸顶功能
        1. 让所有li能够点击
        2. 计算当前点击li要位移的距离 -li的索引*li的高度
        3. 给左侧swiper-wrapper元素设置这个位移 使用3d位移 transform: translate3d(0px, 0px, 0px);
        4. 还得判断如果位移的距离超过了最小的位移的距离(父元素高度-子元素高度) 固定为最小位移的距离 */
    var li = document.querySelectorAll('.category-left ul li');
    for (var i = 0; i < li.length; i++) {
        // 利用闭包把循环i保存了起来
        (function (index) { // i这个i是一个新的参数
            // 1. 给所有li添加点击事件
            li[i].addEventListener('click', function () {
                // 2. 通过索引计算位移距离 index*高度
                var translateY = -index * this.offsetHeight;
                console.log(translateY);
                // 3. 判断这个值是否超过最小位移距离
                var minTranslateY = parentHeight - childrenHeight;
                console.log(minTranslateY);
                // 4. 判断如果计算位移小于最小位移值 就使用最小位移值
                if (translateY < minTranslateY) {
                    translateY = minTranslateY;
                }
                // 5. 最后把这个位移赋值给滑动容器
                swiperWrapper.style.transform = 'translate3d(0,' + translateY + 'px,0)';
                // 5.1 如果需要慢慢位移添加过渡效果
                swiperWrapper.style.transition = 'all 0.3s';
                // 6. 切换类名
                // 6.1. 遍历所有li删掉所有active
                for (var j = 0; j < li.length; j++) {
                    li[j].classList.remove('active');
                }
                // 6.2. 给当前点击li添加active
                this.classList.add('active');
            })
        })(i);
    }
    console.log('循环已经结束' + i);
})(window)