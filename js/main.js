// ハンバーガーメニュー
const $hamburger = $('#js-hamburger');
const $headerMenu = $('.header-menu');
const $overlay = $('#js-overlay');

$hamburger.on('click', function() {
    const isOpen = $headerMenu.hasClass('is-open');
    $hamburger.toggleClass('is-active').attr('aria-expanded', !isOpen);
    $headerMenu.toggleClass('is-open');
    $overlay.toggleClass('is-open');
});

$overlay.on('click', function() {
    $hamburger.removeClass('is-active').attr('aria-expanded', false);
    $headerMenu.removeClass('is-open');
    $overlay.removeClass('is-open');
});

$headerMenu.find('a').on('click', function(e) {
    e.preventDefault();
    const href = $(this).attr('href');
    $hamburger.removeClass('is-active').attr('aria-expanded', false);
    $headerMenu.removeClass('is-open');
    $overlay.removeClass('is-open');
    setTimeout(function() {
        window.location.href = href;
    }, 400);
});

// ページトップ・お問い合わせボタン（FVを超えたら表示、フッター到達で位置固定）
const $pagetop = $('#js-pagetop');
const $contactBtn = $('.contact-btn');
const $toggleElements = $pagetop.add($contactBtn);
const $fv = $('.fv');
// FVがないページは、他ページのFV（.fv-slide__imageのaspect-ratio）相当の高さを閾値にして表示タイミングを揃える
const subFvRatio = window.matchMedia('(min-width: 768px)').matches ? 200 / 1080 : 300 / 375;
const fvHeight = $fv.length ? $fv.outerHeight() : window.innerWidth * subFvRatio;
const $footer = $('.footer');

function updateButtons() {
    const scrollTop = $(window).scrollTop();
    const scrollBottom = scrollTop + $(window).height();
    const footerTop = $footer.offset().top;
    const footerHeight = $footer.outerHeight();
    const isPC = window.matchMedia('(min-width: 768px)').matches;

    $toggleElements.toggleClass('is-show', scrollTop > fvHeight);

    if (scrollBottom >= footerTop) {
        const isContactPage = $('body').hasClass('page-contact');
        const pagetopOffset = isPC ? (isContactPage ? 32 : 90) : (isContactPage ? 18 : 80);
        $contactBtn.addClass('is-docked').css('bottom', footerHeight);
        $pagetop.addClass('is-docked').css('bottom', footerHeight + pagetopOffset);
    } else {
        $contactBtn.removeClass('is-docked').css('bottom', '');
        $pagetop.removeClass('is-docked').css('bottom', '');
    }
}

$(window).on('scroll', updateButtons);

$pagetop.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 500);
});

$('.qa-title').on('click', function(){
    $(this).toggleClass('active');
    const $qaText = $(this).next('.qa-text');
    if ($qaText.hasClass('is-open')) {
        $qaText.css('max-height', '0px');
    } else {
        $qaText.css('max-height', $qaText.prop('scrollHeight') + 'px');
    }
    $qaText.toggleClass('is-open');
});

$('.qa-text').on('click', function(){
    $(this).prev('.qa-title').trigger('click');
});

// プランテーブル カスタムスクロールバー
const wrapper = document.querySelector('.plan-table__wrapper');
const track = document.querySelector('.plan-table__scrollbar');
const thumb = document.querySelector('.plan-table__scrollbar-thumb');

if (wrapper && track && thumb) {
    const updateThumbPosition = () => {
        const scrollRatio = wrapper.scrollLeft / (wrapper.scrollWidth - wrapper.clientWidth);
        const maxLeft = track.clientWidth - thumb.clientWidth;
        thumb.style.left = `${scrollRatio * maxLeft}px`;
    };

    wrapper.addEventListener('scroll', updateThumbPosition);

    let isDragging = false;
    let startX = 0;
    let startLeft = 0;

    thumb.addEventListener('pointerdown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startLeft = parseInt(thumb.style.left || 0, 10);
        thumb.setPointerCapture(e.pointerId);
    });

    thumb.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const delta = e.clientX - startX;
        const maxLeft = track.clientWidth - thumb.clientWidth;
        const newLeft = Math.min(Math.max(startLeft + delta, 0), maxLeft);
        thumb.style.left = `${newLeft}px`;
        wrapper.scrollLeft = (newLeft / maxLeft) * (wrapper.scrollWidth - wrapper.clientWidth);
    });

    thumb.addEventListener('pointerup', () => { isDragging = false; });
}

if (document.querySelector('.voice__swiper')) {
    const voiceSwiper = new Swiper('.voice__swiper', {
        slidesPerView: 1,
        spaceBetween: 35,
        loop: true,
        grabCursor: false,
        speed: 600,
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 35,
            }
        }
    });

    document.querySelector('.voice-btn-prev').addEventListener('click', () => {
        voiceSwiper.slidePrev();
    });
    document.querySelector('.voice-btn-next').addEventListener('click', () => {
        voiceSwiper.slideNext();
    });
}


