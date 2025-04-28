//搜索框
eval(function (e, t, a, c, i, n) {
    if (i = function (e) {
        return (e < t ? "" : i(parseInt(e / t))) + (35 < (e %= t) ? String.fromCharCode(e + 29) : e.toString(
            36))
        }, !"".replace(/^/, String)) {
        for (; a--;) n[i(a)] = c[a] || i(a);
        c = [function (e) {
        return n[e]
        }], i = function () {
        return "\\w+"
        }, a = 1
    }
    for (; a--;) c[a] && (e = e.replace(new RegExp("\\b" + i(a) + "\\b", "g"), c[a]));
    return e
    }('!2(){2 g(){h(),i(),j(),k()}2 h(){d.9=s()}2 i(){z a=4.8(\'A[B="7"][5="\'+p()+\'"]\');a&&(a.9=!0,l(a))}2 j(){v(u())}2 k(){w(t())}2 l(a){P(z b=0;b<e.O;b++)e[b].I.1c("s-M");a.F.F.F.I.V("s-M")}2 m(a,b){E.H.S("L"+a,b)}2 n(a){6 E.H.Y("L"+a)}2 o(a){f=a.3,v(u()),w(a.3.5),m("7",a.3.5),c.K(),l(a.3)}2 p(){z b=n("7");6 b||a[0].5}2 q(a){m("J",a.3.9?1:-1),x(a.3.9)}2 r(a){6 a.11(),""==c.5?(c.K(),!1):(w(t()+c.5),x(s()),s()?E.U(b.G,+T X):13.Z=b.G,10 0)}2 s(){z a=n("J");6 a?1==a:!0}2 t(){6 4.8(\'A[B="7"]:9\').5}2 u(){6 4.8(\'A[B="7"]:9\').W("14-N")}2 v(a){c.1e("N",a)}2 w(a){b.G=a}2 x(a){a?b.3="1a":b.16("3")}z y,a=4.R(\'A[B="7"]\'),b=4.8("#18-C-19"),c=4.8("#C-12"),d=4.8("#17-C-15"),e=4.R(".C-1b"),f=a[0];P(g(),y=0;y<a.O;y++)a[y].D("Q",o);d.D("Q",q),b.D("1d",r)}();',
    62, 77,
    "||function|target|document|value|return|type|querySelector|checked||||||||||||||||||||||||||var|input|name|search|addEventListener|window|parentNode|action|localStorage|classList|newWindow|focus|superSearch|current|placeholder|length|for|change|querySelectorAll|setItem|new|open|add|getAttribute|Date|getItem|href|void|preventDefault|text|location|data|blank|removeAttribute|set|super|fm|_blank|group|remove|submit|setAttribute"
    .split("|"), 0, {})
);

//回到顶部
$(window).scroll(function () {
    if ($(this).scrollTop() >= 50) {
        $('#topup').fadeIn(200);
        $('.sidebar-menu').addClass('bgchange');
    } else {
        $('#topup').fadeOut(200);
        $('.sidebar-menu').removeClass('bgchange');
    }
});
$('a[rel="go-top"]').click(function () {
    window.scrollTo(0,0)
}); 

//鼠标样式
const body = document.querySelector("body");
const element = document.getElementById("pointer");
const halfElementWidth = element.offsetWidth / 2;

function setPosition(x, y) {
    element.style.transform = `translate(${x - halfElementWidth + 19}px, ${y - halfElementWidth + 19}px)`;
}

// 监听鼠标移动，更新指针位置
body.addEventListener("mousemove", (e) => {
    window.requestAnimationFrame(() => setPosition(e.clientX, e.clientY));
});

//非桌面端去除鼠标样式
if (/Mobi|Tablet|iPad|iPhone|Android/i.test(navigator.userAgent)) {
    $('#pointer').css("display", "none");
}

//夜间模式切换
function dark() {
    document.body.classList.add('night');
    document.cookie = "night=1;path=/";
    document.getElementById("suspension_text").innerHTML = "切换日间模式";
    iziToast.info({
        timeout: 2000,
        icon: 'tabler-icons',
        closeOnEscape: 'true',
        transitionOut: 'fadeOutRight',
        displayMode: 'replace',
        layout: '2',
        transitionIn: 'bounceInLeft',
        position: 'topRight',
        icon: 'ti ti-moon-filled',
        backgroundColor: '#fff',
        title: '夜间模式切换',
        message: '已切换为夜间模式'
    });
}

function light() {
    document.body.classList.remove('night');
    document.cookie = "night=0;path=/";
    document.getElementById("suspension_text").innerHTML = "切换夜间模式";
    iziToast.info({
        timeout: 2000,
        icon: 'tabler-icons',
        closeOnEscape: 'true',
        transitionOut: 'fadeOutRight',
        displayMode: 'replace',
        layout: '2',
        transitionIn: 'bounceInLeft',
        position: 'topRight',
        icon: 'ti ti-sun-filled',
        backgroundColor: '#fff',
        title: '日间模式切换',
        message: '已切换为日间模式'
    });
}

function switchNightMode() {
    var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
    if (night == '0') {
        dark();
    } else {
        light();
    }
}

window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', event => {
        if (event.matches) {
            dark();
        } else {
            light();
        }
    });
    
(function () {
    if (document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") === '') {
        if (new Date().getHours() > 18 || new Date().getHours() < 7) {
        document.body.classList.add('night');
        document.cookie = "night=1;path=/";
        } else {
        document.body.classList.remove('night');
        document.cookie = "night=0;path=/";
        }
    } else {
        var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
        if (night == '0') {
        document.body.classList.remove('night');
        } else if (night == '1') {
        document.body.classList.add('night');
        }
    }
})();

// 星空背景 
function stars() {
    window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;
    var n,e,i,h,t=.05,s=document.getElementById("starfield"),o=!0,a="180,184,240",r="226,225,142",d="226,225,224",c=[];
    function f(){n=window.innerWidth,e=window.innerHeight,i=.216*n,s.setAttribute("width",n),s.setAttribute("height",e)}
    function u(){h.clearRect(0,0,n,e);for(var t=c.length,i=0;i<t;i++){var s=c[i];s.move(),s.fadeIn(),s.fadeOut(),s.draw()}}
    function y(){
        this.reset=function(){this.giant=m(3),this.comet=!this.giant&&!o&&m(10),this.x=l(0,n-10),this.y=l(0,e),
        this.r=l(1.1,2.6),this.dx=l(t,6*t)+(this.comet+1-1)*t*l(50,120)+2*t,this.dy=-l(t,6*t)-(this.comet+1-1)*t*l(50,120),
        this.fadingOut=null,this.fadingIn=!0,this.opacity=0,this.opacityTresh=l(.2,1-.4*(this.comet+1-1)),
        this.do=l(5e-4,.002)+.001*(this.comet+1-1)},
        this.fadeIn=function(){this.fadingIn&&(this.fadingIn=!(this.opacity>this.opacityTresh),this.opacity+=this.do)},
        this.fadeOut=function(){this.fadingOut&&(this.fadingOut=!(this.opacity<0),this.opacity-=this.do/2,(this.x>n||this.y<0)&&(this.fadingOut=!1,this.reset()))},
        this.draw=function(){
            if(h.beginPath(),this.giant)h.fillStyle="rgba("+a+","+this.opacity+")",h.arc(this.x,this.y,2,0,2*Math.PI,!1);
            else if(this.comet){h.fillStyle="rgba("+d+","+this.opacity+")",h.arc(this.x,this.y,1.5,0,2*Math.PI,!1);
            for(var t=0;t<30;t++)h.fillStyle="rgba("+d+","+(this.opacity-this.opacity/20*t)+")",h.rect(this.x-this.dx/4*t,this.y-this.dy/4*t-2,2,2),h.fill()
        }else h.fillStyle="rgba("+r+","+this.opacity+")",h.rect(this.x,this.y,this.r,this.r);
        h.closePath(),h.fill()},this.move=function(){this.x+=this.dx,this.y+=this.dy,!1===this.fadingOut&&this.reset(),(this.x>n-n/4||this.y<0)&&(this.fadingOut=!0)},
        setTimeout(function(){o=!1},50)
    }
    function m(t){return Math.floor(1e3*Math.random())+1<10*t}
    function l(t,i){return Math.random()*(i-t)+t}f(),window.addEventListener("resize",f,!1),
    function(){h=s.getContext("2d");for(var t=0;t<i;t++)c[t]=new y,c[t].reset();u()}(),
    function t(){document.getElementsByTagName('html')[0]&&u(),window.requestAnimationFrame(t)}()};
stars()

//侧边栏菜单键
// ========== 定义公共变量 ==========
var public_vars = public_vars || {};

// ========== 页面初始化 ==========
;(function($, window, undefined) {
    "use strict";

    $(document).ready(function() {
        // 缓存常用元素
        public_vars.$body           = $("body");
        public_vars.$pageContainer  = public_vars.$body.find(".page-container");
        public_vars.$sidebarMenu    = public_vars.$pageContainer.find('.sidebar-menu');
        public_vars.$mainMenu       = public_vars.$sidebarMenu.find('.main-menu');
        public_vars.$mainContent    = public_vars.$pageContainer.find('.main-content');
        public_vars.$mainFooter     = public_vars.$body.find('footer.main-footer');
        public_vars.$userInfoMenu   = public_vars.$body.find('nav.navbar.user-info-navbar');
        public_vars.wheelPropagation = true; // 主菜单滚轮传播开关

        // 初始化侧边栏菜单
        setup_sidebar_menu();

        // 设置用户信息菜单各项高度一致
        if (public_vars.$userInfoMenu.length) {
            public_vars.$userInfoMenu.find('.user-info-menu > li').css({
                minHeight: public_vars.$userInfoMenu.outerHeight() - 1
            });
        }
    });

})(jQuery, window);

// ========== 侧边栏菜单初始化 ==========
var sm_duration = 0.2, // 子菜单动画时长（秒）
    sm_transition_delay = 150; // 子菜单动画延迟（毫秒）

function setup_sidebar_menu() {
    if (!public_vars.$sidebarMenu.length) return;

    var $items_with_subs = public_vars.$sidebarMenu.find('li:has(> ul)'),
        toggle_others = public_vars.$sidebarMenu.hasClass('toggle-others');

    // 默认展开 active 菜单
    $items_with_subs.filter('.active').addClass('expanded');

    $items_with_subs.each(function() {
        var $li = $(this),
            $a = $li.children('a'),
            $sub = $li.children('ul');

        $li.addClass('has-sub');

        $a.on('click', function(e) {
            e.preventDefault();

            if (toggle_others) {
                sidebar_menu_close_items_siblings($li);
            }

            if ($li.hasClass('expanded') || $li.hasClass('opened')) {
                sidebar_menu_item_collapse($li, $sub);
            } else {
                sidebar_menu_item_expand($li, $sub);
            }
        });
    });
}

// ========== 展开子菜单 ==========
function sidebar_menu_item_expand($li, $sub) {
    if ($li.data('is-busy') || ($li.parent('.main-menu').length && public_vars.$sidebarMenu.hasClass('collapsed'))) {
        return;
    }

    $li.addClass('expanded').data('is-busy', true);
    $sub.show();

    var $sub_items = $sub.children(),
        sub_height = $sub.outerHeight();

    // 初始化子项动画状态
    $sub_items.addClass('is-hidden');
    $sub.height(0);

    // 使用 GSAP 执行动画展开
    gsap.to($sub, {
        duration: sm_duration,
        height: sub_height,
        onComplete: () => $sub.height('')
    });

    // 清除之前定时器
    clearTimeout($li.data('sub_i_1'));
    clearTimeout($li.data('sub_i_2'));

    // 设置新定时器
    var interval_1 = setTimeout(() => {
        $sub_items.each((i, el) => $(el).addClass('is-shown'));

        // 计算 transition 结束时间
        var t_duration = parseFloat($sub_items.eq(0).css('transition-duration')) || 0,
            t_delay = parseFloat($sub_items.last().css('transition-delay')) || 0,
            finish_time = (t_duration + t_delay) * 1000 || sm_transition_delay * $sub_items.length;

        var interval_2 = setTimeout(() => {
            $sub_items.removeClass('is-hidden is-shown');
        }, finish_time);

        $li.data('sub_i_2', interval_2);
        $li.data('is-busy', false);
    }, 0);

    $li.data('sub_i_1', interval_1);
}

// ========== 收起子菜单 ==========
function sidebar_menu_item_collapse($li, $sub) {
    if ($li.data('is-busy')) return;

    var $sub_items = $sub.children();

    $li.removeClass('expanded').data('is-busy', true);
    $sub_items.addClass('hidden-item');

    gsap.to($sub, {
        duration: sm_duration,
        height: 0,
        onComplete: () => {
            $li.data('is-busy', false).removeClass('opened');
            $sub.attr('style', '').hide();
            $sub_items.removeClass('hidden-item');
            $li.find('li.expanded ul').attr('style', '').hide().parent().removeClass('expanded');
        }
    });
}

// ========== 关闭同级菜单 ==========
function sidebar_menu_close_items_siblings($li) {
    $li.siblings('.expanded, .opened').each(function() {
        var $_li = $(this),
            $_sub = $_li.children('ul');

        sidebar_menu_item_collapse($_li, $_sub);
    });
}

// ========== 侧边栏、移动端菜单开关 ==========
;(function($, window, undefined) {
    "use strict";

    $(document).ready(function() {
        // 侧边栏折叠按钮
        $('a[data-toggle="sidebar"]').on('click', function(e) {
            e.preventDefault();
            public_vars.$sidebarMenu.toggleClass('collapsed');
        });

        // 移动端主菜单按钮
        $('a[data-toggle="mobile-menu"]').on('click', function(e) {
            e.preventDefault();
            public_vars.$mainMenu.toggleClass('mobile-is-visible');
            public_vars.$sidebarMenu.toggleClass('mobile-is-visible');
            public_vars.$pageContainer.toggleClass('mobile-is-visible');
        });

        // 移动端用户信息菜单按钮
        $('a[data-toggle="user-info-menu"]').on('click', function(e) {
            e.preventDefault();
            public_vars.$userInfoMenu.toggleClass('mobile-is-visible');
        });
    });

})(jQuery, window);

// ========== 页面交互功能 ==========
$(document).ready(function() {
    // 图片懒加载
    lozad().observe();

    // 点击展开子菜单时收起其他菜单
    $(document).on("click", ".has-sub", function() {
        var $this = $(this);
        if ($this.hasClass("expanded")) {
            $(".has-sub ul").not($this.find("ul")).removeAttr("style");
        } else {
            $this.find("ul").removeAttr("style");
        }
    });

    // 切换侧边栏时处理子菜单展开状态
    $(".user-info-menu .d-none").on("click", function() {
        if ($(".sidebar-menu").hasClass("collapsed")) {
            $(".has-sub.expanded > ul").removeAttr("style");
        } else {
            $(".has-sub.expanded > ul").show();
        }
    });

    // 二级菜单选中切换
    $("#main-menu li ul li").on("click", function() {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
    });

    // 平滑滚动并切换选中状态
    $("a.smooth").on("click", function(e) {
        e.preventDefault();

        var targetId = $(this).attr("href"),
            targetOffset = $(targetId).offset().top - 30;

        $("#main-menu li").removeClass("active");
        $(this).parent("li").addClass("active");

        // 隐藏移动端菜单
        public_vars.$mainMenu.removeClass("mobile-is-visible");
        public_vars.$sidebarMenu.removeClass("mobile-is-visible");
        public_vars.$pageContainer.removeClass("mobile-is-visible");

        window.scrollTo({ top: targetOffset, behavior: "smooth" });
    });
});

function imgerrorfun(){ 
    var img=event.srcElement; 
    img.src="images/browser.svg"; //默认图片
    img.onerror=null; 
} 

// 获取所有带有 data-bs-toggle="tooltip" 的元素，转换为数组
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));

// 遍历这些元素，为每个元素创建一个 Bootstrap Tooltip 实例
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

// 全局变量定义
var public_vars = public_vars || {};

jQuery.extend(public_vars, {
    breakpoints: {
        largescreen: [991, -1],
        tabletscreen: [768, 990],
        devicescreen: [420, 767],
        sdevicescreen: [0, 419]
    },
    lastBreakpoint: null
});

// 主响应函数：根据断点执行逻辑
function resizable(breakpoint) {
    switch (breakpoint) {
        case 'largescreen':
            // 可放大屏专用逻辑
			public_vars.$sidebarMenu.removeClass('collapsed');
            break;
        case 'tabletscreen':
            // 平板屏幕时折叠菜单
            public_vars.$sidebarMenu.addClass('collapsed');
            break;
        case 'devicescreen':
        case 'sdevicescreen':
            // 移动端逻辑
            break;
    }
}

// 获取当前断点
function get_current_breakpoint() {
    const width = jQuery(window).width();
    const breakpoints = public_vars.breakpoints;

    for (const label in breakpoints) {
        let [min, max] = breakpoints[label];
        if (max === -1) max = Infinity;

        if (width >= min && width <= max) {
            return label;
        }
    }

    return null;
}

// 判断是否处于某个断点
function is(screen_label) {
    return get_current_breakpoint() === screen_label;
}

// 是否是超小屏（手机类）
function isxs() {
    return is('devicescreen') || is('sdevicescreen');
}

// 是否是平板及以上
function ismdxl() {
    return is('tabletscreen') || is('largescreen');
}

// 响应断点变化触发函数
function trigger_resizable() {
    const currentBreakpoint = get_current_breakpoint();

    if (public_vars.lastBreakpoint !== currentBreakpoint) {
        public_vars.lastBreakpoint = currentBreakpoint;
        resizable(currentBreakpoint);
    }
}

// 添加窗口尺寸变化监听
jQuery(window).on('resize orientationchange', trigger_resizable);

//获取天气
fetch('https://api.vvhan.com/api/weather')
    .then(response => response.json())
    .then(data => {
        $('#wea_text').html(data.data.type)
        $('#city_text').html(data.city)
        $('#tem_low').html(data.data.low)
        $('#tem_high').html(data.data.high)
        $('#win_text').html(data.data.fengxiang)
        $('#win_speed').html(data.data.fengli)
    })
    .catch(console.error)

//获取时间
let t = null;
t = setTimeout(times, 1000);

function times() {
    clearTimeout(t);
    dt = new Date();
    let y = dt.getYear() + 1900;
    let mm = dt.getMonth() + 1;
    let d = dt.getDate();
    let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let day = dt.getDay();
    let h = dt.getHours();
    let m = dt.getMinutes();
    let s = dt.getSeconds();
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    $("#times").html(y + "." + mm + "." + d + "&nbsp;" + "<span class='weekday'>" + weekday[day] + "</span><br>" + "<span class='time-text'>" + h + ":" + m + ":" + s + "</span>");
    t = setTimeout(times, 1000);
}

//脚注
$(document).ready(function () {
    var t1 = performance.now();
    if (typeof t1 != "undefined") { document.getElementById("time").innerHTML = " 页面加载耗时 " + Math.round(t1) + " 毫秒 "; }
    $.get("/cdn-cgi/trace", function (data) {
        sip = data.match(/(ip=?)(\S*)/)[2];
        str = data.match(/(colo=?)(\S*)/)[2];
        loc = data.match(/(loc=?)(\S*)/)[2];
        sts = data.match(/(http==?)(\S*)/)[2];
        tls = data.match(/(tls==?)(\S*)/)[2];
        $("#result").append("节点:" + str);
        $("#result").append("\n访客:" + loc);
        $("#result").append("\n" + sts);
        $("#result").append("\n加密:" + tls);
        $("#result").append("\nIP:" + sip);
    });
});

//控制台输出
console.clear();
let styleTitle1 = `
font-size: 20px;
font-weight: 600;
color: rgb(244,167,89);
`
let styleTitle2 = `
font-size: 16px;
color: rgb(244,167,89);
`
let styleContent = `
color: rgb(30,152,255);
`
let title1 = 'WayneのNav'
let title2 = `
==============================
#   #    #   #   # #   # #####
#   #   # #   # #  ##  # #
# # #  #####   #   # # # #####
## ##  #   #   #   #  ## #
#   #  #   #   #   #   # #####
==============================
`
let content = `
版 本 号：v5.1.1
更新日期：2025-04-28

WayneのNav: https://wnav.pages.dev
Github:  https://github.com/Waynenet/Wayne-Nav
`
console.log(`%c${title1} %c${title2}
%c${content}`, styleTitle1, styleTitle2, styleContent)