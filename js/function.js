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
const pointerElement = document.getElementById("pointer");
if (pointerElement) {
    const halfElementWidth = pointerElement.offsetWidth / 2;
    function setPosition(x, y) {
        pointerElement.style.transform = `translate(${x - halfElementWidth + 19}px, ${y - halfElementWidth + 19}px)`;
    }
    body.addEventListener("mousemove", (e) => {
        window.requestAnimationFrame(() => setPosition(e.clientX, e.clientY));
    });
}
if (/Mobi|Tablet|iPad|iPhone|Android/i.test(navigator.userAgent)) {
    if (pointerElement) pointerElement.style.display = "none";
}

// LocalStorage 工具
const getStorage = (key) => localStorage.getItem(key);
const setStorage = (key, value) => localStorage.setItem(key, value);

// 暗黑模式切换
const setNightMode = (enable) => {
    const nightModeTooltip = document.getElementById('night-mode-tooltip');
    const toastMessage = enable ? '已切换为夜间模式' : '已切换为日间模式';
    const toastIcon = enable ? 'ti ti-moon-filled' : 'ti ti-sun-filled';
    const toastTitle = enable ? '夜间模式切换' : '日间模式切换';

    if (enable) {
        document.body.classList.add('night');
        setStorage('night', '1');
        if (nightModeTooltip) nightModeTooltip.innerText = '切换日间模式';
    } else {
        document.body.classList.remove('night');
        setStorage('night', '0');
        if (nightModeTooltip) nightModeTooltip.innerText = '切换夜间模式';
    }
    iziToast.info({
        timeout: 2000, closeOnEscape: true, transitionOut: 'fadeOutRight',
        displayMode: 'replace', layout: 2, transitionIn: 'bounceInLeft',
        position: 'topRight', icon: toastIcon, backgroundColor: '#fff',
        title: toastTitle, message: toastMessage
    });
};
const switchNightMode = () => setNightMode(getStorage('night') === '0');
const isNightTime = () => { const hour = new Date().getHours(); return hour > 18 || hour < 7; };

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => setNightMode(e.matches));

(() => {
    const night = getStorage('night');
    setNightMode(night === null ? isNightTime() : night === '1');
})();

// 星空背景
function stars() {
    const canvas = document.getElementById("starfield");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth, height = window.innerHeight, stars = [], initialBurst = true;
    const STAR_COUNT = Math.floor(0.3 * width);
    const COLORS = { giant: "180,184,240", star: "226,225,142", comet: "225,225,225" };
    class Star {
      constructor() { this.reset(); }
      reset() {
        this.isGiant = randomChance(3); this.isComet = !this.isGiant && !initialBurst && randomChance(20);
        this.x = randomRange(0, width); this.y = randomRange(0, height); this.size = randomRange(1.1, 2.6);
        this.dx = randomRange(0.05, 0.3) + (this.isComet ? randomRange(2.5, 6) : 0.05);
        this.dy = -randomRange(0.05, 0.3) - (this.isComet ? randomRange(2.5, 6) : 0.05);
        this.opacity = 0; this.opacityTarget = randomRange(0.6, this.isComet ? 0.8 : 1);
        this.fadeSpeed = randomRange(0.0005, 0.002) + (this.isComet ? 0.001 : 0);
        this.fadingIn = true; this.fadingOut = false;
      }
      fadeIn() { if (this.fadingIn) { this.opacity += this.fadeSpeed; if (this.opacity >= this.opacityTarget) this.fadingIn = false; } }
      fadeOut() { if (this.fadingOut) { this.opacity -= this.fadeSpeed / 2; if (this.opacity <= 0) this.reset(); } }
      move() { this.x += this.dx; this.y += this.dy; if (!this.fadingOut && (this.x > width - width / 4 || this.y < 0)) this.fadingOut = true; }
      draw() {
        ctx.beginPath();
        if (this.isGiant) { ctx.fillStyle = `rgba(${COLORS.giant},${this.opacity})`; ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI); }
        else if (this.isComet) {
          ctx.fillStyle = `rgba(${COLORS.comet},${this.opacity})`; ctx.arc(this.x, this.y, 1.5, 0, 2 * Math.PI);
          for (let i = 0; i < 30; i++) { ctx.fillStyle = `rgba(${COLORS.comet},${this.opacity - this.opacity / 20 * i})`; ctx.fillRect(this.x - this.dx / 4 * i, this.y - this.dy / 4 * i - 2, 2, 2); }
        } else { ctx.fillStyle = `rgba(${COLORS.star},${this.opacity})`; ctx.fillRect(this.x, this.y, this.size, this.size); }
        ctx.closePath(); ctx.fill();
      }
    }
    function randomChance(p) { return Math.random() * 1000 < p * 10; }
    function randomRange(min, max) { return Math.random() * (max - min) + min; }
    function resizeCanvas() { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; }
    function update() { ctx.clearRect(0, 0, width, height); for (let s of stars) { s.move(); s.fadeIn(); s.fadeOut(); s.draw(); } requestAnimationFrame(update); }
    function init() { resizeCanvas(); stars = Array.from({ length: STAR_COUNT }, () => new Star()); update(); setTimeout(() => initialBurst = false, 50); }
    window.addEventListener("resize", resizeCanvas);
    init();
}
stars();


// 背景图片失败处理
document.addEventListener('DOMContentLoaded', function() {
    const body = document.querySelector('body');
    const bgUrlMatch = window.getComputedStyle(body).backgroundImage.match(/url\("?(.+?)"?\)/);
    if (!bgUrlMatch) return;
    const bgUrl = bgUrlMatch[1];
    const img = new Image();
    img.src = bgUrl;
    img.onerror = () => {
        body.style.background = '#3f5d5c';
        body.style.backgroundImage = 'none';
        console.warn('背景图片加载失败，已设置为纯色背景');
    };
});

// 侧边栏菜单
var public_vars = public_vars || {};
;(function($, w, u) { "use strict"; $(document).ready(() => { $.extend(public_vars, { $body: $("body"), $pageContainer: $(".page-container"), $sidebarMenu: $('.sidebar-menu'), $mainMenu: $('.main-menu'), $mainContent: $('.main-content'), $userInfoMenu: $('nav.user-info-navbar') }); setup_sidebar_menu(); if (public_vars.$userInfoMenu.length) public_vars.$userInfoMenu.find('.user-info-menu > li').css({ minHeight: public_vars.$userInfoMenu.outerHeight() - 1 }); }); })(jQuery, window);
var sm_d = 0.2, sm_t_d = 150; function setup_sidebar_menu() { if (!public_vars.$sidebarMenu.length) return; let $i = public_vars.$sidebarMenu.find('li:has(> ul)'), t = public_vars.$sidebarMenu.hasClass('toggle-others'); $i.filter('.active').addClass('expanded'); $i.each(function() { let $li = $(this), $a = $li.children('a'), $s = $li.children('ul'); $li.addClass('has-sub'); $a.on('click', e => { e.preventDefault(); if (t) sidebar_menu_close_items_siblings($li); $li.hasClass('expanded') || $li.hasClass('opened') ? sidebar_menu_item_collapse($li, $s) : sidebar_menu_item_expand($li, $s); }); }); } function sidebar_menu_item_expand($li, $s) { if ($li.data('is-busy') || ($li.parent('.main-menu').length && public_vars.$sidebarMenu.hasClass('collapsed'))) return; $li.addClass('expanded').data('is-busy', true); $s.show(); let $si = $s.children(), h = $s.outerHeight(); $si.addClass('is-hidden'); $s.height(0); gsap.to($s, { duration: sm_d, height: h, onComplete: () => $s.height('') }); clearTimeout($li.data('s1')); clearTimeout($li.data('s2')); let i1 = setTimeout(() => { $si.each((i, el) => $(el).addClass('is-shown')); let d = parseFloat($si.eq(0).css('transition-duration')) || 0, l = parseFloat($si.last().css('transition-delay')) || 0, f = (d + l) * 1000 || sm_t_d * $si.length; let i2 = setTimeout(() => $si.removeClass('is-hidden is-shown'), f); $li.data('s2', i2).data('is-busy', false); }, 0); $li.data('s1', i1); } function sidebar_menu_item_collapse($li, $s) { if ($li.data('is-busy')) return; let $si = $s.children(); $li.removeClass('expanded').data('is-busy', true); $si.addClass('hidden-item'); gsap.to($s, { duration: sm_d, height: 0, onComplete: () => { $li.data('is-busy', false).removeClass('opened'); $s.attr('style', '').hide(); $si.removeClass('hidden-item'); $li.find('li.expanded ul').attr('style', '').hide().parent().removeClass('expanded'); } }); } function sidebar_menu_close_items_siblings($li) { $li.siblings('.expanded, .opened').each(function() { let $_li = $(this), $_s = $_li.children('ul'); sidebar_menu_item_collapse($_li, $_s); }); }
;(function($, w, u) { "use strict"; $(() => { $('a[data-toggle="sidebar"]').on('click', e => { e.preventDefault(); public_vars.$sidebarMenu.toggleClass('collapsed'); }); $('a[data-toggle="mobile-menu"]').on('click', e => { e.preventDefault(); public_vars.$mainMenu.toggleClass('mobile-is-visible'); public_vars.$sidebarMenu.toggleClass('mobile-is-visible'); public_vars.$pageContainer.toggleClass('mobile-is-visible'); }); $('a[data-toggle="user-info-menu"]').on('click', e => { e.preventDefault(); public_vars.$userInfoMenu.toggleClass('mobile-is-visible'); }); }); })(jQuery, window);
$(() => { $(document).on("click", ".has-sub", function() { let $t = $(this); $t.hasClass("expanded") ? $(".has-sub ul").not($t.find("ul")).removeAttr("style") : $t.find("ul").removeAttr("style"); }); $(".user-info-menu .d-none").on("click", () => { $(".sidebar-menu").hasClass("collapsed") ? $(".has-sub.expanded > ul").removeAttr("style") : $(".has-sub.expanded > ul").show(); }); $("#main-menu li ul li").on("click", function() { $(this).siblings().removeClass("active").end().addClass("active"); }); $("a.smooth").on("click", function(e) { e.preventDefault(); let t = $(this).attr("href"), o = $(t).offset().top - 30; $("#main-menu li").removeClass("active"); $(this).parent("li").addClass("active"); public_vars.$mainMenu.removeClass("mobile-is-visible"); public_vars.$sidebarMenu.removeClass("mobile-is-visible"); public_vars.$pageContainer.removeClass("mobile-is-visible"); window.scrollTo({ top: o, behavior: "smooth" }); }); });
$.extend(public_vars, { breakpoints: { largescreen: [991, -1], tabletscreen: [768, 990], devicescreen: [420, 767], sdevicescreen: [0, 419] }, lastBreakpoint: null }); function resizable(b) { switch (b) { case 'largescreen': public_vars.$sidebarMenu.removeClass('collapsed'); break; case 'tabletscreen': public_vars.$sidebarMenu.addClass('collapsed'); break; } } function get_current_breakpoint() { let w = $(window).width(); for (let l in public_vars.breakpoints) { let [min, max] = public_vars.breakpoints[l]; if (max === -1) max = Infinity; if (w >= min && w <= max) return l; } return null; } function trigger_resizable() { let c = get_current_breakpoint(); if (public_vars.lastBreakpoint !== c) { public_vars.lastBreakpoint = c; resizable(c); } } $(window).on('resize orientationchange', trigger_resizable);

// 天气、时间、脚注、控制台输出
fetch('https://api.vvhan.com/api/weather').then(r => r.json()).then(d => { $('#wea_text').html(d.data.type); $('#city_text').html(d.city); $('#tem_low').html(d.data.low); $('#tem_high').html(d.data.high); $('#win_text').html(d.data.fengxiang); $('#win_speed').html(d.data.fengli); }).catch(console.error);
let t = null; function times() { clearTimeout(t); const d = new Date(), w = ["日", "一", "二", "三", "四", "五", "六"], h = d.getHours().toString().padStart(2, '0'), m = d.getMinutes().toString().padStart(2, '0'), s = d.getSeconds().toString().padStart(2, '0'), el = document.getElementById("times"); if (el) el.innerHTML = `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()} <span class='weekday'>星期${w[d.getDay()]}</span><br/><span class='time-text'>${h}:${m}:${s}</span>`; t = setTimeout(times, 1000); } times();
$(() => { let t1 = performance.now(); if (t1) $("#time").html(" 页面加载耗时 " + Math.round(t1) + " 毫秒 "); $.get("/cdn-cgi/trace", d => { let i = Object.fromEntries(d.trim().split('\n').map(e => e.split('='))); $("#result").html(`节点:${i.colo} | 访客:${i.loc} | IP:${i.ip}`); }); });
console.clear(); console.log(`%cWayneのNav %c\n==============================\n#   #    #   #   # #   # #####\n#   #   # #   # #  ##  # #\n# # #  #####   #   # # # #####\n## ##  #   #   #   #  ## #\n#   #  #   #   #   #   # #####\n==============================\n %c\n版 本 号：v6.1.0\n更新日期：2025-07-29\n\nWayneのNav: https://nav.3301.qzz.io/\nGithub:  https://github.com/Waynenet/Wayne-Nav\n`, `font-size: 20px; font-weight: 600; color: rgb(244,167,89);`, `font-size: 16px; color: rgb(244,167,89);`, `color: rgb(30,152,255);`);

// --- 外观设置控制逻辑 ---
document.addEventListener('DOMContentLoaded', function() {
    const docElem = document.documentElement;
    const settingsContainer = document.getElementById('settings-container');
    const decimalSliders = ['alpha-slider', 'overlay-slider'];

    if (!settingsContainer) {
        console.warn("外观设置控件容器未找到，功能禁用。");
        return;
    }

    // 控件配置: sliderId, CSS变量, 默认值(light/night), 单位
    const controls = {
        'overlay-slider': { variable: '--overlay-opacity', defaults: { light: 0.4, night: 0 }, unit: '' },
        'blur-slider': { variable: '--module-blur-value', defaults: { light: 12, night: 0 }, unit: 'px' },
        'alpha-slider': { variable: '--module-bg-alpha', defaults: { light: 0.1, night: 0.15 }, unit: '' }
    };

    const getCurrentTheme = () => document.body.classList.contains('night') ? 'night' : 'light';

    // 加载并应用当前主题的所有设置
    const loadSettingsForTheme = () => {
        const theme = getCurrentTheme();
        
        Object.values(controls).forEach(config => {
            const slider = document.querySelector(`.control-slider[data-variable="${config.variable}"]`);
            if (!slider) return;

            const storageKey = `${config.variable}-${theme}`;
            const savedValue = localStorage.getItem(storageKey);
            const defaultValue = config.defaults[theme];
            
            const finalValue = savedValue !== null ? savedValue : defaultValue;

            // 应用CSS变量
            docElem.style.setProperty(config.variable, finalValue + config.unit);
            
            // 更新滑块UI
            slider.value = finalValue;
            if (slider.nextElementSibling) {
                // 根据滑块ID判断是否需要小数
                const precision = decimalSliders.includes(slider.id) ? 2 : 0;
                slider.nextElementSibling.textContent = parseFloat(finalValue).toFixed(precision);
            }
        });
    };

    // 事件委托处理点击
    settingsContainer.addEventListener('click', function(e) {
        const target = e.target.closest('.suspension_box');
        if (!target) return;
        e.stopPropagation();
        if (target.id === 'settings-toggle') {
            this.classList.toggle('open');
            if (!this.classList.contains('open')) {
                this.querySelectorAll('.control-slider-panel.visible').forEach(p => p.classList.remove('visible'));
                this.classList.remove('hide-tooltips');
            }
            return;
        }
        if (target.classList.contains('suspension_control')) {
            const panel = document.getElementById(`${target.dataset.control}-panel`);
            if (!panel) return;
            const wasVisible = panel.classList.contains('visible');
            this.querySelectorAll('.control-slider-panel').forEach(p => p.classList.remove('visible'));
            if (!wasVisible) {
                panel.classList.add('visible');
            }
            const anySliderVisible = this.querySelector('.control-slider-panel.visible') !== null;
            this.classList.toggle('hide-tooltips', anySliderVisible);
        }
    });

    // 处理所有滑块输入
    document.querySelectorAll('.control-slider').forEach(slider => {
        slider.addEventListener('input', function() {
            const variable = this.dataset.variable;
            const unit = this.dataset.unit;
            const value = this.value;
            
            // 1. 直接更新对应的CSS变量
            docElem.style.setProperty(variable, value + unit);
            
            // 2. 更新数值显示
            if (this.nextElementSibling) {
                const precision = decimalSliders.includes(this.id) ? 2 : 0;
                this.nextElementSibling.textContent = parseFloat(value).toFixed(precision);
            }

            // 3. 保存到LocalStorage (按主题保存)
            const storageKey = `${variable}-${getCurrentTheme()}`;
            localStorage.setItem(storageKey, value);
        });
        // 防止点击滑块面板导致菜单收起
        slider.closest('.control-slider-panel').addEventListener('click', e => e.stopPropagation());
    });

    // 点击页面其他地方，关闭设置菜单
    document.addEventListener('click', function() {
        if (settingsContainer.classList.contains('open')) {
            settingsContainer.classList.remove('open', 'hide-tooltips');
            settingsContainer.querySelectorAll('.control-slider-panel.visible').forEach(p => p.classList.remove('visible'));
        }
    });
    
    // 监听暗黑模式切换，重新加载对应主题的设置
    new MutationObserver(() => {
        loadSettingsForTheme();
    }).observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // 初始化
    loadSettingsForTheme();
});