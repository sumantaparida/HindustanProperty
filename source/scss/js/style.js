/*
 Theme Name: Sumanta
 Description: HP
 Author: HP
 Author: HP
 Version: 1.0
 */
var nice = false;
(function($){
"use strict";

    var houzez_rtl = HOUZEZ_ajaxcalls_vars.houzez_rtl;

    if( houzez_rtl == 'yes' ) {
        houzez_rtl = true;
    } else {
        houzez_rtl = false;
    }

    $('[data-toggle="popover"]').popover({
        trigger: "hover",
        html: true,
    });

    /* ------------------------------------------------------------------------ */
    /*  BODY LOAD
     /* ------------------------------------------------------------------------ */
    $(window).on('load',function(){
        jQuery('body').addClass('loaded');
    });

    /* ------------------------------------------------------------------------ */
    /*  IF HEADER OR SEARCH STICKY
     /* ------------------------------------------------------------------------ */
    var ifHeaderSticky = $('#header-section').data('sticky');
    var ifHeaderBottomSticky = $('#header-section .header-bottom').data('sticky');
    var ifAdvanceSearchSticky = $('.advance-search-header').data('sticky');

    if(ifHeaderSticky == 1 && ifAdvanceSearchSticky == 0){
        var stickyHeaderH = $('#header-section').innerHeight();
        var topMargin = stickyHeaderH;
    }
    if(ifAdvanceSearchSticky == 1 && ifHeaderSticky == 0){
        var stickyAdvanceSearchH = $('.advance-search-header').innerHeight();
        var topMargin = stickyAdvanceSearchH;
    }
    if(ifHeaderBottomSticky == 1 && ifAdvanceSearchSticky == 0){
        var stickyHeaderH = $('#header-section .header-bottom').innerHeight();
        var topMargin = stickyHeaderH;
    }

    if(ifAdvanceSearchSticky == 1 && ifHeaderBottomSticky == 0){
        var stickyAdvanceSearchH = $('.advance-search-header').innerHeight();
        var topMargin = stickyAdvanceSearchH;

    }
    if(ifAdvanceSearchSticky == 0 && ifHeaderBottomSticky == 0){
        var topMargin = 0;
    }
    if(ifHeaderSticky == 0 && ifAdvanceSearchSticky == 0){
        var topMargin = 0;
    }

    if($('#header-section').hasClass('header-section-3') && ifHeaderBottomSticky == 1){
        var stickyHeaderH = $('#header-section .header-bottom').innerHeight();
        var topMargin = stickyHeaderH;
    }

    if($('#header-section').hasClass('header-section-3') && ifAdvanceSearchSticky == 1){
        var stickyAdvanceSearchH = $('.advance-search-header').innerHeight();
        var topMargin = stickyAdvanceSearchH;
    }

    if($('#header-section').hasClass('header-section-2') && ifHeaderBottomSticky == 1){
        var stickyHeaderH = $('#header-section .header-bottom').innerHeight();
        var topMargin = stickyHeaderH;
    }

    if($('#header-section').hasClass('header-section-2') && ifAdvanceSearchSticky == 1){
        var stickyAdvanceSearchH = $('.advance-search-header').innerHeight();
        var topMargin = stickyAdvanceSearchH;
    }

    /* ------------------------------------------------------------------------ */
    /*  PROPERTY MENU TARGET NAV
     /* ------------------------------------------------------------------------ */
    var propertyMenuH = $('.property-menu-wrap').innerHeight();
    if($('.detail-media').length) {
        $(".target").each(function () {
            $(this).on('click', function (e) {
                var jump = $(this).attr("href");
                var scrollto = ($(jump).offset().top);
                scrollto = scrollto - (topMargin) - (propertyMenuH);
                $("html, body").animate({scrollTop: scrollto}, {duration: 1000, easing: 'easeInOutExpo', queue: false});
                e.preventDefault();
            });

        });
    }
    if($('.detail-media').length) {
        $(window).on('scroll', function () {
            $('.target-block').each(function () {
                if ($(window).scrollTop() >= $(this).offset().top - (topMargin) - (propertyMenuH)) {
                    var id = $(this).attr('id');
                    $('.target').removeClass('active');
                    $('.target[href=#' + id + ']').addClass('active');
                } else if ($(window).scrollTop() <= 0) {
                    $('.target').removeClass('active');
                }
            });
        });
    }
    $(".back-top").on('click',function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

    /* ------------------------------------------------------------------------ */
    /*  PROPERTY MENU STICKY
     /* ------------------------------------------------------------------------ */
    if($('.detail-media').length){
        $(window).on('scroll', function() {
            if($(window).scrollTop() >= $('.detail-media').offset().top + (200)) {
                $('.property-menu-wrap').css({top:topMargin}).fadeIn();
            }else if($(window).scrollTop() <= $('.detail-media').offset().top + (200)) {
                $('.property-menu-wrap').css({top:topMargin}).fadeOut();
            }
        });
    }


    /* ------------------------------------------------------------------------ */
    /*  One page smooth scroll
     /* ------------------------------------------------------------------------ */
    $(function() {
        $('#header-section a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

    $('#commentform input.submit').addClass('btn btn-primary');
    $('.widget_nav_menu, .widget_pages').addClass('widget-pages');
    $('.footer-widget.widget_mc4wp_form_widget').addClass('widget-newsletter');

    $('.blog-article .pagination-main ul.pagination a').wrap('<li></li>');


    /* ------------------------------------------------------------------------ */
    /*  STICKY SIDEBAR
    /* ------------------------------------------------------------------------ */

    $('.houzez_sticky').theiaStickySidebar({
        additionalMarginTop: topMargin,
        minWidth: 768,
        updateSidebarHeight: false
    });

    /* ------------------------------------------------------------------------ */
    /*  Stripe
     /* ------------------------------------------------------------------------ */
    $('.houzez_stripe_simple button.stripe-button-el span, .houzez_upgrade_stripe button.stripe-button-el span').prepend('<i class="fa fa-credit-card"></i>');

    $('#selected_package').change(function(){
        var stripe_pack_id, stripe_ammount, the_pack;

        $( "#selected_package option:selected" ).each(function() {
            stripe_pack_id = $(this).val();
            stripe_ammount = parseFloat( $(this).attr('data-price')) * 100;
            the_pack = $(this).attr('data-pack');
        });

        $('#pack_id').val( stripe_pack_id );
        $('#pay_ammout').val(stripe_ammount);
        $('#houzez_stripe_form').attr('data-amount', stripe_ammount);

        $('.houzez_stripe_buttons').each(function(){
            $(this).hide();
            if( $(this).attr('id') === the_pack ) {
                $(this).show();
            }
        })

    });

    $('#package_recuring').click(function () {
        if( $(this).attr('checked') ) {
            $('#houzez_stripe_form').append('<input type="hidden" name="houzez_stripe_recurring" id="houzez_stripe_recurring" value="1">');
        }else{
            $('#houzez_stripe_recurring').remove();
        }
    });

    /* ------------------------------------------------------------------------ */
    /*  NICE SCROLL
     /* ------------------------------------------------------------------------ */
    /*var nice = $("html").niceScroll({
     //cursorcolor: "#666",
     scrollspeed: 50,
     mousescrollstep: 30,
     //boxzoom: false,
     //autohidemode: false,
     cursorborder: "0 solid #666",
     //cursorborderradius: "0",
     cursorwidth: 6,
     //background: "#666",
     //horizrailenabled: false
     });*/

    if( $('#houzez_mortgage_calculate').length > 0 ) {
        $('#houzez_mortgage_calculate').click(function(e) {
            e.preventDefault();

            var monthly_payment = HOUZEZ_ajaxcalls_vars.monthly_payment;
            var weekly_payment = HOUZEZ_ajaxcalls_vars.weekly_payment;
            var bi_weekly_payment = HOUZEZ_ajaxcalls_vars.bi_weekly_payment;
            var currency_symb = HOUZEZ_ajaxcalls_vars.currency_symbol;

            var totalPrice  = 0;
            var down_payment = 0;
            var term_years  = 0;
            var interest_rate = 0;
            var amount_financed  = 0;
            var monthInterest = 0;
            var intVal = 0;
            var mortgage_pay = 0;
            var annualCost = 0;
            var payment_period;
            var mortgage_pay_text;


            payment_period = $('#mc_payment_period').val();

            totalPrice = $('#mc_total_amount').val();
            down_payment = $('#mc_down_payment').val();
            amount_financed = totalPrice - down_payment;
            term_years =  parseInt ($('#mc_term_years').val(),10) * payment_period;
            interest_rate = parseFloat ($('#mc_interest_rate').val(),10);
            monthInterest = interest_rate / (payment_period * 100);
            intVal = Math.pow( 1 + monthInterest, -term_years );
            mortgage_pay = amount_financed * (monthInterest / (1 - intVal));
            annualCost = mortgage_pay * payment_period;

            if( payment_period == '12' ) {
                mortgage_pay_text = monthly_payment;

            } else if ( payment_period == '26' ) {
                mortgage_pay_text = bi_weekly_payment;

            } else if ( payment_period == '52' ) {
                mortgage_pay_text = weekly_payment;

            }

            $('#mortgage_mwbi').html("<h3>"+mortgage_pay_text+ ":<span> " +currency_symb+ (Math.round(mortgage_pay * 100)) / 100 + "</span></h3>");

            $('#amount_financed').html(currency_symb+(Math.round(amount_financed * 100)) / 100);
            $('#mortgage_pay').html(currency_symb+(Math.round(mortgage_pay * 100)) / 100);
            $('#annual_cost').html(currency_symb+(Math.round(annualCost * 100)) / 100);
            $('#total_mortgage_with_interest').html();
            $('.morg-detail').show();
        });
    }

    /* ------------------------------------------------------------------------ */
    /*  HEADER STICKY
    /* ------------------------------------------------------------------------ */

        var header_main = $('#header-section').data('sticky');
        var header_inner = $('#header-section .header-bottom').data('sticky');
        var header_mobile = $('.header-mobile').data('sticky');
        //var get_header_class = $('#header-section').attr('class');



        if(header_inner == 1){
            this_sticky($('#header-section .header-bottom'));
        }
        if(header_main == 1){
            this_sticky($('#header-section'));
        }
        if(header_mobile == 1){
            this_sticky($('.header-mobile'));

            //get_header_class = $('.header-mobile').attr('class');
        }

        function this_sticky(ele){
            var header_position = ele.outerHeight();
            var sticky_nav = ele.clone().removeAttr('style');
            var get_header_class = sticky_nav.attr('class');

            if($(sticky_nav).hasClass('header-bottom')){
                get_header_class = $('.header-bottom').parent('#header-section').attr('class');
            }
            //alert(get_header_class);
            sticky_nav.removeClass('houzez-header-transparent hidden-sm hidden-xs visible-sm visible-xs');

            var sticky_wrap = $(sticky_nav).wrap("<div class='sticky_nav'></div>").parent().addClass(get_header_class);
            sticky_wrap = sticky_wrap.removeClass('houzez-header-transparent nav-left hidden-sm hidden-xs visible-sm visible-xs');

            $('body').append( sticky_wrap );

            if($(sticky_wrap).hasClass('header-section-4')) {
                $('.sticky_nav .logo img').attr('src',HOUZEZ_ajaxcalls_vars.simple_logo);
            }

            function fix_header(){

                if($('#wpadminbar').length > 0 && getWindowWidth() > 600) {
                    var admin_bar_height = $('#wpadminbar').outerHeight();
                    sticky_wrap.css( 'top', admin_bar_height );
                }else{
                    sticky_wrap.css( 'top', '0' );
                }
                if(getWindowWidth() > 991){
                    $('.sticky_nav.houzez-header-mobile').hide();
                }else{
                    $('.sticky_nav.houzez-header-main').hide();
                }
            }

            $(window).on('scroll', function(){
                if($('#wpadminbar').length > 0 && getWindowWidth() > 600) {
                    var admin_bar_height = $('#wpadminbar').outerHeight();
                    sticky_wrap.css( 'top', admin_bar_height );
                }
                if( $(window).scrollTop() >= ele.position().top + header_position ){
                    sticky_wrap.slideDown();
                }
                else{
                    sticky_wrap.fadeOut();
                }
            });

            fix_header();
            $(window).resize(function(){
                fix_header();
            });
        }

    /* ------------------------------------------------------------------------ */
    /*  ADVANCE SEARCH STICKY
    /* ------------------------------------------------------------------------ */
    function advancedSearchSticky() {
        if(getWindowWidth() > 991){
            var search = $('.advance-search-header');
            var thisHeight = $('.advance-search-header').outerHeight();
        }else{
            var search = $('.advanced-search-mobile');
            var thisHeight = $('.advanced-search-mobile').outerHeight();
        }
        if (!search.data('sticky')) {
            return;
        }

        if( $(".splash-search")[0] ) {
            var sr_sticky_top = $('.splash-search').offset().top;
            sr_sticky_top = sr_sticky_top + 200;
        } else {
            if(getWindowWidth() > 991){
                var sr_sticky_top = $('.advance-search-header').offset().top + 65;
            }else{
                var sr_sticky_top = $('.advanced-search-mobile').offset().top;
            }
        }

        if( sr_sticky_top == 0 ) {
            sr_sticky_top = $('#header-section').height();
        }

        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            var admin_nav = $('#wpadminbar').height() + 'px';
            //var ser = $(".banner-search-main").offset().top - 100;
            var ser = 500;
            //if( admin_nav == 'nullpx' ) { admin_nav = '0px'; }
            if (scroll >= ser ) {
                search.addClass("advanced-search-sticky");
                //search.css('top', admin_nav);
                //$('#section-body').css('padding-top',thisHeight);
            } else {
                search.removeClass("advanced-search-sticky");
                //search.removeAttr("style");
                //$('#section-body').css('padding-top',111);
            }
        });
    }
    advancedSearchSticky();

    /* ------------------------------------------------------------------------ */
    /*  Date picker
     /* ------------------------------------------------------------------------ */
    if($('.input_date').length > 0) {
        $('.input_date').datetimepicker({
            format: 'YYYY-MM-DD',//'DD/MM/YYYY',
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-arrow-up",
                down: "fa fa-arrow-down",
                left: "fa fa-arrow-left"
            }
        });
    }
    if($('.search-date').length > 0) {
        $('.search-date').datetimepicker({
            format: 'YYYY-MM-DD',//'DD/MM/YYYY',
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-arrow-up",
                down: "fa fa-arrow-down",
                left: "fa fa-arrow-left"
            }
        });
    }

    /* ------------------------------------------------------------------------
     /*  parallax
     ------------------------------------------------------------------------- */
    $('.banner-parallax').parallax("50%", 0.3);
    function enable_parallax(){
        if(getWindowWidth() > 767){
            $('.banner-inner').addClass('banner-parallax');
        }else{
            $('.banner-inner').removeClass('banner-parallax');
        }
    }

    enable_parallax()
    /* ------------------------------------------------------------------------ */
    /*  DETAIL LIGHT BOX SLIDE SHOW
     /* ------------------------------------------------------------------------ */
    if($("a[data-fancy^='property_video']").length > 0) {
        $("a[data-fancy^='property_video']").prettyPhoto({
            allow_resize: true,
            default_width: 900,
            default_height: 500,
            animation_speed: 'normal',
            theme: 'default',
            slideshow: 3000,
            autoplay_slideshow: false,
        });
    }

    /* ------------------------------------------------------------------------ */
    /*  Properties filter on My properties dashboard
     /* ------------------------------------------------------------------------ */
    $("#property_name").keyup(function(){

        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val(), count = 0;

        // Loop through the comment list
        $(".my-property-listing .item-wrap").each(function(){

            // If the list item does not contain the text phrase fade it out
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();

                // Show the list item if the phrase matches and increase the count by 1
            } else {
                $(this).show();
                count++;
            }
        });

        // Update the count
        var numberItems = count;
        $(".my-property-search button").text(count);
    });

    /* ------------------------------------------------------------------------ */
    /*	SEARCH TABER
    /* ------------------------------------------------------------------------ */
    $('.banner-search-tabs .search-tab').on('click',function(){
        if($(this).hasClass('active')!=true){
            $('.banner-search-tabs .search-tab').removeClass('active');
            $(this).addClass('active');
            $('.banner-search-taber .tab-pane').removeClass('active in');
            $('.banner-search-taber .tab-pane').eq($(this).index()).addClass('active').delay(5).queue(function(next){
                $(this).addClass('in');
                next();
            });
        }
    });

    /* ------------------------------------------------------------------------ */
    /* PROPERTY DETAIL TABBER
    /* ------------------------------------------------------------------------ */
    $('.detail-tabs > li').on('click',function(){

        if($(this).hasClass('active')!=true){
            $('.detail-tabs > li').removeClass('active');
            $(this).addClass('active');
            $('.detail-content-tabber .tab-pane').removeClass('active in');
            $('.detail-content-tabber .tab-pane').eq($(this).index()).addClass('active in');
        }
    });

    /* ------------------------------------------------------------------------ */
    /* PROFILE DETAIL TABBER
    /* ------------------------------------------------------------------------ */
    $('.profile-tabs > li').on('click',function(){
        if($(this).hasClass('active')!=true){
            $('.profile-tabs > li').removeClass('active');
            $(this).addClass('active');
            $('.profile-tab-pane').removeClass('active in');
            $('.profile-tab-pane').eq($(this).index()).addClass('active in');
        }
    });

    /* ------------------------------------------------------------------------ */
    /*	LOGIN TABBER
    /* ------------------------------------------------------------------------ */
    function houzez_tabber(target){
        $(""+target+""+' .login-tabs > li').on('click',function(){
            if($(this).hasClass('active')!=true){
                $('.login-tabs > li').removeClass('active');
                $(this).addClass('active');
                //alert('ok');
                $(""+target+""+' .login-block .tab-pane').removeClass('in active');
                $(""+target+""+' .login-block .tab-pane').eq($(this).index()).addClass('in active');
            }
        });
    }
    houzez_tabber('.widget');
    houzez_tabber('.footer-widget');
    houzez_tabber('.modal');

    /* ------------------------------------------------------------------------ */
    /*  ACCORDIAN ADD PROPERTY
     /* ------------------------------------------------------------------------ */

    $('.add-title-tab > .add-expand').click(function() {
        $(this).toggleClass('active');
        $(this).parent().next('.add-tab-content').slideToggle();
    });


    /* ------------------------------------------------------------------------ */
    /*  ACCORDIAN
     /* ------------------------------------------------------------------------ */

    $('.accord-tab > .expand-icon').click(function() {
        if($(this).hasClass('active')!=true)
        {
            $('.accord-tab > .expand-icon').removeClass('active');
            $(this).addClass('active');

            $('.accord-tab > .expand-icon').parent().next('.accord-content').slideUp();
            $(this).parent().next('.accord-content').slideDown();

        }
    });

    /* ------------------------------------------------------------------------ */
    /*  MAP VIEW TABBER
     /* ------------------------------------------------------------------------ */
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        e.target // newly activated tab
        e.relatedTarget // previous active tab
    });

    /* ------------------------------------------------------------------------ */
    /*  BOOTSTRAP SELECT PICKER
     /* ------------------------------------------------------------------------ */
    if($('.selectpicker').length > 0){
        $('.selectpicker').selectpicker({
            dropupAuto: false,
        });
    }

    /* ------------------------------------------------------------------------ */
    /*  POST CARDS MASONRY
     /* ------------------------------------------------------------------------ */
    $(window).on('load',function(){
        if($('.grid-block').length > 0){
            $('.grid-block').isotope({
                // options
                itemSelector: '.grid-item',
                //layoutMode: 'fitRows'
            });
        }
    });

    /* ------------------------------------------------------------------------ */
    /*  TOOLTIP
     /* ------------------------------------------------------------------------ */

    $('[data-toggle="tooltip"]').tooltip();

    /* ------------------------------------------------------------------------ */
    /*  SHARE TOOLTIP
     /* ------------------------------------------------------------------------ */
    $('.actions li').on('click',function(){

        if($(this).children('.share_tooltip').hasClass('in')){
            $(this).children('.share_tooltip').removeClass('in');
        }else{
            $('.actions li').children('.share_tooltip').removeClass('in');
            $(this).children('.share_tooltip').addClass('in');
        }

    });
    $(document).mouseup(function (e)
    {
        var tip = $(".share-btn");

        if (!tip.is(e.target) // if the target of the click isn't the container...
            && tip.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $('.share_tooltip').removeClass('in');
        }
    });

    /* ------------------------------------------------------------------------ */
    /*  SET COLUMNS HEIGHT
     /* ------------------------------------------------------------------------ */
    if($('.footer-widget').length > 0){
        $('.footer-widget').matchHeight();
    };

    if($('.grid').length > 0) {
        $('.grid').each(function () {
            $(this).children().find('img').matchHeight({
                byRow: true,
                property: 'height',
                target: null,
                remove: false
            });
        });
    }
    //if($('.grid-view').length > 0) {
    /*$(window).load(function(){
     $('.post-card-description').matchHeight();
     });*/
    //}

    /* ------------------------------------------------------------------------ */
    /*  NAVIGATION
     /* ------------------------------------------------------------------------ */
    $('.navi ul li').each(function(){
        $(this).has('ul').addClass('has-child')
    });

    $('.navi ul .has-child').hover(
        function(){
            $(this).addClass("active");
        },
        function(){
            $(this).removeClass("active");
        }
    );


    /* ------------------------------------------------------------------------ */
    /*  CHANGE GRID LIST
     /* ------------------------------------------------------------------------ */
    $('.view-btn').on("click",function(){
        $('.view-btn').removeClass('active');
        $(this).addClass('active');
        if($(this).hasClass('btn-list')) {
            $('.property-listing').removeClass('grid-view grid-view-3-col').addClass('list-view');
        }
        else if($(this).hasClass('btn-grid')) {
            $('.property-listing').removeClass('list-view grid-view-3-col').addClass('grid-view');
        }
        else if($(this).hasClass('btn-grid-3-col')) {
            $('.property-listing').removeClass('list-view grid-view').addClass('grid-view grid-view-3-col');

        }
    });

    /* ------------------------------------------------------------------------ */
    /*  SECTION HEIGHT
    /* ------------------------------------------------------------------------ */
    function bg_image_size(size,url){
        var get_url = url,image;
        if(get_url) {
            // Remove url() or in case of Chrome url("")
            get_url = get_url.match(/^url\("?(.+?)"?\)$/);

            if (get_url[1]) {
                get_url = get_url[1];
                image = new Image();
                image.src = get_url;
                if (size == 'height') {
                    return image.height;
                } else {
                    return image.width;
                }
            }
        }
    }

    function setSectionHeight() {
        var section = $('body');
        var windowHeight = getWindowHeight();
        var windowWidth = getWindowWidth();

        var admin_bar_height = $('#wpadminbar').innerHeight();
        var innerHeaderH = $('.header-section').innerHeight();
        var outerHeaderH = $('#header-section').innerHeight();
        var splashFootH = $('.splash-footer').innerHeight();
        var advancedSearchH = $('.advance-search-header').innerHeight();
        var topbarH = $('.top-bar').innerHeight();
        var searchH = (windowHeight-innerHeaderH)-splashFootH;

        $('.fave-screen-fix-inner').css( 'height', searchH );

        if($('.advance-search-header').length
            && !$('.advance-search-header').hasClass('search-hidden')
            && $('#header-section').length) {
            var fixHeight = (windowHeight-advancedSearchH)-outerHeaderH;
        }/*else{
            var fixHeight = windowHeight-outerHeaderH;
        }*/
        if($('.advance-search-header').hasClass('search-hidden')
            && $('#header-section').is('*')) {
            var fixHeight = windowHeight-outerHeaderH;
        }
        if($('#header-section').length){
            fixHeight = windowHeight-outerHeaderH;
        }
        if($('#header-section').length
            && $('#wpadminbar').length){
            fixHeight = (windowHeight-outerHeaderH)-admin_bar_height;
        }
        if($('#header-section').length
            && $('#wpadminbar').length
            && $('.advance-search-header').length
            && !$('.advance-search-header').hasClass('search-hidden')){
            fixHeight = ((windowHeight-outerHeaderH)-admin_bar_height)-advancedSearchH;
        }
        if($('#header-section').length
            && $('#wpadminbar').length
            && $('.advance-search-header').length
            && !$('.advance-search-header').hasClass('search-hidden')
            && $('.top-bar').length){
            fixHeight = (((windowHeight-outerHeaderH)-admin_bar_height)-advancedSearchH)-topbarH;
        }
        if($('#header-section').length
            && $('#wpadminbar').length
            && $('.advance-search-header').length
            && $('.advance-search-header').hasClass('search-hidden')
            && $('.top-bar').length){
            fixHeight = ((windowHeight-outerHeaderH)-admin_bar_height)-topbarH;
        }
        if($('#header-section').length
            && $('#wpadminbar').length
            && $('.top-bar').length){
            fixHeight = ((windowHeight-outerHeaderH)-admin_bar_height)-topbarH;
        }
        if($('#header-section').length
            && $('.top-bar').length){
            fixHeight = (windowHeight-outerHeaderH)-topbarH;
        }
        $('.fave-screen-fix').css( 'height', fixHeight );


        if(getWindowWidth() > 768){
            var image_url = $('.banner-inner').css('background-image');
            if(image_url != 'none'){
                var bg_height = $('.banner-parallax-fix').width() * bg_image_size('height',image_url) / bg_image_size('width',image_url);
                if(bg_height > getWindowHeight()){
                    $('.banner-parallax-fix').css( 'height', fixHeight );
                }else{
                    //alert(bg_height);
                    $('.banner-parallax-fix').css( 'height', bg_height-110 );
                }
            }else{
                $('.banner-parallax-fix').css( 'height', fixHeight );
            }
        }else{
            if($('.banner-inner').hasClass('banner-parallax-fix')){
                $('.banner-parallax-fix').css( 'height', 300 );
            }else{
                $('.banner-inner').css( 'height', 300 );
            }
        }
    }

    setSectionHeight();

    $(window).on('resize', function () {
        enable_parallax();
        setSectionHeight();
        advancedSearchSticky();
    });

    /* ------------------------------------------------------------------------ */
    /*  GET WINDOWS WIDTH HEIGHT
     /* ------------------------------------------------------------------------ */
    function getWindowWidth() {
        return Math.max( $(window).width(), window.innerWidth);
    }

    function getWindowHeight() {
        return Math.max( $(window).height(), window.innerHeight);
    }

    /* ------------------------------------------------------------------------ */
    /*  ADVANCE DROPDOWN
     /* ------------------------------------------------------------------------ */
    $('.search-expand-btn').on('click',function(){
        $(this).toggleClass('active');
        if($(this).hasClass('active')==true)
        {
            $('.search-expandable .advanced-search').slideDown();
        }else
        {
            $('.search-expandable .advanced-search').add('.search-expandable .advance-fields').slideUp();
            $('.advance-btn').removeClass('active');

        }
    });
    $('.advanced-search .advance-btn').on('click',function(){
        $(this).toggleClass('active');
        if($(this).hasClass('active')==true)
        {
            $(this).closest('.advanced-search').find('.advance-fields').slideDown();
        }else
        {
            $(this).closest('.advanced-search').find('.advance-fields').slideUp();
        }
    });

    $('.advanced-search-mobile .advance-btn').on('click',function(){
     $(this).toggleClass('active');
     if($(this).hasClass('active')==true)
     {
         $(this).closest('.advanced-search-mobile').find('.advance-fields').slideDown();
     }else
     {
         $(this).closest('.advanced-search-mobile').find('.advance-fields').slideUp();
     }
     });

    $('.advance-trigger').on('click',function(){
        $(this).toggleClass('active');
        if($(this).hasClass('active')==true)
        {
            $(this).children('i').removeClass('fa-plus-square').addClass('fa-minus-square');
            $('.field-expand').slideDown();
        }else
        {
            $(this).children('i').removeClass('fa-minus-square').addClass('fa-plus-square');
            $('.field-expand').slideUp();
        }
    });

    /* ------------------------------------------------------------------------ */
    /*  SLIDER initialized
    /* ------------------------------------------------------------------------ */
    var all_slider = $('#banner-slider, .carousel, .lightbox-slide, .property-widget-slider, .houzez-impress-listing-carousel');
    all_slider.on('initialized.owl.carousel', function(event) {
        setTimeout(function(){
            all_slider.animate({opacity: 1}, 800);
            $('.gallery-area .slider-placeholder').remove();
        },800);
    });

    /* ------------------------------------------------------------------------ */
    /*  BANNER SLIDER
     /* ------------------------------------------------------------------------ */
    if($("#banner-slider").length > 0){
        var owl_main_slider = $('#banner-slider');

        owl_main_slider.owlCarousel({
            rtl: houzez_rtl,
            loop: true,
            dots: false,
            slideBy: 1,
            autoplay: true,
            autoplaySpeed: 700,
            items:1,
            smartSpeed: 1000,
            nav: true,
            navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            addClassActive: true,
            callbacks: true,
        });
    }

    /* ------------------------------------------------------------------------ */
    /*  OWL CAROUSEL
     /* ------------------------------------------------------------------------ */
    if($("#carousel-post-card").length > 0) {

        var owl_post_card = $('#carousel-post-card');

        owl_post_card.owlCarousel({
            rtl: houzez_rtl,
            loop: true,
            dots: true,
            autoplay: true,
            autoplaySpeed: 700,
            slideBy: 1,
            nav: false,
            responsive:{
                0: {
                    items: 1
                },
                320: {
                    items: 1
                },
                480: {
                    items: 1
                },
                768: {
                    items: 2
                },
                1000: {
                    items: 3
                },
                1280: {
                    items: 4
                }
            }
        });

        $('.btn-prev-post-card').on('click',function() {
            owl_post_card.trigger('prev.owl.carousel',[700])
        });
        $('.btn-next-post-card').on('click',function() {
            owl_post_card.trigger('next.owl.carousel',[700])
        });

    }
    if($("#carousel-post-card-block").length > 0) {

        var owl_post_block = $('#carousel-post-card-block');

        owl_post_block.owlCarousel({
            rtl: houzez_rtl,
            loop: true,
            dots: true,
            autoplay: true,
            autoplaySpeed: 700,
            slideBy: 1,
            nav: false,
            responsive:{
                0: {
                    items: 1
                },
                320: {
                    items: 1
                },
                480: {
                    items: 1
                },
                768: {
                    items: 2
                },
                1000: {
                    items: 3
                },
                1280: {
                    items: 4
                }
            }
        });

        $('.btn-prev-card-block').on('click',function() {
            owl_post_block.trigger('prev.owl.carousel',[700])
        });
        $('.btn-next-card-block').on('click',function() {
            owl_post_block.trigger('next.owl.carousel',[700])
        });

    }

    if($("#agents-carousel").length > 0){

        var owlAgents = $('#agents-carousel');
        owlAgents.owlCarousel({
            rtl: houzez_rtl,
            loop: true,
            dots: false,
            slideBy: 1,
            autoplay: true,
            autoplaySpeed: 700,
            nav: false,
            responsive:{
                0: {
                    items: 1
                },
                320: {
                    items: 1
                },
                480: {
                    items: 1
                },
                768: {
                    items: 2
                },
                1000: {
                    items: 3
                },
                1280: {
                    items: 4
                }
            }
        });

        $('.btn-prev-agents').on('click',function() {
            owlAgents.trigger('prev.owl.carousel',[700])
        });
        $('.btn-next-agents').on('click',function() {
            owlAgents.trigger('next.owl.carousel',[700])
        });

    }
    if($("#partner-carousel").length > 0) {

        $("#partner-carousel").owlCarousel({
            rtl: houzez_rtl,
            loop: true,
            dots: true,
            slideBy: 2,
            autoplay: true,
            autoplaySpeed: 700,
            nav:false,
            responsive:{
                0: {
                    items: 1
                },
                320: {
                    items: 1
                },
                480: {
                    items: 3
                },
                768: {
                    items: 4
                },
                992: {
                    items: 4
                }
            }
        });

        $('.btn-prev-partners').on('click',function() {
            $("#partner-carousel").trigger('prev.owl.carousel',[700])
        });
        $('.btn-next-partners').on('click',function() {
            $("#partner-carousel").trigger('next.owl.carousel', [700])
        });

    }

    if($(".property-widget-slider").length > 0) {
        $('.property-widget-slider').owlCarousel({
            rtl: houzez_rtl,
            dots: true,
            items: 1,
            smartSpeed: 700,
            slideBy: 1,
            nav: true,
            navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
        });
    }

    /* ------------------------------------------------------------------------ */
    /*  Change listing fee for featured
     /* ------------------------------------------------------------------------ */
    $('.prop_featured').change( function() {
        var parent = $(this).parents('table');
        var buttons_main_parent = $(this).parents('.houzez-per-listing-buttons-main');
        var price_regular  = parseFloat( parent.find('.submission_price').text() );
        var price_featured = parseFloat( parent.find('.submission_featured_price').text() );

        var total_price = price_regular+price_featured;
        if( $(this).is(':checked') ) {
            parent.find('.submission_total_price').text(total_price);
            buttons_main_parent.find('#stripe_form_simple_listing').hide();
            buttons_main_parent.find('#stripe_form_featured_listing').show();
        } else {
            parent.find('.submission_total_price').text(price_regular);
            buttons_main_parent.find('#stripe_form_featured_listing').hide();
            buttons_main_parent.find('#stripe_form_simple_listing').show();
        }

    });

    /* ------------------------------------------------------------------------ /
     /* PAY DROPDOWN
     / ------------------------------------------------------------------------ */
    $('.my-actions .pay-btn').on('click', function (event) {
        if($(this).parent().hasClass("open")!=true) {
            $('.my-actions .pay-btn').parent().removeClass("open");
            $(this).parent().addClass("open");
        } else {
            $(this).parent().removeClass("open");
        }
    });
    $('body').on('click', function (e) {
        if (!$('.my-actions .pay-btn').is(e.target) && $('.my-actions .pay-btn').has(e.target).length === 0 && $('.open').has(e.target).length === 0) {
            $('.my-actions .pay-btn').parent().removeClass('open');
        }
    });

    /*-----------------------------------------------------------------------------------*/
    /* PROPERTIES SORTING
     /*-----------------------------------------------------------------------------------*/
    function insertParam(key, value) {
        key = encodeURI(key);
        value = encodeURI(value);

        // get querystring , remove (?) and covernt into array
        var qrp = document.location.search.substr(1).split('&');

        // get qrp array length
        var i = qrp.length;
        var j;
        while (i--) {
            //covert query strings into array for check key and value
            j = qrp[i].split('=');

            // if find key and value then join
            if (j[0] == key) {
                j[1] = value;
                qrp[i] = j.join('=');
                break;
            }
        }

        if (i < 0) {
            qrp[qrp.length] = [key, value].join('=');
        }
        // reload the page
        document.location.search = qrp.join('&');

    }

    $('#sort_properties').on('change', function() {
        var key = 'sortby';
        var value = $(this).val();
        insertParam( key, value );
    });

    /* ------------------------------------------------------------------------ */
    /*  ACCOUNT DROPDOWN
     /* ------------------------------------------------------------------------ */

    function accountDropdown(){
        if ($(window).width() < 992){
            $(".account-action > li").off('mouseenter'); //Remove mouseenter event listeners
            $(".account-action > li").off('mouseleave'); //Remove mouseleave event listeners
            $('.account-action > li').on('click',function(e){
                //e.preventDefault();
                //$('.nav-trigger').removeClass('mobile-open');
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                }else{
                    //$('.account-action > li').removeClass('active');
                    $(this).addClass('active');
                }
            });
        }
        if ($(window).width() > 992){
            $(".account-action > li").off('click'); //Remove click event listeners
            $(".account-action > li").on({
                mouseenter: function (e) {
                    //e.preventDefault();
                    //$('.nav-trigger').removeClass('mobile-open');
                    $(this).addClass('active');
                },
                mouseleave: function (e) {
                    //e.preventDefault();
                    $(this).removeClass('active');
                }
            });
        }
    }
    var id;
    $(window).resize(function() {
        clearTimeout(id);
        id = setTimeout(accountDropdown, 0);
    });

    accountDropdown();

    /* ------------------------------------------------------------------------ */
    /*  MOBILE MENU
    /* ------------------------------------------------------------------------ */
    function mobileMenu(menu_html,menu_place){
        var siteMenu = $(menu_html).html();
        $(menu_place).html(siteMenu);

        $(menu_place+' ul li').each(function(){
            $(this).has('ul').addClass('has-child');
        });

        $(menu_place+' ul .has-child').append('<span class="expand-me"></span>');

        $(menu_place+' .expand-me').on('click',function(){
            var parent = $(this).parent('li');
            if(parent.hasClass('active')==true){
                parent.removeClass('active');
                parent.children('ul').slideUp();
            }else{
                parent.addClass('active');
                parent.children('ul').slideDown();
            }
        });
    }
    mobileMenu('.main-nav','.main-nav-dropdown');
    mobileMenu('.top-nav','.top-nav-dropdown');
    mobileMenu('.top-nav','.top-nav-dropdown');

    // Dropdown open and hide when click on mobile menu Icon.
    $('.nav-trigger').on('click',function(){
        if($(this).hasClass('mobile-open')){
            $(this).removeClass('mobile-open');
        }else{
            $(this).addClass('mobile-open');
        }
    });

    // if single page mobile menu. dropdown will hide on click the tab.
    if($('.header-single-page').length > 0){
        $('.header-single-page .main-nav-dropdown li a').on('click',function(e){
            $('.nav-trigger').removeClass('mobile-open');
            //e.preventDefault();
        });
    }

    // Hide dropdowns when click on body area.
    function element_hide(ele,ele_class){
        $(document).mouseup(function (e)
        {
            var nav_trigger = $(ele);
            if (!nav_trigger.is(e.target) // if the target of the click isn't the container...
                && nav_trigger.has(e.target).length === 0 // ... nor a descendant of the container
                && !$('.nav-dropdown').is(e.target)
                && $('.nav-dropdown').has(e.target).length === 0
                && !$('.account-dropdown').is(e.target)
                && $('.account-dropdown').has(e.target).length === 0)
            {
                $(ele).removeClass(ele_class);
            }
        });
    }

    element_hide('.header-mobile .nav-trigger','mobile-open');
    element_hide('.top-bar .nav-trigger','mobile-open');
    element_hide('.account-action li','active');

    /* ------------------------------------------------------------------------ */
    /*  MORTGAGE CALCULATOR SHOW RESULTS
    /* ------------------------------------------------------------------------ */
    $('.show-morg').on('click',function () {
        if($(this).hasClass('active')){
            $('.morg-summery').slideUp();
            $(this).removeClass('active');
        }else{
            $('.morg-summery').slideDown();
            $(this).addClass('active');
        }
    });

    /* ------------------------------------------------------------------------ */
    /*  DETAIL LIGHT BOX SLIDE SHOW
     /* ------------------------------------------------------------------------ */
    function lightBoxSlide() {
        $('.lightbox-slide').show(function(){
            $('.lightbox-slide').owlCarousel({
                autoPlay : 3000,
                rtl: houzez_rtl,
                dots: false,
                items: 1,
                smartSpeed: 700,
                slideBy: 1,
                nav: true,
                stopOnHover : true,
                autoHeight : true,
                navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            });
        });
    }
    $('.lightbox-slide').on('resized.owl.carousel', function (event) {
        var $this = $(this);
        $this.find('.owl-height').css('height', $this.find('.owl-item.active').height());
    });

    /* ------------------------------------------------------------------------ */
    /*  LIGHT BOX
     /* ------------------------------------------------------------------------ */

    var popupRightWidth = $('.lightbox-right').innerWidth();

    function lightBox(){
        $('.popup-trigger').on('click',function(){
            $('#lightbox-popup-main').addClass('active').addClass('in');
        });
        $('.lightbox-close').on('click',function(){
            $('#lightbox-popup-main').removeClass('active').removeClass('in');
        });
    }
    lightBox();

    function popupResize(){
        var popupWidth = getPopupWidth()-60;
        $('.lightbox-popup').css('width',popupWidth);

        if($('.lightbox-right').length > 0){

            var popupRightWidth = $('.lightbox-right').innerWidth();

            $('.lightbox-left').css('width', (popupWidth - popupRightWidth));
            $('.gallery-inner').css('width', (popupWidth - popupRightWidth)-40);
            $('.lightbox-right').addClass('in');
            $('.lightbox-left .lightbox-close').removeClass('show');
            //$('.lightbox-left .expand-icon').hide('show');

            if (Modernizr.mq('(max-width: 1199px)')) {
                $('.expand-icon').removeClass('compress');
                $('.popup-inner').removeClass('pop-expand');
            }
            if (Modernizr.mq('(max-width: 1024px)')) {
                $('.lightbox-left').css('width', '100%');
                $('.lightbox-right').removeClass('in');
                $('.gallery-inner').css('width', '100%');
                $('.expand-icon').addClass('compress');
                $('.lightbox-left .lightbox-close').addClass('show');
            }
        }else{
            $('.lightbox-left').css('width', '100%');
            $('.gallery-inner').css('width', '100%');
            $('.lightbox-left .lightbox-close').addClass('show');
            $('.lightbox-left .expand-icon').hide('show');
        }
    }
    popupResize();
    function popForm_hide_show(){
        $('.expand-icon').on('click',function(){
            $('.lightbox-left .lightbox-close').toggleClass('show');
            var popupWidth = getPopupWidth();
            var popWidthTotal = (getPopupWidth()-60) - popupRightWidth;

            if(popupWidth >= 1024){
                if($(this).hasClass('compress')){
                    $('.lightbox-right').addClass('in');
                    $('.lightbox-left').css('width', popWidthTotal);
                    $('.expand-icon').removeClass('compress');
                    $('.popup-inner').removeClass('pop-expand');
                }else{
                    $('.lightbox-left').css('width', '100%');
                    $('.lightbox-right').removeClass('in');
                    $('.expand-icon').addClass('compress');
                    $('.popup-inner').addClass('pop-expand');
                }
            }
            if(popupWidth <= 1024/* && popupWidth >= 768*/){
                //$('.lightbox-left').css('width', '100%');

                if ($(this).hasClass('compress')) {
                    $('.lightbox-right').addClass('in');
                    $('.lightbox-left').css('width', popWidthTotal);
                    $('.expand-icon').removeClass('compress');

                } else {
                    $('.lightbox-left').css('width', '100%');
                    $('.lightbox-right').removeClass('in');
                    $('.expand-icon').addClass('compress');
                }
            }
            if(popupWidth < 768){
                $('.lightbox-left').css('width', '100%');
                //alert('ok');
            }
        });
    }
    popForm_hide_show();


    /* ------------------------------------------------------------------------ */
    /*  GET lightbox WIDTH HEIGHT
    /* ------------------------------------------------------------------------ */
    function getPopupWidth() {
        return Math.max( $(window).width(), $(window).innerWidth());
    }
    function getPopupInnerWidth() {
        return Math.max( $('.popup-inner').width(), $('.popup-inner').innerWidth());
    }

    /* ------------------------------------------------------------------------ */
    /*  IDX LIST THUMB CLASSES
    /* ------------------------------------------------------------------------ */
    if($('.dsidx-prop-summary').length){
        $('.dsidx-prop-summary .dsidx-prop-title').next('div').addClass('item-thumb');
        $('.item-thumb a').addClass('hover-effect');
    }
    if($('.impress-showcase-photo').length) {
        $('.impress-showcase-photo').addClass('hover-effect');
    }

    $(window).on('load',function(){
        lightBoxSlide();
        popupResize();
    });

    $(window).on('resize', function () {
        popupResize();
    });

    $( document ).ready(function() {
        $('.tagcloud a').removeAttr('style');
    });
    // Price List
    priceList();
    function priceList(){
      var pClick = $(".price-list > a");
      var pClickList = $(".price-list > ul");
      pClick.on("click", function(){
        $(".property-type > ul").hide();
        pClickList.slideToggle(300, function(){
          // $('html').one('click',function() {
          //   pClickList.slideUp();
          // });
        });
        $("[data-input] > input").on("click", function(){
          var id = $(this).attr("data");
          var att = $("[data-price-list-left], [data-price-list-right]");
          att.hide();
          $("#" + id).show();
        });
      });
    }
    // Property Type
    propertyType();
    function propertyType(){
      var proClick = $(".property-type > a");
      var proClickList = $(".property-type > ul");
      proClick.on("click", function(){
        proClickList.stop(true,false).slideToggle(300, function(){
          //
          // $('html').one('click',function() {
          //   proClickList.slideUp();
          // });
        });
        //console.log("click");
        $(".price-list > ul").hide();
      });
    }
    // prop-category
    propcategory();
    function propcategory() {
      var propcategory = $(".prop-category > a");
      propcategory.on("click", function(event){
        event.stopPropagation();
        $(".price-list > ul").hide();
        $(".property-type > ul").hide();
        $(this).next("[data-category-block]").slideToggle(300);
        $("[data-category-block] > li").on("click", function(){
          var v = $(this).text()
          $("[data-dynamic]").html(v);
          $("[data-category-block]").slideUp();
        });
        //
        $('html').one('click',function() {
          $("[data-category-block]").slideUp();
        });
      });
    }
    // tab-search
    tabSearch();
    function tabSearch(){
      $("[tab-search] > li > a").on("click", function(){
        $("[tab-search] > li > a").removeClass("active");
        $(this).addClass("active");
      });
    }

})(jQuery);
