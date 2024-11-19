var $ = jQuery.noConflict();
jQuery(document).ready(function($) {

    customDropboxFilter(); // Custom Dropdown Filter
    initMmenu(); // Main menu
    haveParallax(); // Parallax Effect
    choseMountDonatie(); //Chose mount Donaties in Sidebar
    sliderMediaWebshop(); // Slider media Webshop page
    tabContent();  // For  Tab content
    choseMountButton(); //Custom chose Donatie mount label button
    customDropdown(); // Custom select dropdown
    toggleSearch(); // Toggle show/hide for Search Form
    stickHeader(); // Fixed header
    galleryView(); //Init modal popup for gallery that using in project-view page
    toggleSubnavMobile(); // Toggle sub-menu on mobile
    moveSearch(); //Move Search Form on mobile
    moveBlockFooter(); //Move Footer Block on mobile

    
    $(".player").YTPlayer();
    

    // whole Div clickable
    $(".homepage .grid-article .article-item").click(function() {
        window.location = $(this).find("h3 a").attr("href");
        return false;
    });

    //Checked and show div
    $('#newsletter-check').on('ifToggled', function(event) {
        $(".subscribe-right-box .form-subscribe").toggleClass("open");
    });
    $('.checktoshow').on('ifToggled', function(event) {
        $(".show-when-check").toggleClass("open");
    });
    
    // Custom style Radio and Checkbox (using iCheck plugin)
    if ($('input[type=radio]').length || $('input[type=checkbox]').length) {
        $('input[type=checkbox], input.radio-style').iCheck({
            checkboxClass: 'icheckbox_minimal',
            radioClass: 'iradio_minimal'
        });
    }

    //Toggle form in Profile page
    $('.mail-box .button').click(function() {
        $(".email-update-box .form-subscribe").toggleClass('opened');
    });

});

$(window).resize(function () {
    moveSearch();
});

// Animation Number for Donatie box
function animationNumber(mount) {
    var comma_separator_number_step = $.animateNumber.numberStepFactories.separator('.');
    $('#mount-animate').animateNumber({
        number: mount,
        numberStep: comma_separator_number_step,
        easing: 'easeOutCubic'
    }, 1000);
}

// Init main Mmenu
function initMmenu() {
    $('nav#main-nav').mmenu({
        offCanvas: {
            position: "right",
            navbars: false
                //zposition : "front"
        }
    });

    // Click to close menu
    var API = $('nav#main-nav').data("mmenu");
    $(".close-menu").click(function() {
        API.close();
    });
}

// Custom dropdown filter
function customDropboxFilter() {
    //Custom Select Dropdown
    $('select.style-sel').each(function() {
        var title = $(this).attr('title');
        if ($('option:selected', this).val() !== '')
            title = $('option:selected', this).text();
        $(this)
            .css({
                'z-index': 10,
                'opacity': 0,
                '-khtml-appearance': 'none'
            })
            .after('<span class="select">' + title + '</span>')
            .change(function() {
                val = $('option:selected', this).text();
                $(this).next().text(val);

            });

        $('.select-style select').click(function() {
            $(this).next().toggleClass('opened');
        });
    });
}

// Toggle show/hide Search Form
function toggleSearch() {
    $('.toggle-search').on('click', function(e) {
        e.stopPropagation();
        $('.toggle-search').next().toggleClass('opened');
    });
    $('html').click(function(e) {
        if ($(e.target).closest('.form-search').length === 0) {
            $('.toggle-search').next().removeClass('opened');
        }
    });
}

// Toggle show/hide Sub Menu on mobile
function toggleSubnavMobile() {
    if ($(window).width() < 768) {
        $('.toggle-sub-mobile').click(function() {
            $(this).parent().toggleClass('opened');
        });
    }
}


//Init modal popup for gallery that using in project-view page
function galleryView() {
    if ($('.carosel-slider').length) {
        $('.carosel-slider').bxSlider({
            minSlides: 2,
            maxSlides: 6,
            slideWidth: 107,
            slideMargin: 5,
            moveSlides: 3,
            nextSelector: '#carosel-next',
            prevSelector: '#carosel-prev',
            pager: false
        });
    }
    if ($(".link-popup").length) {
        $(".link-popup").magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }
}

// Init for parallax
function haveParallax() {
    if ($(window).width() > 1024) {
        $('.with-parallax').each(function(i) {
            $('header#top').parallax("50%", 0.1);
            $('.video-box').parallax("50%", 0.1);
            $('.project-wrap').parallax("50%", 0.1);

        });
    }
}


// Tab content
function tabContent() {
    $('ul.tabs li').click(function() {
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    });
}

//Chose mount Donaties in Sidebar
function choseMountDonatie() {
    $('.wrap-chose input:radio').click(function() {
        $('.wrap-chose label').removeClass('active');
        $('.other-mount').removeClass('active');
        var mount = 0;
        var number_org = $('.mout-box .current i').text();
        if ($(this).is(':checked')) {
            $(this).prev().addClass('active');

            //change Total number
            var number_new = (+$(this).val()) + (+number_org);
            animationNumber(number_new);
        } else {
            $(this).prev().removeClass('active');
        }

        if ($(this).prev().hasClass("label50")) {

        }
    });

    $('.other-mount').click(function() {
        $(".wrap-other-mount").toggleClass('open');
        $(this).toggleClass('active');
        $(".wrap-chose .btn-wrap input:radio").attr("checked", false);
        $(".wrap-chose .btn-wrap label").removeClass("active");

        animationNumber($('.mout-box .current i').text());
    });

    $('.wrap-other-mount input[type=text]').keyup(function() {
        if ($(this).val().length !== 0)
            $('.wrap-other-mount .button').attr('disabled', false);
        else
            $('.wrap-other-mount .button').attr('disabled', true);
    });
    $('.wrap-other-mount .button').click(function() {
        var number_org = $('.mout-box .current i').text();
        var number_txt = $('.wrap-other-mount input[type=text]').val();
        var number_new = (+number_txt) + (+number_org);
        animationNumber(number_new);
    });
}

//Sticky Header
function stickHeader() {
    $(window).on("scroll touchmove", function() {
        var siteHeader = $('.wrap-full-nav');
        var scrollTop = $(document).scrollTop(),
            triggerPoint = 20;
        if (scrollTop > triggerPoint && !siteHeader.hasClass('with-bg')) {
            siteHeader.addClass('with-bg');
        } else if (scrollTop <= triggerPoint && siteHeader.hasClass('with-bg')) {
            siteHeader.removeClass('with-bg');
        }
    });
}


// Move Search Form on mobile 
function moveSearch() {
    if ($(window).width() < 481) { 
        $('#search_form').remove().insertAfter("#main-nav .nav-text");
    }
}

//Cusomtom chose Donatie mount label button
function choseMountButton() {
    $('.donatie .btn-wrap input:radio').click(function() {
        $('.btn-wrap label').removeClass('active');
        if ($(this).is(':checked')) {
            $(this).prev().addClass('active');
        } else {
            $(this).prev().removeClass('active');
        }
    });
}

// Style for Select Dropdown
function customDropdown() {
    $('select.style-skin').each(function() {
        var $this = $(this),
            numberOfOptions = $(this).children('option').length;
        $this.addClass('s-hidden');
        $this.wrap('<div class="select-skin"></div>');
        $this.after('<div class="styledSelect"></div>');
        var $styledSelect = $this.next('div.styledSelect');
        $styledSelect.text($this.children('option').eq(0).text());
        var $list = $('<ul />', {
            'class': 'options'
        }).insertAfter($styledSelect);
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }
        var $listItems = $list.children('li');
        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.styledSelect.active').each(function() {
                $(this).removeClass('active').next('ul.options').hide();
            });
            $(this).toggleClass('active').next('ul.options').toggle();
        });
        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
        });
        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });
    });
}

// Move block footer
function moveBlockFooter() {
    if ($(window).width() < 768) { 
        $('#footer-wrapper .contact').remove().insertAfter("#footer-wrapper .columns.list-link");
    }
}

// Slider for Webshop Media
function sliderMediaWebshop() {
    var realSlider = $("ul#bxslider-product").bxSlider({
        speed: 800,
        pager: false,
        // infiniteLoop: false,
        hideControlOnEnd: true,
        nextText: '<span><i class="fa fa-chevron-right"></i></span>',
        prevText: '<span><i class="fa fa-chevron-left"></i></span>',
        onSlideBefore: function($slideElement, oldIndex, newIndex) {
            changeRealThumb(realThumbSlider, newIndex);
        }
    });

    var realThumbSlider = $("ul#bxslider-product-pager").bxSlider({
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 76,
        slideMargin: 6,
        moveSlides: 1,
        pager: false,
        speed: 800,
        // infiniteLoop: false,
        hideControlOnEnd: true,
        nextText: '',
        prevText: '',
        onSlideBefore: function($slideElement, oldIndex, newIndex) {
            /*$j("#sliderThumbReal ul .active").removeClass("active");
            $slideElement.addClass("active"); */

        }
    });
    linkRealSliders(realSlider, realThumbSlider);

    if ($("#bxslider-product-pager li").length < 5) {
        $(".bx-controls-direction").hide();
    }
}

// sincronizza sliders realizzazioni
function linkRealSliders(bigS, thumbS) {

    $("ul#bxslider-product-pager").on("click", "a", function(event) {
        event.preventDefault();
        var newIndex = $(this).parent().attr("data-slideIndex");
        bigS.goToSlide(newIndex);
    });
}

//slider!=$thumbSlider. slider is the realslider
function changeRealThumb(slider, newIndex) {

    var $thumbS = $("#bxslider-product-pager");
    $thumbS.find('.active').removeClass("active");
    $thumbS.find('li[data-slideIndex="' + newIndex + '"]').addClass("active");

    if (slider.getSlideCount() - newIndex >= 4) slider.goToSlide(newIndex);
    else slider.goToSlide(slider.getSlideCount() - 4);

    //if (slider.getSlideCount() 

}

// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();
