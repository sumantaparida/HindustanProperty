/**
 * Created by waqasriaz on 02/10/15.
 */

jQuery(document).ready(function ($) {
    "use strict";

    if ( typeof HOUZEZ_ajaxcalls_vars !== "undefined" ) {
        var houzezMap;
        var markers = new Array();
        var markerCluster = null;
        var current_marker = 0;

        var ajaxurl = HOUZEZ_ajaxcalls_vars.admin_url+ 'admin-ajax.php';
        var login_sending = HOUZEZ_ajaxcalls_vars.login_loading;
        var userID = HOUZEZ_ajaxcalls_vars.user_id;
        var login_redirect_type = HOUZEZ_ajaxcalls_vars.redirect_type
        var login_redirect = HOUZEZ_ajaxcalls_vars.login_redirect
        var prop_lat = HOUZEZ_ajaxcalls_vars.property_lat;
        var prop_lng = HOUZEZ_ajaxcalls_vars.property_lng;
        var paypal_connecting = HOUZEZ_ajaxcalls_vars.paypal_connecting;
        var process_loader_refresh = HOUZEZ_ajaxcalls_vars.process_loader_refresh;
        var process_loader_spinner = HOUZEZ_ajaxcalls_vars.process_loader_spinner;
        var process_loader_circle = HOUZEZ_ajaxcalls_vars.process_loader_circle;
        var process_loader_cog = HOUZEZ_ajaxcalls_vars.process_loader_cog;
        var success_icon = HOUZEZ_ajaxcalls_vars.success_icon;
        var confirm_message = HOUZEZ_ajaxcalls_vars.confirm;
        var is_singular_property = HOUZEZ_ajaxcalls_vars.is_singular_property;
        var property_map = HOUZEZ_ajaxcalls_vars.property_map;
        var property_map_street = HOUZEZ_ajaxcalls_vars.property_map_street;
        var currency_symb = HOUZEZ_ajaxcalls_vars.currency_symbol;
        var advanced_search_price_range_min = parseInt( HOUZEZ_ajaxcalls_vars.advanced_search_widget_min_price );
        var advanced_search_price_range_max = parseInt( HOUZEZ_ajaxcalls_vars.advanced_search_widget_max_price );
        var advanced_search_price_range_min_rent = parseInt( HOUZEZ_ajaxcalls_vars.advanced_search_min_price_range_for_rent );
        var advanced_search_price_range_max_rent = parseInt( HOUZEZ_ajaxcalls_vars.advanced_search_max_price_range_for_rent );
        var advanced_search_widget_min_area = parseInt( HOUZEZ_ajaxcalls_vars.advanced_search_widget_min_area );
        var advanced_search_widget_max_area = parseInt( HOUZEZ_ajaxcalls_vars.advanced_search_widget_max_area );
        var advanced_search_price_slide = HOUZEZ_ajaxcalls_vars.advanced_search_price_slide;
        var fave_page_template = HOUZEZ_ajaxcalls_vars.fave_page_template;
        var fave_prop_featured = HOUZEZ_ajaxcalls_vars.prop_featured;
        var featured_listings_none = HOUZEZ_ajaxcalls_vars.featured_listings_none;
        var prop_sent_for_approval = HOUZEZ_ajaxcalls_vars.prop_sent_for_approval;
        var houzez_rtl = HOUZEZ_ajaxcalls_vars.houzez_rtl;
        var infoboxClose = HOUZEZ_ajaxcalls_vars.infoboxClose;
        var clusterIcon = HOUZEZ_ajaxcalls_vars.clusterIcon;
        var paged = HOUZEZ_ajaxcalls_vars.page;
        var sort_by = HOUZEZ_ajaxcalls_vars.sort_by;
        var google_map_style = HOUZEZ_ajaxcalls_vars.google_map_style;
        var googlemap_default_zoom = HOUZEZ_ajaxcalls_vars.googlemap_default_zoom;
        var googlemap_pin_cluster = HOUZEZ_ajaxcalls_vars.googlemap_pin_cluster;
        var googlemap_zoom_cluster = HOUZEZ_ajaxcalls_vars.googlemap_zoom_cluster;
        var map_icons_path = HOUZEZ_ajaxcalls_vars.map_icons_path;
        var google_map_needed = HOUZEZ_ajaxcalls_vars.google_map_needed;
        var simple_logo = HOUZEZ_ajaxcalls_vars.simple_logo;
        var retina_logo = HOUZEZ_ajaxcalls_vars.retina_logo;
        var retina_logo_splash = HOUZEZ_ajaxcalls_vars.retina_logo_splash;
        var retina_logo_height = HOUZEZ_ajaxcalls_vars.retina_logo_height;
        var retina_logo_width = HOUZEZ_ajaxcalls_vars.retina_logo_width;
        var transparent_menu = HOUZEZ_ajaxcalls_vars.transparent_menu;
        var transportation = HOUZEZ_ajaxcalls_vars.transportation;
        var supermarket = HOUZEZ_ajaxcalls_vars.supermarket;
        var schools = HOUZEZ_ajaxcalls_vars.schools;
        var libraries = HOUZEZ_ajaxcalls_vars.libraries;
        var pharmacies = HOUZEZ_ajaxcalls_vars.pharmacies;
        var hospitals = HOUZEZ_ajaxcalls_vars.hospitals;
        var currency_position = HOUZEZ_ajaxcalls_vars.currency_position;
        var currency_updating_msg = HOUZEZ_ajaxcalls_vars.currency_updating_msg;
        var submission_currency = HOUZEZ_ajaxcalls_vars.submission_currency;
        var wire_transfer_text = HOUZEZ_ajaxcalls_vars.wire_transfer_text;
        var direct_pay_thanks = HOUZEZ_ajaxcalls_vars.direct_pay_thanks;
        var direct_payment_title = HOUZEZ_ajaxcalls_vars.direct_payment_title;
        var direct_payment_button = HOUZEZ_ajaxcalls_vars.direct_payment_button;
        var direct_payment_details = HOUZEZ_ajaxcalls_vars.direct_payment_details;
        var measurement_unit = HOUZEZ_ajaxcalls_vars.measurement_unit;
        var measurement_updating_msg = HOUZEZ_ajaxcalls_vars.measurement_updating_msg;
        var thousands_separator = HOUZEZ_ajaxcalls_vars.thousands_separator;
        var rent_status_for_price_range = HOUZEZ_ajaxcalls_vars.for_rent_price_range;
        var current_tempalte = HOUZEZ_ajaxcalls_vars.current_tempalte;
        var not_found = HOUZEZ_ajaxcalls_vars.not_found;
        var property_detail_top = HOUZEZ_ajaxcalls_vars.property_detail_top;
        var keyword_search_field = HOUZEZ_ajaxcalls_vars.keyword_search_field;
        var keyword_autocomplete = HOUZEZ_ajaxcalls_vars.keyword_autocomplete;

        var compare_button_url = HOUZEZ_ajaxcalls_vars.compare_button_url;
        var compare_page_not_found = HOUZEZ_ajaxcalls_vars.compare_page_not_found;

        if( houzez_rtl == 'yes' ) {
            houzez_rtl = true;
        } else {
            houzez_rtl = false;
        }

        /*
         *  Retina logo
         * *************************************** */
        if ( retina_logo !== '' && retina_logo_width !== '' && retina_logo_height !== '') {
            if (window.devicePixelRatio == 2) {
                if( transparent_menu == 'yes' ) {
                    $(".not-splash-header.houzez-header-transparent .logo img").attr("src", retina_logo_splash);
                    $(".not-splash-header.houzez-header-transparent .logo img").attr("width", retina_logo_width);
                    $(".not-splash-header.houzez-header-transparent .logo img").attr("height", retina_logo_height);

                    $(".sticky_nav.header-section-4 .logo img").attr("src", retina_logo);
                    $(".sticky_nav.header-section-4 .logo img").attr("width", retina_logo_width);
                    $(".sticky_nav.header-section-4 .logo img").attr("height", retina_logo_height);
                } else {
                    $(".not-splash-header .logo img").attr("src", retina_logo);
                    $(".not-splash-header .logo img").attr("width", retina_logo_width);
                    $(".not-splash-header .logo img").attr("height", retina_logo_height);
                }
            }
        }

        if ( retina_logo_splash !== '' && retina_logo_width !== '' && retina_logo_height !== '') {
            if (window.devicePixelRatio == 2) {
                $(".slpash-header .logo img").attr("src", retina_logo_splash);
                $(".slpash-header .logo img").attr("width", retina_logo_width);
                $(".slpash-header .logo img").attr("height", retina_logo_height);
            }
        }


        if( google_map_needed == 'yes' ) {

            var placesIDs              = new Array();
            var transportationsMarkers = new Array();
            var supermarketsMarkers    = new Array();
            var schoolsMarkers         = new Array();
            var librariesMarkers       = new Array();
            var pharmaciesMarkers      = new Array();
            var hospitalsMarkers       = new Array();

            var drgflag = true;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                drgflag = false;
            }

            var houzezMapoptions = {
                zoom: parseInt(googlemap_default_zoom),
                //mapTypeId: 'Styled',
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                panControl: false,
                draggable: drgflag,
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: true,
                overviewMapControl: false,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL,
                    position: google.maps.ControlPosition.RIGHT_TOP
                },
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_TOP
                }
            };

            var houzezHeaderMapOptions = {
                maxZoom: 20,
                disableDefaultUI: true,
                scrollwheel: false,
                scroll:{x:$(window).scrollLeft(),y:$(window).scrollTop()},
                zoom: 5,//parseInt(googlemap_default_zoom),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                draggable: drgflag,
            };

            var infobox = new InfoBox({
                disableAutoPan: true, //false
                maxWidth: 275,
                alignBottom: true,
                pixelOffset: new google.maps.Size(-122, -48),
                zIndex: null,
                closeBoxMargin: "0 0 -16px -16px",
                closeBoxURL: infoboxClose,
                infoBoxClearance: new google.maps.Size(1, 1),
                isHidden: false,
                pane: "floatPane",
                enableEventPropagation: false
            });
            var poiInfo = new InfoBox({
                disableAutoPan: false,
                maxWidth: 250,
                pixelOffset: new google.maps.Size(-72, -70),
                zIndex: null,
                boxStyle: {
                    'background' : '#ffffff',
                    'opacity'    : 1,
                    'padding'    : '6px',
                    'box-shadow' : '0 1px 2px 0 rgba(0, 0, 0, 0.12)',
                    'width'      : '145px',
                    'text-align' : 'center',
                    'border-radius' : '4px'
                },
                closeBoxMargin: "28px 26px 0px 0px",
                closeBoxURL: "",
                infoBoxClearance: new google.maps.Size(1, 1),
                pane: "floatPane",
                enableEventPropagation: false
            });

            var houzezGetPOIs = function( position, poiMap, poiType) {
                var service   = new google.maps.places.PlacesService( poiMap );
                var bounds    = poiMap.getBounds();
                var types     = new Array();

                switch(poiType) {
                    case 'transportations':
                        types = ['bus_station', 'subway_station', 'train_station', 'airport'];
                        break;
                    case 'supermarkets':
                        types = ['grocery_or_supermarket', 'shopping_mall'];
                        break;
                    case 'schools':
                        types = ['school', 'university'];
                        break;
                    case 'libraries':
                        types = ['library'];
                        break;
                    case 'pharmacies':
                        types = ['pharmacy'];
                        break;
                    case 'hospitals':
                        types = ['hospital'];
                        break;
                }

                service.nearbySearch({
                    location: position,
                    bounds: bounds,
                    radius: 2000,
                    types: types
                }, function poiCallback( results, status ) {
                    if ( status === google.maps.places.PlacesServiceStatus.OK ) {
                        for ( var i = 0; i < results.length; i++ ) {
                            if( jQuery.inArray (results[i].place_id, placesIDs ) == -1 ) {
                                houzezCreatePOI( results[i], poiMap, poiType );
                                placesIDs.push( results[i].place_id );
                            }
                        }
                    }
                });
            }

            var houzezCreatePOI = function( place, poiMap, type ) {
                var marker;

                switch(type) {
                    case 'transportations':
                        marker = new google.maps.Marker({
                            map: poiMap,
                            position: place.geometry.location,
                            icon: map_icons_path+'transportation.png'
                        });
                        transportationsMarkers.push(marker);
                        break;
                    case 'supermarkets':
                        marker = new google.maps.Marker({
                            map: poiMap,
                            position: place.geometry.location,
                            icon: map_icons_path+'supermarket.png'
                        });
                        supermarketsMarkers.push(marker);
                        break;
                    case 'schools':
                        marker = new google.maps.Marker({
                            map: poiMap,
                            position: place.geometry.location,
                            icon: map_icons_path+'school.png'
                        });
                        schoolsMarkers.push(marker);
                        break;
                    case 'libraries':
                        marker = new google.maps.Marker({
                            map: poiMap,
                            position: place.geometry.location,
                            icon: map_icons_path+'libraries.png'
                        });
                        librariesMarkers.push(marker);
                        break;
                    case 'pharmacies':
                        marker = new google.maps.Marker({
                            map: poiMap,
                            position: place.geometry.location,
                            icon: map_icons_path+'pharmacy.png'
                        });
                        pharmaciesMarkers.push(marker);
                        break;
                    case 'hospitals':
                        marker = new google.maps.Marker({
                            map: poiMap,
                            position: place.geometry.location,
                            icon: map_icons_path+'hospital.png'
                        });
                        hospitalsMarkers.push(marker);
                        break;
                }

                google.maps.event.addListener(marker, 'mouseover', function() {
                    poiInfo.setContent(place.name);
                    poiInfo.open(poiMap, this);
                });
                google.maps.event.addListener(marker, 'mouseout', function() {
                    poiInfo.open(null,null);
                });
            }

            var houzezTooglePOIs = function(poiMap, type) {
                for(var i = 0; i < type.length; i++) {
                    if(type[i].getMap() != null) {
                        type[i].setMap(null);
                    } else {
                        type[i].setMap(poiMap);
                    }
                }
            }

            var houzezPoiControls = function( controlDiv, poiMap, center) {
                controlDiv.style.clear = 'both';

                // Set CSS for transportations POI
                var transportationUI = document.createElement('div');
                transportationUI.id = 'transportation';
                transportationUI.class = 'transportation';
                transportationUI.title = transportation;
                controlDiv.appendChild(transportationUI);
                var transportationIcon = document.createElement('div');
                transportationIcon.id = 'transportationIcon';
                transportationIcon.innerHTML = '<div class="icon"><img src="'+map_icons_path+'transportation-panel-icon.png" alt=""></div><span>'+transportation+'</span>';
                transportationUI.appendChild(transportationIcon);


                // Set CSS for supermarkets POI
                var supermarketsUI = document.createElement('div');
                supermarketsUI.id = 'supermarkets';
                supermarketsUI.title = supermarket;
                controlDiv.appendChild(supermarketsUI);
                var supermarketsIcon = document.createElement('div');
                supermarketsIcon.id = 'supermarketsIcon';
                supermarketsIcon.innerHTML = '<div class="icon"><img src="'+map_icons_path+'supermarket-panel-icon.png" alt=""></div><span>'+supermarket+'</span>';
                supermarketsUI.appendChild(supermarketsIcon);

                // Set CSS for schools POI
                var schoolsUI = document.createElement('div');
                schoolsUI.id = 'schools';
                schoolsUI.title = schools;
                controlDiv.appendChild(schoolsUI);
                var schoolsIcon = document.createElement('div');
                schoolsIcon.id = 'schoolsIcon';
                schoolsIcon.innerHTML = '<div class="icon"><img src="'+map_icons_path+'school-panel-icon.png" alt=""></div><span>'+schools+'</span>';
                schoolsUI.appendChild(schoolsIcon);

                // Set CSS for libraries POI
                var librariesUI = document.createElement('div');
                librariesUI.id = 'libraries';
                librariesUI.title = libraries;
                controlDiv.appendChild(librariesUI);
                var librariesIcon = document.createElement('div');
                librariesIcon.id = 'librariesIcon';
                librariesIcon.innerHTML = '<div class="icon"><img src="'+map_icons_path+'libraries-panel-icon.png" alt=""></div><span>'+libraries+'</span>';
                librariesUI.appendChild(librariesIcon);

                // Set CSS for pharmacies POI
                var pharmaciesUI = document.createElement('div');
                pharmaciesUI.id = 'pharmacies';
                pharmaciesUI.title = pharmacies;
                controlDiv.appendChild(pharmaciesUI);
                var pharmaciesIcon = document.createElement('div');
                pharmaciesIcon.id = 'pharmaciesIcon';
                pharmaciesIcon.innerHTML = '<div class="icon"><img src="'+map_icons_path+'pharmacy-panel-icon.png" alt=""></div><span>'+pharmacies+'</span>';
                pharmaciesUI.appendChild(pharmaciesIcon);

                // Set CSS for hospitals POI
                var hospitalsUI = document.createElement('div');
                hospitalsUI.id = 'hospitals';
                hospitalsUI.title = hospitals;
                controlDiv.appendChild(hospitalsUI);
                var hospitalsIcon = document.createElement('div');
                hospitalsIcon.id = 'hospitalsIcon';
                hospitalsIcon.innerHTML = '<div class="icon"><img src="'+map_icons_path+'hospital-panel-icon.png" alt=""></div><span>'+hospitals+'</span>';
                hospitalsUI.appendChild(hospitalsIcon);

                transportationUI.addEventListener('click', function() {
                    var transportationUI_ = this;
                    if($(this).hasClass('active')) {
                        $(this).removeClass('active');

                        houzezTooglePOIs( poiMap, transportationsMarkers );
                    } else {
                        $(this).addClass('active');

                        houzezGetPOIs(center, poiMap, 'transportations');
                        houzezTooglePOIs(poiMap, transportationsMarkers);
                    }
                    google.maps.event.addListener(poiMap, 'bounds_changed', function() {
                        if($(transportationUI_).hasClass('active')) {
                            var newCenter = poiMap.getCenter();
                            houzezGetPOIs(newCenter, poiMap, 'transportations');
                        }
                    });
                });
                supermarketsUI.addEventListener('click', function() {
                    var supermarketsUI_ = this;
                    if($(this).hasClass('active')) {
                        $(this).removeClass('active');

                        houzezTooglePOIs(poiMap, supermarketsMarkers);
                    } else {
                        $(this).addClass('active');

                        houzezGetPOIs(center, poiMap, 'supermarkets');
                        houzezTooglePOIs(poiMap, supermarketsMarkers);
                    }
                    google.maps.event.addListener(poiMap, 'bounds_changed', function() {
                        if($(supermarketsUI_).hasClass('active')) {
                            var newCenter = poiMap.getCenter();
                            houzezGetPOIs(newCenter, poiMap, 'supermarkets');
                        }
                    });
                });
                schoolsUI.addEventListener('click', function() {
                    var schoolsUI_ = this;
                    if($(this).hasClass('active')) {
                        $(this).removeClass('active');

                        houzezTooglePOIs(poiMap, schoolsMarkers);
                    } else {
                        $(this).addClass('active');

                        houzezGetPOIs(center, poiMap, 'schools');
                        houzezTooglePOIs(poiMap, schoolsMarkers);
                    }
                    google.maps.event.addListener(poiMap, 'bounds_changed', function() {
                        if($(schoolsUI_).hasClass('active')) {
                            var newCenter = poiMap.getCenter();
                            houzezGetPOIs(newCenter, poiMap, 'schools');
                        }
                    });
                });
                librariesUI.addEventListener('click', function() {
                    var librariesUI_ = this;
                    if($(this).hasClass('active')) {
                        $(this).removeClass('active');

                        houzezTooglePOIs(poiMap, librariesMarkers);
                    } else {
                        $(this).addClass('active');

                        houzezGetPOIs(center, poiMap, 'libraries');
                        houzezTooglePOIs(poiMap, librariesMarkers);
                    }
                    google.maps.event.addListener(poiMap, 'bounds_changed', function() {
                        if($(librariesUI_).hasClass('active')) {
                            var newCenter = poiMap.getCenter();
                            houzezGetPOIs(newCenter, poiMap, 'libraries');
                        }
                    });
                });
                pharmaciesUI.addEventListener('click', function() {
                    var pharmaciesUI_ = this;
                    if($(this).hasClass('active')) {
                        $(this).removeClass('active');

                        houzezTooglePOIs(poiMap, pharmaciesMarkers);
                    } else {
                        $(this).addClass('active');

                        houzezGetPOIs(center, poiMap, 'pharmacies');
                        houzezTooglePOIs(poiMap, pharmaciesMarkers);
                    }
                    google.maps.event.addListener(poiMap, 'bounds_changed', function() {
                        if($(pharmaciesUI_).hasClass('active')) {
                            var newCenter = poiMap.getCenter();
                            houzezGetPOIs(newCenter, poiMap, 'pharmacies');
                        }
                    });
                });
                hospitalsUI.addEventListener('click', function() {
                    var hospitalsUI_ = this;
                    if($(this).hasClass('active')) {
                        $(this).removeClass('active');

                        houzezTooglePOIs(poiMap, hospitalsMarkers);
                    } else {
                        $(this).addClass('active');

                        houzezGetPOIs(center, poiMap, 'hospitals');
                        houzezTooglePOIs(poiMap, hospitalsMarkers);
                    }
                    google.maps.event.addListener(poiMap, 'bounds_changed', function() {
                        if($(hospitalsUI_).hasClass('active')) {
                            var newCenter = poiMap.getCenter();
                            houzezGetPOIs(newCenter, poiMap, 'hospitals');
                        }
                    });
                });
            }

            var houzezSetPOIControls = function(poiMap, center) {
                var poiControlDiv = document.createElement('div');
                var poiControl = new houzezPoiControls( poiControlDiv, poiMap, center);

                poiControlDiv.index = 1;
                poiControlDiv.style['padding-left'] = '10px';
                poiMap.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(poiControlDiv);
            }
        }


        if( $('.compare-property').length > 0 ) {
            $('.compare-property').click(function (e) {
                e.preventDefault();

                var prop_id = $( this ).attr('data-propid');

                var data_ap = { action: 'houzez_compare_add_property', prop_id: prop_id };

                $.post( ajaxurl, data_ap, function( response ) {

                    /*if( response.indexOf( "SHOW_TOOLTIP" ) >= 0 ) {
                        response = response.replace( "SHOW_TOOLTIP", "" );
                        show_tooltip = true;
                    }*/

                    //$(this).parents('li').addClass('wooooow');
                    //$( this ).parents('.item-thumb').block({ message: '<i class="'+process_loader_spinner+'"></i>' });
                    //return;

                    //$( '#compare-link-' + prop_id ).replaceWith( response );

                    /*if( show_tooltip == true )
                        jQuery( '<div class="be-compare-error">' + be_compare_params.text_product_add_error + '</div>' ).appendTo( '#compare-link-' + product_id ).delay(4000).fadeOut();
                     */
                    var data_ub = { action: 'houzez_compare_update_basket' };

                    $.post( ajaxurl, data_ub, function( response ) {

                        $( 'div#compare-properties-basket' ).replaceWith( response );

                    });

                });

                return;

            }); // end .compare-property

            // Delete single item from basket
            $( document ).on( 'click', '#compare-properties-basket .compare-property-remove', function(e) {
                e.preventDefault();

                var property_id = jQuery( this ).parent().attr('property-id');

               $( this ).parent().block({ message: '<i class="'+process_loader_spinner+'"></i>', css: {
                   border:         'none',
                   backgroundColor:'none',
                   fontSize:       '16px',
               },  });

               var data_ap = { action: 'houzez_compare_add_property', prop_id: property_id };
                $.post( ajaxurl, data_ap, function( response ) {

                   //$( '#compare-link-' + property_id ).replaceWith( response );

                    var data_ub = { action: 'houzez_compare_update_basket' };
                    $.post( ajaxurl, data_ub, function( response ) {

                        $( 'div#compare-properties-basket' ).replaceWith( response );

                    });

                });

                return;
            }); // End Delete compare

            // Show / Hide category details
            jQuery(document).on('click', '.compare-properties-button', function(){

                if( compare_button_url != "" ) {
                    window.location.href = compare_button_url;
                } else {
                    alert(compare_page_not_found);
                }
                return false;
            });

        }


        /*
         *  Print Property
         * *************************************** */
        if( $('#houzez-print').length > 0 ) {
            $('#houzez-print').click(function (e) {
                e.preventDefault();
                var propID, printWindow;

                propID = $(this).attr('data-propid');

                printWindow = window.open('', 'Print Me', 'width=700 ,height=842');
                $.ajax({
                    type: 'POST',
                    url: ajaxurl,
                    data: {
                        'action': 'houzez_create_print',
                        'propid': propID,
                    },
                    success: function (data) {
                        printWindow.document.write(data);
                        printWindow.document.close();
                        printWindow.focus();
                        /*setTimeout(function(){
                        printWindow.print();
                        }, 2000);
                        printWindow.close();*/
                    },
                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        console.log(err.Message);
                    }

                });
            });
        }

        /*
         *  Visual Composer Stretch row
         * *************************************** */
        if( houzez_rtl ) {
            var visual_composer_stretch_row = function () {

                var $elements = $('[data-vc-full-width="true"]');
                $.each($elements, function (key, item) {
                    var $el = $(this);
                    $el.addClass('vc_hidden');

                    var $el_full = $el.next('.vc_row-full-width');
                    var el_margin_left = parseInt($el.css('margin-left'), 10);
                    var el_margin_right = parseInt($el.css('margin-right'), 10);
                    var offset = 0 - $el_full.offset().left - el_margin_left;
                    var width = $(window).width();
                    $el.css({
                        'position': 'relative',
                        'left': offset,
                        'right': offset,
                        'box-sizing': 'border-box',
                        'width': $(window).width()
                    });
                    if (!$el.data('vcStretchContent')) {
                        var padding = (-1 * offset);
                        if (0 > padding) {
                            padding = 0;
                        }
                        var paddingRight = width - padding - $el_full.width() + el_margin_left + el_margin_right;
                        if (0 > paddingRight) {
                            paddingRight = 0;
                        }
                        $el.css({'padding-left': padding + 'px', 'padding-right': paddingRight + 'px'});
                    }
                    $el.attr("data-vc-full-width-init", "true");
                    $el.removeClass('vc_hidden');
                });
            }
            visual_composer_stretch_row();

            $(window).resize(function () {
                visual_composer_stretch_row();
            });
        }


        /* ------------------------------------------------------------------------ */
        /*  Check email
         /* ------------------------------------------------------------------------ */
         var houzez_check_email = function(email, curnt) {

            var $form = curnt.parents('form');
            var $msg = $form.find('#email_messages');

            $.ajax({
                url: ajaxurl,
                dataType: 'JSON',
                method: 'POST',
                data: {
                    'action': 'houzez_check_email',
                    'useremail': email
                },
                beforeSend: function() {
                    $msg.append('<i class="' + process_loader_spinner + '"></i>');
                },
                success: function( response ) {
                    if(response.success){
                        curnt.removeClass('error');
                        curnt.addClass('success');
                        $('#add_new_property').removeAttr('disabled');
                        $('#email_messages').empty().append('<label class="success">'+response.msg+'</label>');
                    } else {
                        $('#add_new_property').attr('disabled', 'disabled');
                        curnt.removeClass('success');
                        curnt.addClass('error');
                        $('#email_messages').empty().append('<label class="error">'+response.msg+'</label>');
                    }
                },
                error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.Message);
                },
                complete: function() {
                    $msg.children('i').remove();
                }
            });
         }

        $('#user_email').live('change', function() {
            var curnt = $(this);
            var email = curnt.val();
            houzez_check_email(email, curnt);
        });


        /* ------------------------------------------------------------------------ */
        /*  Property page layout cookies
         /* ------------------------------------------------------------------------ */
        $('.view-btn ').click(function(){
            $.removeCookie('properties-layout');
            $.removeCookie('layout-btn');

            if($(this).hasClass('btn-list')) {
                $.cookie('properties-layout', 'list-view');
                $.cookie('layout-btn', 'btn-list');

            } else if($(this).hasClass('btn-grid')) {
                $.cookie('properties-layout', 'grid-view');
                $.cookie('layout-btn', 'btn-grid');

            } else if($(this).hasClass('btn-grid-3-col')) {
                $.cookie('properties-layout', 'grid-view-3-col');
                $.cookie('layout-btn', 'btn-grid-3-col');

            } else {

            }
        });

        if( $.cookie('properties-layout') != 'undefined' ) {
            if( $.cookie('properties-layout') == 'list-view' && fave_page_template != 'template-search.php' && fave_page_template != 'user_dashboard_favorites.php' ) {
                $('.property-listing').removeClass('grid-view grid-view-3-col');
                $('.property-listing').addClass('list-view');

            } else if( $.cookie('properties-layout') == 'grid-view' && fave_page_template != 'template-search.php' && fave_page_template != 'user_dashboard_favorites.php' ) {
                $('.property-listing').removeClass('list-view grid-view grid-view-3-col');
                $('.property-listing').addClass('grid-view');

            }  else if( $.cookie('properties-layout') == 'grid-view-3-col' && fave_page_template != 'template-search.php' && fave_page_template != 'user_dashboard_favorites.php' ) {
                $('.property-listing').removeClass('list-view grid-view');
                $('.property-listing').addClass('grid-view grid-view-3-col');
            }
        }

        if( $.cookie('layout-btn') != 'undefined' ) {
            if( $.cookie('layout-btn') == 'btn-list' ) {
                $('.view-btn').removeClass('active');
                $('.view-btn.btn-list').addClass('active');

            } else if( $.cookie('layout-btn') == 'btn-grid' ) {
                $('.view-btn').removeClass('active');
                $('.view-btn.btn-grid').addClass('active');

            } else if( $.cookie('layout-btn') == 'btn-grid-3-col' ) {
                $('.view-btn').removeClass('active');
                $('.view-btn.btn-grid-3-col').addClass('active');
            }
        }


        /* ------------------------------------------------------------------------ */
        /*  ADD COMMA TO VALUE
        /* ------------------------------------------------------------------------ */
        var addCommas = function(nStr) {
            nStr += '';
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + thousands_separator + '$2');
            }
            return x1 + x2;
        }

        /*--------------------------------------------------------------------------
         *  Property Module Ajax Pagination
         * -------------------------------------------------------------------------*/
        var properties_module_section = $('#properties_module_section');
        if( properties_module_section.length > 0 ) {

            var properties_module_container = $('#properties_module_container');
            var paginationLink = $('.property-item-module ul.pagination li a');
            var fave_loader = $('.fave-svg-loader');

            $("body").on('click', '.fave-load-more a', function(e) {
                e.preventDefault();
                var $link = $(this);
                var page_url = $link.attr("href");
                var fave_load_ajax_new_count = 0;
                $link.prepend('<i class="fa-left ' + process_loader_spinner + '"></i>');

                $("<div>").load(page_url, function() {
                    var n = fave_load_ajax_new_count.toString();
                    var $wrap = $link.closest('#properties_module_section').find('#module_properties');
                    var $new = $(this).find('#properties_module_section .item-wrap').addClass('fave-post-new-'+n);

                    $new.hide().appendTo($wrap).fadeIn(400);

                    if ($(this).find('.fave-load-more').length) {
                        $link.closest('#properties_module_section').find('.fave-load-more').html($(this).find('.fave-load-more').html());
                    } else {
                        $link.closest('#properties_module_section').find('.fave-load-more').fadeOut('fast').remove();
                    }

                    /*if (page_url != window.location) {
                        window.history.pushState({
                            path: page_url
                        }, '', page_url);
                    }*/

                    fave_load_ajax_new_count++;

                    return false;

                });

            });

            /*paginationLink.click(function(e) {
             e.preventDefault();
             var currentButton = $(this);
             fave_loader.slideDown('fast');
             properties_module_container.load(

             currentButton.attr('href') + ' ' + '#module_properties',
             function( response, status, xhr ) {
             if ( status == 'success' ) {
             properties_module_container.fadeTo('slow',1);
             fave_loader.slideUp('fast');
             paginationLink.parent().removeClass('active');
             currentButton.parent().addClass('active');
             $('html, body').animate( { scrollTop: properties_module_container.offset().top - 60 }, 'slow' );
             } else {
             properties_module_container.fadeTo('slow',1);
             console.log( status + ' ' + xhr.statusText );
             }
             }
             );
             });*/


        }


        /*--------------------------------------------------------------------------
         *  Change advanced search price
         * -------------------------------------------------------------------------*/
        var fave_property_status_changed = function(prop_status, $form) {

            if( prop_status ==  HOUZEZ_ajaxcalls_vars.for_rent ) {
                $form.find('.prices-for-all').addClass('hide');
                $form.find('.prices-for-all select').attr('disabled','disabled');
                $form.find('.prices-only-for-rent').removeClass('hide');
                $form.find('.prices-only-for-rent select').removeAttr('disabled','disabled');
            } else {
                $form.find('.prices-only-for-rent').addClass('hide');
                $form.find('.prices-only-for-rent select').attr('disabled','disabled');
                $form.find('.prices-for-all').removeClass('hide');
                $form.find('.prices-for-all select').removeAttr('disabled','disabled');
            }
        }
        //$('.advance-search-header #selected_status').change(function(e){
        $('select[name="status"]').change(function(e){
            var selected_status = $(this).val();
            var $form = $(this).parents('form');
            fave_property_status_changed(selected_status, $form);
        });
        /* On page load ( as on search page ) */
        var selected_status_header_search = $('select[name="status"]').val();
        if( selected_status_header_search == HOUZEZ_ajaxcalls_vars.for_rent ){
            var $form = $('.advance-search-header');
            fave_property_status_changed(selected_status_header_search, $form);
        }

        // Mobile Advanced Search
        $('.advanced-search-mobile #selected_status_mobile').change(function(e){
            var selected_status = $(this).val();
            var $form = $(this).parents('form');
            fave_property_status_changed(selected_status, $form);
        });
        /* On page load ( as on search page ) */
        var selected_status_header_search = $('.advanced-search-mobile #selected_status_mobile').val();
        if( selected_status_header_search == HOUZEZ_ajaxcalls_vars.for_rent ){
            var $form = $('.advanced-search-mobile');
            fave_property_status_changed(selected_status_header_search, $form);
        }

        // For search module
        $('.advanced-search-module #selected_status_module').change(function(e){
            var selected_status = $(this).val();
            var $form = $(this).parents('form');
            fave_property_status_changed(selected_status, $form);
        });
        var selected_status_module_search = $('.advanced-search-module #selected_status_module').val();
        if( selected_status_module_search == HOUZEZ_ajaxcalls_vars.for_rent ){
            var $form = $('.advanced-search-module');
            fave_property_status_changed(selected_status_module_search, $form);
        }

        /*--------------------------------------------------------------------------
         *  Save Search
         * -------------------------------------------------------------------------*/
        $("#save_search_click").click(function(e) {
            e.preventDefault();

            var $this = $(this);
            var $from = $('#save_search_form');

            if( parseInt( userID, 10 ) === 0 ) {
                $('#pop-login').modal('show');
            } else {
                $.ajax({
                    url: ajaxurl,
                    data: $from.serialize(),
                    method: $from.attr('method'),
                    dataType: 'JSON',

                    beforeSend: function () {
                        $this.children('i').remove();
                        $this.prepend('<i class="fa-left ' + process_loader_spinner + '"></i>');
                    },
                    success: function (response) {
                        if (response.success) {
                            $('#save_search_click').addClass('saved');
                        }
                    },
                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        console.log(err.Message);
                    },
                    complete: function () {
                        $this.children('i').removeClass(process_loader_spinner);
                    }
                });
            }

        });

        /*--------------------------------------------------------------------------
        * Delete Search
        * --------------------------------------------------------------------------*/
        $('.remove-search').click(function(e) {
            e.preventDefault();
            var $this = $(this);
            var prop_id = $this.data('propertyid');
            var removeBlock = $this.parents('.saved-search-block');

            if (confirm(confirm_message)) {
                $.ajax({
                    url: ajaxurl,
                    dataType: 'JSON',
                    method: 'POST',
                    data: {
                        'action': 'houzez_delete_search',
                        'property_id': prop_id
                    },
                    beforeSend: function () {
                        $this.children('i').remove();
                        $this.prepend('<i class="' + process_loader_spinner + '"></i>');
                    },
                    success: function (res) {
                        if (res.success) {
                            removeBlock.remove();
                        }
                    },
                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        console.log(err.Message);
                    }
                });
            }
        });

        /*--------------------------------------------------------------------------
         *  Property Agent Contact Form
         * -------------------------------------------------------------------------*/
        $( '.agent_contact_form').click(function(e) {
            e.preventDefault();

            var $this = $(this);
            var $form = $this.parents( 'form' );
            var $result = $form.find('.form_messages');

            $.ajax({
                url: ajaxurl,
                data: $form.serialize(),
                method: $form.attr('method'),
                dataType: "JSON",

                beforeSend: function( ) {
                    $this.children('i').remove();
                    $this.prepend('<i class="fa-left '+process_loader_spinner+'"></i>');
                },
                success: function(response) {
                    if( response.success ) {
                        $result.empty().append(response.msg);
                        $form.find('input').val('');
                        $form.find('textarea').val('');
                    } else {
                        $result.empty().append(response.msg);
                    }
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.Message);
                },
                complete: function(){
                    $this.children('i').removeClass(process_loader_spinner);
                    $this.children('i').addClass(success_icon);
                }
            });

            // var name = $('#name').val();
        });

        /*--------------------------------------------------------------------------
         *   Contact agent form on agent detail page
         * -------------------------------------------------------------------------*/
        var agent_contact_email = function( current_element, target_email, sender_name, sender_phone, sender_email, sender_message, sender_nonce ) {

            jQuery.ajax({
                type: 'post',
                url: ajaxurl,
                dataType: 'json',
                data: {
                    'action': 'houzez_contact_agent',
                    'target_email': target_email,
                    'sender_name': sender_name,
                    'sender_phone': sender_phone,
                    'sender_email': sender_email,
                    'sender_msg': sender_message,
                    'sender_nonce': sender_nonce
                },
                beforeSend: function( ) {
                    current_element.children('i').remove();
                    current_element.prepend('<i class="fa-left '+process_loader_spinner+'"></i>');
                },
                success: function( res ) {
                    current_element.children('i').removeClass(process_loader_spinner);
                    if( res.success ) {
                        $('#form_messages').empty().append(res.msg);
                        current_element.children('i').addClass(success_icon);
                    } else {
                        $('#form_messages').empty().append(res.msg);
                    }
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.Message);
                }

            });
        };

        $('#agent_detail_contact_btn').click(function(e) {
            e.preventDefault();
            var current_element = $(this),
                sender_name = $('#name').val(),
                sender_phone = $('#phone').val(),
                sender_email = $('#email').val(),
                sender_message = $('#message').val(),
                target_email = $('#target_email').val(),
                sender_nonce = $('#agent_detail_ajax_nonce').val();

            agent_contact_email( current_element, target_email, sender_name, sender_phone, sender_email, sender_message, sender_nonce );

        });

        /*--------------------------------------------------------------------------
         *   Make Property Featured - only for membership
         * -------------------------------------------------------------------------*/
        $('.make-prop-featured').click(function (e) {
            e.preventDefault();

            var prop_id = $(this).attr('data-propid');
            make_prop_featured( prop_id, $(this) );
            $(this).unbind( "click" );
        });

        var make_prop_featured = function( prop_id, currentDiv ) {

            $.ajax({
                type: 'POST',
                url: ajaxurl,
                dataType: 'JSON',
                data: {
                    'action' : 'houzez_make_prop_featured',
                    'propid' : prop_id
                },
                success: function ( res ) {

                    if( res.success ) {
                        var prnt = currentDiv.parents('.item-wrap');
                        prnt.find('.item-thumb').append('<span class="label-featured label">'+fave_prop_featured+'</span>');
                        currentDiv.remove();
                        prnt.find('.tooltip').remove();
                        var total_featured_listings = parseInt(jQuery('.mem_featured_listings_rem').text(), 10);
                        jQuery('.mem_featured_listings_rem').text(total_featured_listings - 1);
                    } else {
                        currentDiv.parent().empty().append('<div class="alert alert-danger">'+featured_listings_none+'</div>');
                    }

                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.Message);
                }

            });//end ajax
        }


        /*--------------------------------------------------------------------------
         *   Resend Property For approval - only for membership
         * -------------------------------------------------------------------------*/
        $('.resend-for-approval').click(function (e) {
            e.preventDefault();

            var prop_id = $(this).attr('data-propid');
            resend_for_approval( prop_id, $(this) );
            $(this).unbind( "click" );
        });

        var resend_for_approval = function( prop_id, currentDiv ) {

            $.ajax({
                type: 'POST',
                url: ajaxurl,
                dataType: 'JSON',
                data: {
                    'action' : 'houzez_resend_for_approval',
                    'propid' : prop_id
                },
                success: function ( res ) {

                    if( res.success ) {
                        currentDiv.parent().empty().append('<span class="label-success label">'+res.msg+'</span>');
                        var total_listings = parseInt(jQuery('.mem_listings_rem').text(), 10);
                        jQuery('.mem_listings_rem').text(total_listings - 1);
                    } else {
                        currentDiv.parent().empty().append('<div class="alert alert-danger">'+res.msg+'</div>');
                    }

                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.Message);
                }

            });//end ajax
        }

        /*--------------------------------------------------------------------------
         *   Resend Property For approval - only for per listing
         * -------------------------------------------------------------------------*/
        $('.resend-for-approval-perlisting').click(function (e) {
            e.preventDefault();

            var prop_id = $(this).attr('data-propid');
            resend_for_approval_perlisting( prop_id, $(this) );
            $(this).unbind( "click" );
        });

        var resend_for_approval_perlisting = function( prop_id, currentDiv ) {

            $.ajax({
                type: 'POST',
                url: ajaxurl,
                dataType: 'JSON',
                data: {
                    'action' : 'houzez_resend_for_approval_perlisting',
                    'propid' : prop_id
                },
                success: function ( res ) {

                    if( res.success ) {
                        currentDiv.parent().empty().append('<span class="label-success label">'+res.msg+'</span>');
                    } else {
                        currentDiv.parent().empty().append('<div class="alert alert-danger">'+res.msg+'</div>');
                    }

                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.Message);
                }

            });//end ajax
        }

        /*--------------------------------------------------------------------------
        *   Add or remove favorites
        * -------------------------------------------------------------------------*/
        $(".add_fav").click(function () {
            var curnt = $(this);
            var propID = $(this).attr('data-propid');
            add_to_favorite( propID, curnt );
        });

        var add_to_favorite = function ( propID, curnt ) {
            if( parseInt( userID, 10 ) === 0 ) {
                $('#pop-login').modal('show');
            } else {
                jQuery.ajax({
                    type: 'post',
                    url: ajaxurl,
                    dataType: 'json',
                    data: {
                        'action': 'houzez_add_to_favorite',
                        'property_id': propID
                    },
                    success: function( data ) {
                        if( data.added ) {
                            curnt.removeClass('fa-heart-o').addClass('fa-heart');
                        } else {
                            curnt.removeClass('fa-heart').addClass('fa-heart-o');
                        }
                    },
                    error: function(xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        console.log(err.Message);
                    }
                });
            } // End else
        }

        /* ------------------------------------------------------------------------ */
        /*	Fave login and regsiter
         /* ------------------------------------------------------------------------ */
        $('.fave-login-button').click(function(e){
            e.preventDefault();
            var currnt = $(this);
            houzez_login( currnt );
        });

        $('.fave-register-button').click(function(e){
            e.preventDefault();
            var currnt = $(this);
            houzez_register( currnt );
        });

        var houzez_login = function( currnt ) {
            var $form = currnt.parents('form');
            var $messages = currnt.parents('.login-block').find('.houzez_messages');

            $.ajax({
                type: 'post',
                url: ajaxurl,
                dataType: 'json',
                data: $form.serialize(),
                beforeSend: function () {
                    $messages.empty().append('<p class="success text-success"> '+ login_sending +'</p>');
                },
                success: function( response ) {
                    if( response.success ) {
                        $messages.empty().append('<p class="success text-success"><i class="fa fa-check"></i> '+ response.msg +'</p>');
                        if( login_redirect_type == 'same_page' ) {
                            location.reload();
                        } else {
                            location.href = login_redirect;
                        }

                    } else {
                        $messages.empty().append('<p class="error text-danger"><i class="fa fa-close"></i> '+ response.msg +'</p>');
                    }
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.Message);
                }
            })

        } // end houzez_login

        var houzez_register = function ( currnt ) {

            var $form = currnt.parents('form');
            var $messages = currnt.parents('.login-block').find('.houzez_messages_register');

            $.ajax({
                type: 'post',
                url: ajaxurl,
                dataType: 'json',
                data: $form.serialize(),
                beforeSend: function () {
                    $messages.empty().append('<p class="success text-success"> '+ login_sending +'</p>');
                },
                success: function( response ) {
                    if( response.success ) {
                        $messages.empty().append('<p class="success text-success"><i class="fa fa-check"></i> '+ response.msg +'</p>');
                    } else {
                        $messages.empty().append('<p class="error text-danger"><i class="fa fa-close"></i> '+ response.msg +'</p>');
                    }
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.Message);
                }
            });
        }

        /* ------------------------------------------------------------------------ */
        /*	Reset Password
         /* ------------------------------------------------------------------------ */
        $( '#houzez_forgetpass').click(function(){
            var user_login = $('#user_login_forgot').val(),
                security    = $('#fave_resetpassword_security').val();

            $.ajax({
                type: 'post',
                url: ajaxurl,
                dataType: 'json',
                data: {
                    'action': 'houzez_reset_password',
                    'user_login': user_login,
                    'security': security
                },
                success: function( response ) {
                    if( response.success ) {
                        $('#houzez_msg_reset').empty().append('<p class="success text-success"><i class="fa fa-check"></i> '+ response.msg +'</p>');
                    } else {
                        $('#houzez_msg_reset').empty().append('<p class="error text-danger"><i class="fa fa-close"></i> '+ response.msg +'</p>');
                    }
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.Message);
                }
            });

        });

        /* ------------------------------------------------------------------------ */
        /*	Paypal single listing payment
         /* ------------------------------------------------------------------------ */
        $( '.paypal_single_listing').click(function(){
            var property_id, check_featured, is_prop_featured, is_prop_upgrade, current_element;
            current_element = $(this);
            is_prop_featured = 0;
            is_prop_upgrade = 0;

            fave_processing_modal( paypal_connecting );

            property_id = current_element.attr('data-propertyid');
            check_featured = current_element.parents('.dropdown-menu').find('input');

            if (check_featured.prop('checked')) {
                is_prop_featured = 1;
            } else {
                is_prop_featured = 0;
            }
            fave_paypal_payment( property_id, is_prop_featured, is_prop_upgrade);
        });

        /* ------------------------------------------------------------------------ */
        /*	Paypal single listing upgrade to featured
         /* ------------------------------------------------------------------------ */
        $('.paypal_single_listing_upgrade').click(function() {
            var property_id, is_prop_featured, is_prop_upgrade, current_element;
            current_element = $(this);
            is_prop_featured = 0;
            is_prop_upgrade = 1;
            property_id = current_element.attr('data-propertyid');

            fave_processing_modal( paypal_connecting );

            fave_paypal_payment( property_id, is_prop_featured, is_prop_upgrade);
        });

        var fave_processing_modal = function ( msg ) {
            var process_modal ='<div class="modal fade" id="fave_modal" tabindex="-1" role="dialog" aria-labelledby="faveModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-body houzez_messages_modal">'+msg+'</div></div></div></div></div>';
            jQuery('body').append(process_modal);
            jQuery('#fave_modal').modal();
        }

        var fave_processing_modal_close = function ( ) {
            jQuery('#fave_modal').modal('hide');
        }


        /* ------------------------------------------------------------------------ */
        /*	Paypal payment function
         /* ------------------------------------------------------------------------ */
        var fave_paypal_payment = function( property_id, is_prop_featured, is_prop_upgrade ) {

            $.ajax({
               type: 'post',
               url: ajaxurl,
               data: {
                 'action': 'houzez_property_paypal_payment',
                 'prop_id': property_id,
                 'is_prop_featured': is_prop_featured,
                 'is_prop_upgrade': is_prop_upgrade,
                },
                success: function( response ) {
                    window.location.href = response;
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.Message);
                }
            });
        }

        /* ------------------------------------------------------------------------ */
        /*  Package upgrade via paypal
         /* ------------------------------------------------------------------------ */
        $('#pick_package').click(function () {
            var pay_paypal;
            fave_processing_modal( paypal_connecting );

            if ($('#package_recuring').is(':checked')) {
                houzez_recuring_package_via_paypal();
            } else {
                fave_pay_package_via_paypal();
            }
        });

        var fave_pay_package_via_paypal = function() {
            "use strict";
            var  packageName, packageId;
            packageName = jQuery('#selected_package :selected').text();
            packageId   = jQuery('#selected_package :selected').val();

            $.ajax({
                type: 'POST',
                url: ajaxurl,
                data: {
                    'action'    : 'houzez_ajax_paypal_package_generation',
                    'packageName'  : packageName,
                    'packageId'    : packageId
                },
                success: function (data) {
                    window.location.href = data;
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.Message);
                }
            });//end ajax
        }

        var houzez_recuring_package_via_paypal = function() {
            var package_name =   jQuery('#selected_package :selected').text();
            var pack_id      =   jQuery('#selected_package :selected').val();

            jQuery.ajax({
                type: 'POST',
                url: ajaxurl,
                data: {
                    'action'       : 'houzez_ajax_paypal_package_recurring_generation',
                    'package_name' : package_name,
                    'pack_id'      : pack_id
                },
                success: function (data) {
                    window.location.href = data;
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.Message);
                }
            });
        }


        /* ------------------------------------------------------------------------ */
        /*	Wire Transfer single listing payment
         /* ------------------------------------------------------------------------ */
        $( '.wire_single_listing').click(function(){
            var property_id, check_featured, prop_featured, prop_upgrade, current_element, selected_property;
            current_element = $(this);
            selected_property = current_element.attr('data-propertyID');
            check_featured = current_element.parents('.dropdown-menu').find('input');

            var total_price = current_element.parents('.dropdown-menu').find('.submission_total_price').text();

            if ( currency_position === 'after'){
                total_price = total_price +' '+submission_currency;
            }else{
                total_price = submission_currency+' '+total_price;
            }

            total_price = wire_transfer_text+': <strong>'+total_price+'</strong>';

            var prop_featured =' data-prop-featured="0" ';
            $('#send_wire_transfer').attr('data-prop-featured',0);
            $('#send_wire_transfer').attr('data-listing', selected_property);

            if ( check_featured.prop('checked') ){
                prop_featured=' data-prop-featured="1" ';
                    $('#send_wire_transfer').attr('data-prop-featured',1);
            }

            var attr = $(this).attr('data-isupgrade');
            if (typeof attr !== typeof undefined && attr !== false) {
                prop_featured=' data-prop-featured="1" ';
                $('#send_wire_transfer').attr('data-prop-featured',1);
            }

            window.scrollTo(0, 0);
            var wire_transfer_modal='<div class="modal fade" id="direct_pay_perlisting_modal" tabindex="-1" role="dialog"aria-labelledby="instructions">'+
                '<div class="modal-dialog">'+
                '<div class="modal-content">'+
                '<div class="modal-header">'+
                '<h4 class="modal-title" id="instructions">'+direct_payment_title+'</h4>'+
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fa fa-close"></i></button>'+
                '</div>'+
                '<div class="modal-body modal-payment">'+
                '<div class="modal-payment-text">'+total_price+'<br>'+
                direct_payment_details+
                '<div id="send_wire_transfer" '+prop_featured+' data-listing="'+selected_property+'" class="btn btn-orange">'+direct_payment_button+'</div>'+
                '<span class="direct_pay_thanks"></span>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>';

            jQuery('body').append(wire_transfer_modal);
            jQuery('#direct_pay_perlisting_modal').modal();
            houzez_enable_wire_transfer_perlisting();
            $('#direct_pay_perlisting_modal').on('hidden.bs.modal', function (e) {
                $('#direct_pay_perlisting_modal').remove();
            })
        });

        var houzez_enable_wire_transfer_perlisting = function() {
            jQuery('#send_wire_transfer').unbind('click');
            jQuery('#send_wire_transfer').click(function(){
                jQuery('#send_wire_transfer').unbind('click');
                var selected_prop_id, is_featured;

                is_featured    =   jQuery(this).attr('data-prop-featured')
                selected_prop_id   =   jQuery(this).attr('data-listing');

                jQuery.ajax({
                    type: 'POST',
                    url: ajaxurl,
                    data: {
                        'action'        : 'houzez_wire_transfer_per_listing',
                        'prop_id'       : selected_prop_id,
                        'is_featured'   : is_featured,
                    },
                    success: function (data) {
                        jQuery('#send_wire_transfer').hide();
                        jQuery('#direct_pay_perlisting_modal .direct_pay_thanks').empty().html('<hr/>'+direct_pay_thanks);
                    },
                    error: function (errorThrown) {}
                });

            });
        }

        $('#direct_pay_package').click(function(){
            var direct_pay_modal, selected_package, price_package, package_name;

            selected_package = $('#selected_package').val();
            price_package    = $('#selected_package option:selected').attr('data-price');
            package_name    = $('#selected_package option:selected').attr('data-pack');

            if ( currency_position === 'after'){
                price_package = price_package +' '+submission_currency;
            }else{
                price_package = submission_currency+' '+price_package;
            }
            price_package = wire_transfer_text+': <strong>'+price_package+'</strong>';

            if( selected_package !== '' ) {
                window.scrollTo(0, 0);
                direct_pay_modal='<div class="modal fade" id="direct_pay_package_modal" tabindex="-1" role="dialog"aria-labelledby="instructions">'+
                    '<div class="modal-dialog">'+
                '<div class="modal-content">'+
                '<div class="modal-header">'+
                '<h4 class="modal-title" id="instructions">'+direct_payment_title+'</h4>'+
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fa fa-close"></i></button>'+
                '</div>'+
                '<div class="modal-body modal-payment">'+
                '<div class="modal-payment-text">'+price_package+'<br>'+
                    direct_payment_details+
                '<div id="send_direct_pay_package" data-pack="'+selected_package+'" class="btn btn-orange">'+direct_payment_button+'</div>'+
                '<span class="direct_pay_thanks"></span>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>';


                jQuery('body').append(direct_pay_modal);
                jQuery('#direct_pay_package_modal').modal();
                houzez_enable_direct_pay_package();
            }

            $('#direct_pay_package_modal').on('hidden.bs.modal', function (e) {
                $('#direct_pay_package_modal').remove();
            })

        });

        var houzez_enable_direct_pay_package = function(){
            jQuery('#send_direct_pay_package').click(function(){
                jQuery('#send_direct_pay_package').unbind('click');

                var selected_package = jQuery(this).attr('data-pack');

                jQuery.ajax({
                    type: 'POST',
                    url: ajaxurl,
                    data: {
                        'action'           : 'houzez_direct_pay_package',
                        'selected_package' : selected_package,
                    },
                    success: function (data) {
                        jQuery('#send_direct_pay_package').hide();
                        jQuery('#direct_pay_package_modal .direct_pay_thanks').empty().html('<hr/>'+direct_pay_thanks);

                    },
                    error: function (errorThrown) {}
                });

            });

        }

        /*--------------------------------------------------------------------------
         *  Social Logins
         * -------------------------------------------------------------------------*/
        $('.yahoo-login').click(function () {
            var current = $(this);
            houzez_login_via_yahoo( current );
        });

        var houzez_login_via_yahoo = function ( current ) {
            var $form = current.parents('form');
            var $messages = current.parents('.login-block').find('.houzez_messages');

            $.ajax({
                type: 'POST',
                url: ajaxurl,
                data: {
                    'action' : 'houzez_yahoo_login'
                },
                beforeSend: function () {
                    $messages.empty().append('<p class="success text-success"> '+ login_sending +'</p>');
                },
                success: function (data) {
                    window.location.href = data;
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.Message);
                }
            });
        }

        $('.google-login').click(function () {
            var current = $(this);
            houzez_login_via_google( current );
        });

        var houzez_login_via_google = function ( current ) {
            var $form = current.parents('form');
            var $messages = current.parents('.login-block').find('.houzez_messages');

            $.ajax({
                type: 'POST',
                url: ajaxurl,
                data: {
                    'action' : 'houzez_google_login_oauth'
                },
                beforeSend: function () {
                    $messages.empty().append('<p class="success text-success"> '+ login_sending +'</p>');
                },
                success: function (data) {
                    window.location.href = data;
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.Message);
                }
            });
        }

        $('.facebook-login').click(function () {
            var current = $(this);
            houzez_login_via_facebook( current );
        });

        var houzez_login_via_facebook = function ( current ) {
            var $form = current.parents('form');
            var $messages = current.parents('.login-block').find('.houzez_messages');

            $.ajax({
                type: 'POST',
                url: ajaxurl,
                data: {
                    'action' : 'houzez_facebook_login_oauth'
                },
                beforeSend: function () {
                    $messages.empty().append('<p class="success text-success"> '+ login_sending +'</p>');
                },
                success: function (data) {
                    window.location.href = data;
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.Message);
                }
            });
        }

        /*--------------------------------------------------------------------------
         *  Invoice Filter
         * -------------------------------------------------------------------------*/
        $('#invoice_status, #invoice_type').change(function() {
            houzez_invoices_filter();
        });

        $('#startDate, #endDate').focusout(function() {
            houzez_invoices_filter();
        })

        var houzez_invoices_filter = function() {
            var inv_status = $('#invoice_status').val(),
                inv_type   = $('#invoice_type').val(),
                startDate  = $('#startDate').val(),
                endDate  = $('#endDate').val();

            $.ajax({
                url: ajaxurl,
                dataType: 'json',
                type: 'POST',
                data: {
                    'action': 'houzez_invoices_filter',
                    'invoice_status': inv_status,
                    'invoice_type'  : inv_type,
                    'startDate'     : startDate,
                    'endDate'       : endDate
                },
                success: function(res) { //alert(res);
                    if(res.success) {
                        $('#invoices_content').empty().append( res.result );
                        $( '#invoices_total_price').empty().append( res.total_price );
                    }
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.Message);
                }
            });
        }

        /*--------------------------------------------------------------------------
         *  Houzez Add Marker
         * -------------------------------------------------------------------------*/
        var houzezAddMarkers = function( props, map ) {
            $.each(props, function(i, prop) {

                var latlng = new google.maps.LatLng(prop.lat,prop.lng);

                var marker_url = prop.icon;
                var marker_size = new google.maps.Size( 44, 56 );
                if( window.devicePixelRatio > 1.5 ) {
                    if ( prop.retinaIcon ) {
                        marker_url = prop.retinaIcon;
                        marker_size = new google.maps.Size( 84, 106 );
                    }
                }

                var marker_icon = {
                    url: marker_url,
                    size: marker_size,
                    scaledSize: new google.maps.Size( 44, 56 ),
                    origin: new google.maps.Point( 0, 0 ),
                    anchor: new google.maps.Point( 7, 27 )
                };

                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: marker_icon,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                });

                var prop_title = prop.data ? prop.data.post_title : prop.title;

                var infoboxContent = document.createElement("div");
                infoboxContent.className = 'property-item item-grid map-info-box';
                infoboxContent.innerHTML = '' +
                    '<div class="figure-block">' +
                    '<figure class="item-thumb">' +
                    '<div class="price hide-on-list">' +
                    '<h3>'+prop.price+'</h3>' +
                    '</div>' +
                    '<a href="'+prop.url+'" class="hover-effect" tabindex="0">' + prop.thumbnail + '</a>' +
                    '<figcaption class="thumb-caption cap-actions clearfix">' +
                    '<div class="pull-right">' +
                    '<span title="" data-placement="top" data-toggle="tooltip" data-original-title="Photos">' +
                    '<i class="fa fa-camera"></i> ' +
                    '<span class="count">'+prop.images_count+'</span>' +
                    '</span>' +
                    '</div>' +
                    '</figcaption>' +
                    '</figure>' +
                    '</div>' +
                    '<div class="item-body">' +
                    '<div class="body-left">' +
                    '<div class="info-row">' +
                    '<h2><a href="'+prop.url+'">'+prop_title+'</a></h2>' +
                    '<h4>'+prop.address+'</h4>' +
                    '</div>' +
                    '<div class="table-list full-width info-row">' +
                    '<div class="cell">' +
                    '<div class="info-row amenities">' + prop.prop_meta +
                    '<p>'+prop.type+'</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        var scale = Math.pow(2, map.getZoom());
                        var offsety = ( (100 / scale) || 0 );
                        var projection = map.getProjection();
                        var markerPosition = marker.getPosition();
                        var markerScreenPosition = projection.fromLatLngToPoint(markerPosition);
                        var pointHalfScreenAbove = new google.maps.Point(markerScreenPosition.x, markerScreenPosition.y - offsety);
                        var aboveMarkerLatLng = projection.fromPointToLatLng(pointHalfScreenAbove);
                        map.setCenter(aboveMarkerLatLng);
                        infobox.setContent(infoboxContent);
                        infobox.open(map, marker);

                    }
                })(marker, i));

                 /*$(document).on('touchend', '.closeInfo', function(e) {
                    infobox.open(null,null);
                });
                $(document).on('click', '.closeInfo', function(e) {
                    infobox.open(null,null);
                });*/

                markers.push(marker);
            });
        }

        /*--------------------------------------------------------------------------
         *  Header Map
         * -------------------------------------------------------------------------*/

        var houzez_map_radius = function( houzezMap, keyword, radius ) {

            var geocoder = new google.maps.Geocoder();

            geocoder.geocode( { 'address': keyword }, function(results, status) {

              if (status == 'OK') {

                houzezMap.setCenter(results[0].geometry.location);

                var circle      = new google.maps.Circle({
                    map: houzezMap,
                    radius: radius * 100, // 3000 km
                    center: results[0].geometry.location,
                    fillColor: '#FF0000',
                    fillOpacity: 0.2,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.6
                });

                houzezMap.fitBounds( circle.getBounds() );

              } else {

                // alert('Geocode was not successful for the following reason: ' + status);

              }

            });

        }

        var houzez_map_zoomin = function(houzezMap) {
            google.maps.event.addDomListener(document.getElementById('listing-mapzoomin'), 'click', function () {
                var current= parseInt( houzezMap.getZoom(),10);
                current++;
                if(current > 20){
                    current = 20;
                }
                houzezMap.setZoom(current);
            });
        }

        var houzez_map_zoomout = function(houzezMap) {
            google.maps.event.addDomListener(document.getElementById('listing-mapzoomout'), 'click', function () {
                var current= parseInt( houzezMap.getZoom(),10);
                current--;
                if(current < 0){
                    current = 0;
                }
                houzezMap.setZoom(current);
            });
        }

        var houzez_change_map_type = function(houzezMap, map_type){

            if(map_type==='roadmap'){
                houzezMap.setMapTypeId(google.maps.MapTypeId.ROADMAP);
            }else if(map_type==='satellite'){
                houzezMap.setMapTypeId(google.maps.MapTypeId.SATELLITE);
            }else if(map_type==='hybrid'){
                houzezMap.setMapTypeId(google.maps.MapTypeId.HYBRID);
            }else if(map_type==='terrain'){
                houzezMap.setMapTypeId(google.maps.MapTypeId.TERRAIN);
            }
            return false;
        }

        var houzez_map_next = function(houzezMap) {
            current_marker++;
            if ( current_marker > markers.length ){
                current_marker = 1;
            }
            while( markers[current_marker-1].visible===false ){
                current_marker++;
                if ( current_marker > markers.length ){
                    current_marker = 1;
                }
            }
            if( houzezMap.getZoom() < 15 ){
                houzezMap.setZoom(15);
            }
            google.maps.event.trigger( markers[current_marker-1], 'click' );
        }

        var houzez_map_prev = function(houzezMap) {
            current_marker--;
            if (current_marker < 1){
                current_marker = markers.length;
            }
            while( markers[current_marker-1].visible===false ){
                current_marker--;
                if ( current_marker > markers.length ){
                    current_marker = 1;
                }
            }
            if( houzezMap.getZoom() <15 ){
                houzezMap.setZoom(15);
            }
            google.maps.event.trigger( markers[current_marker-1], 'click');
        }

        var houzez_map_search_field = function (houzezMap, mapInput) {

            var searchBox = new google.maps.places.SearchBox(mapInput);
            houzezMap.controls[google.maps.ControlPosition.TOP_LEFT].push(mapInput);

            // Bias the SearchBox results towards current map's viewport.
            houzezMap.addListener('bounds_changed', function() {
                searchBox.setBounds(houzezMap.getBounds());
            });

            var markers_location = [];
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function() {
                var places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }

                // Clear out the old markers.
                markers_location.forEach(function(marker) {
                    marker.setMap(null);
                });
                markers_location = [];

                // For each place, get the icon, name and location.
                var bounds = new google.maps.LatLngBounds();
                places.forEach(function(place) {
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    // Create a marker for each place.
                    markers_location.push(new google.maps.Marker({
                        map: houzezMap,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location
                    }));

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                houzezMap.fitBounds(bounds);
            });
        }

        var houzez_map_parallax = function(houzezMap) {
            var offset = $(houzezMap.getDiv()).offset();

            houzezMap.panBy(((houzezHeaderMapOptions.scroll.x-offset.left)/3),((houzezHeaderMapOptions.scroll.y-offset.top)/3));
            google.maps.event.addDomListener(window, 'scroll', function(){
                var scrollY = $(window).scrollTop(),
                    scrollX = $(window).scrollLeft(),
                    scroll = houzezMap.get('scroll');
                if(scroll){
                    houzezMap.panBy(-((scroll.x-scrollX)/3),-((scroll.y-scrollY)/3));
                }
                houzezMap.set('scroll',{x:scrollX,y:scrollY})

            });
        }

        var reloadMarkers = function() {
            // Loop through markers and set map to null for each
            for (var i=0; i<markers.length; i++) {

                markers[i].setMap(null);
            }
            // Reset the markers array
            markers = [];
        }

        var houzezGeoLocation = function( map ) {

            // get my location useing HTML5 geolocation

            if ( navigator.geolocation ) {

                navigator.geolocation.getCurrentPosition( function( position ) {

                    var pos = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                    };

                    var infoWindow = new google.maps.InfoWindow({map: map});

                    alert( 'icon : ' + clusterIcon );

                    var circle = new google.maps.Circle({
                        radius: 10 * 100,
                        center: pos,
                        map: map,
                        icon: clusterIcon,
                        fillColor: '#FF0000',
                        fillOpacity: 0.2,
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.6
                    });

                    // circle.bindTo('center', marker, 'position');
                    map.fitBounds( circle.getBounds() );

                    var marker=new google.maps.Marker({
                        position    :pos,
                        animation   :google.maps.Animation.BOUNCE,
                        map: map
                    });

                    infoWindow.setPosition( pos );
                    infoWindow.setContent('Location found.');
                    map.setCenter(pos);

                }, function() {

                    handleLocationError(true, map, map.getCenter());

                });

            }

        }


        var houzezLatLng = function ( keyword ) {

            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': keyword }, function(results, status) {

                if (status == 'OK') {
                    return results[0].geometry.location;
                }
            });

        }

        var houzez_header_listing_map = function(keyword, location, area, status, type, bedrooms, bathrooms, min_price, max_price, min_area, max_area, publish_date ) {
            var headerMapSecurity = $('#securityHouzezHeaderMap').val();
            var initial_city = HOUZEZ_ajaxcalls_vars.header_map_selected_city;

            //alert(keyword+' '+location+' '+status+' '+type+' '+bedrooms+' '+bathrooms+' '+min_price+' '+max_price+' '+min_area+' '+max_area);
            // alert(location+' '+area);
            //var propLatlng;

            /*if( radius != 'none' ) {
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode( { 'address': keyword }, function(results, status) {

                    if (status == 'OK') {
                        propLatlng = results[0].geometry.location;
                    }
                });
            }*/

            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: ajaxurl,
                data: {
                    'action': 'houzez_header_map_listings',
                    'initial_city': initial_city,
                    'keyword': keyword,
                    'location': location,
                    'area': area,
                    'status': status,
                    'type': type,
                    'bedrooms': bedrooms,
                    'bathrooms': bathrooms,
                    'min_price': min_price,
                    'max_price': max_price,
                    'min_area': min_area,
                    'max_area': max_area,
                    'publish_date': publish_date,
                    //'radius': radius,
                    //'propLatlng': propLatlng,
                    'security': headerMapSecurity
                },
                beforeSend: function() {
                    $('#houzez-map-loading').show();
                },
                success: function(data) {

                    houzezMap = new google.maps.Map(document.getElementById('houzez-listing-map'), houzezHeaderMapOptions);
                    google.maps.event.trigger(houzezMap, 'resize');

                    if( google_map_style !== '' ) {
                        var styles = JSON.parse ( google_map_style );
                        houzezMap.setOptions({styles: styles});
                    }

                    var mapPosition = new google.maps.LatLng('', '');
                    houzezMap.setCenter(mapPosition);
                    houzezMap.setZoom(parseInt(googlemap_default_zoom));

                    if( document.getElementById('listing-mapzoomin') ) {
                        houzez_map_zoomin(houzezMap);
                    }
                    if( document.getElementById('listing-mapzoomout') ) {
                        houzez_map_zoomout(houzezMap);
                    }
                    if( document.getElementById('google-map-search') ) {
                        var mapInput = document.getElementById('google-map-search');
                        houzez_map_search_field(houzezMap, mapInput);
                    }

                    $('.houzezMapType').click(function() {
                        var maptype = $(this).data('maptype');
                        houzez_change_map_type(houzezMap, maptype);
                    })

                    $('#houzez-gmap-next').click(function(){
                        houzez_map_next(houzezMap);
                    });

                    $('#houzez-gmap-prev').click(function(){
                        houzez_map_prev(houzezMap);
                    });

                    if( document.getElementById('houzez-gmap-location') ){
                        google.maps.event.addDomListener(document.getElementById('houzez-gmap-location'), 'click', function () {
                            houzezGeoLocation( houzezMap );
                        });
                    }
                    remove_map_loader(houzezMap);

                    // Parallax
                    houzez_map_parallax(houzezMap);

                    if(data.getProperties === true) {

                        reloadMarkers();
                        houzezAddMarkers( data.properties, houzezMap );

                        /*$( 'select[name=radious]' ).on( 'change', function() {
                            var radius  = $( "option:selected", this ).val();

                            alert( radius );

                            houzez_map_radius( houzezMap, keyword, radius );
                        });
*/
                        houzezMap.fitBounds( markers.reduce(function(bounds, marker ) {
                            return bounds.extend( marker.getPosition() );
                        }, new google.maps.LatLngBounds()));

                        google.maps.event.trigger( houzezMap, 'resize' );

                        markerCluster = new MarkerClusterer( houzezMap, markers, {
                            maxZoom: 18,
                            gridSize: 60,
                            styles: [
                                {
                                    url: clusterIcon,
                                    width: 48,
                                    height: 48,
                                    textColor: "#fff"
                                }
                            ]
                        });
                    } else {
                        $('#houzez-listing-map').empty().html('<div class="map-notfound">'+not_found+'</div>');
                    }

                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(xhr.responseText);
                    console.log(thrownError);
                }
            });
        }

        var houzez_half_map_listings = function(keyword, location, area, status, type, bedrooms, bathrooms, min_price, max_price, min_area, max_area, publish_date) {
            var headerMapSecurity = $('#securityHouzezHeaderMap').val();
            var initial_city = HOUZEZ_ajaxcalls_vars.header_map_selected_city;

            //alert(keyword+' '+location+' '+status+' '+type+' '+bedrooms+' '+bathrooms+' '+min_price+' '+max_price+' '+min_area+' '+max_area);
            //alert(min_price+' '+max_price);
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: ajaxurl,
                data: {
                    'action': 'houzez_header_map_listings',
                    'initial_city': initial_city,
                    'keyword': keyword,
                    'location': location,
                    'area': area,
                    'status': status,
                    'type': type,
                    'bedrooms': bedrooms,
                    'bathrooms': bathrooms,
                    'min_price': min_price,
                    'max_price': max_price,
                    'min_area': min_area,
                    'max_area': max_area,
                    'publish_date': publish_date,
                    'security': headerMapSecurity
                },
                beforeSend: function() {
                    $('#houzez-map-loading').show();
                },
                success: function(data) { //alert(JSON.stringify(data.properties)); return;

                    houzezMap = new google.maps.Map(document.getElementById('mapViewHalfListings'), houzezMapoptions);
                    //google.maps.event.trigger(houzezMap, 'resize');

                    if( google_map_style !== '' ) {
                        var styles = JSON.parse ( google_map_style );
                        houzezMap.setOptions({styles: styles});
                    }

                    var mapPosition = new google.maps.LatLng('', '');
                    houzezMap.setCenter(mapPosition);
                    houzezMap.setZoom(parseInt(googlemap_default_zoom));

                    if( document.getElementById('houzez-gmap-location') ){
                        google.maps.event.addDomListener(document.getElementById('houzez-gmap-location'), 'click', function () {
                            houzezGeoLocation( houzezMap );
                        });
                    }

                    remove_map_loader(houzezMap);

                    if(data.getProperties === true) {

                        reloadMarkers();
                        houzezAddMarkers( data.properties, houzezMap );

                        houzezMap.fitBounds( markers.reduce(function(bounds, marker ) {
                            return bounds.extend( marker.getPosition() );
                        }, new google.maps.LatLngBounds()));

                        google.maps.event.trigger( houzezMap, 'resize' );

                        markerCluster = new MarkerClusterer( houzezMap, markers, {
                            maxZoom: 18,
                            gridSize: 60,
                            styles: [
                                {
                                    url: clusterIcon,
                                    width: 48,
                                    height: 48,
                                    textColor: "#fff"
                                }
                            ]
                        });
                    } else {
                        $('#mapViewHalfListings').empty().html('<div class="map-notfound">'+not_found+'</div>');
                    }

                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(xhr.responseText);
                    console.log(thrownError);
                }
            });
        }

        var houzez_half_map_listings_list = function(keyword, location, area, status, type, bedrooms, bathrooms, min_price, max_price, min_area, max_area, publish_date) {
            var headerMapSecurity = $('#securityHouzezHeaderMap').val();
            //var initial_city = HOUZEZ_ajaxcalls_vars.header_map_selected_city;

            //alert(keyword+' '+location+' '+status+' '+type+' '+bedrooms+' '+bathrooms+' '+min_price+' '+max_price+' '+min_area+' '+max_area);
            //alert(min_price+' '+max_price);

            var ajax_container = $('#houzez_ajax_container');

            $.ajax({
                type: 'POST',
                //dataType: 'json',
                url: ajaxurl,
                data: {
                    'action': 'houzez_half_map_listings',
                    //'initial_city': initial_city,
                    'keyword': keyword,
                    'location': location,
                    'area': area,
                    'status': status,
                    'type': type,
                    'bedrooms': bedrooms,
                    'bathrooms': bathrooms,
                    'min_price': min_price,
                    'max_price': max_price,
                    'min_area': min_area,
                    'max_area': max_area,
                    'publish_date': publish_date,
                    'security': headerMapSecurity
                },
                beforeSend: function() {
                    ajax_container.empty().append(''
                        +'<div class="list-loading">'
                        +'<div class="list-loading-bar"></div>'
                        +'<div class="list-loading-bar"></div>'
                        +'<div class="list-loading-bar"></div>'
                        +'<div class="list-loading-bar"></div>'
                        +'</div>'
                    );
                },
                success: function(data) {
                    if( data != '' ) {
                        ajax_container.empty().html(data);
                    } else {
                        ajax_container.empty().html('<div class="map-notfound">'+not_found+'</div>');
                    }
                },
                error: function(errorThrown) {

                }
            });
        }

        var houzez_search_on_change = function (current_form, form_widget, min_price_onchange_status, max_price_onchange_status, only_city ) {
            var location, area, status, type, bedrooms, bathrooms, min_price, max_price, min_area, max_area, keyword, publish_date, radius;

            if( min_price_onchange_status != null && max_price_onchange_status != null ) {
                min_price = min_price_onchange_status;
                max_price = max_price_onchange_status;
            } else {
                if (form_widget.hasClass('widget') || advanced_search_price_slide != 0 ) {
                    min_price = current_form.find('input[name="min-price"]').val();
                    max_price = current_form.find('input[name="max-price"]').val();
                } else {
                    min_price = current_form.find('select[name="min-price"]:not(:disabled)').val();
                    max_price = current_form.find('select[name="max-price"]:not(:disabled)').val();
                }
            }

            location  = current_form.find('select[name="location"]').val();
            if( location == '' ) {
                location = 'all';
            }

            if( only_city != 'yes' ) {
                area = current_form.find('select[name="area"]').val();
            }
            status    = current_form.find('select[name="status"]').val();
            type      = current_form.find('select[name="type"]').val();
            bedrooms  = current_form.find('select[name="bedrooms"]').val();
            bathrooms = current_form.find('select[name="bathrooms"]').val();
            min_area  = current_form.find('input[name="min-area"]').val();
            max_area  = current_form.find('input[name="max-area"]').val();
            keyword   = current_form.find('input[name="keyword"]').val();
            publish_date   = current_form.find('input[name="publish_date"]').val();
            /*radius = current_form.find('select[name="radius"]').val();

            if( radius == '' ) {
                radius = 'none';
            }*/

            if(current_tempalte == 'template/property-listings-map.php') {
                houzez_half_map_listings(keyword, location, area, status, type, bedrooms, bathrooms, min_price, max_price, min_area, max_area, publish_date);
                houzez_half_map_listings_list(keyword, location, area, status, type, bedrooms, bathrooms, min_price, max_price, min_area, max_area, publish_date);
            } else {
                houzez_header_listing_map(keyword, location, area, status, type, bedrooms, bathrooms, min_price, max_price, min_area, max_area, publish_date );
            }
        }

        var populate_area_dropdown = function(current_form) {
            var city;
            city  = current_form.find('select[name="location"]').val();

            if( city != '' ) {
                current_form.find('select[name="area"]').selectpicker('val', '');
                current_form.find('select[name="area"] option').each(function () {
                    var areaCity = $(this).data('parentcity');
                    if( $(this).val() != '' ) {
                        $(this).css('display', 'none');
                    }
                    if (areaCity == city) {
                        $(this).css('display', 'block');
                    }
                });
            } else {
                current_form.find('select[name="area"] option').each(function () {
                    $(this).css('display', 'block');
                });
            }
            current_form.find('select[name="area"]').selectpicker('refresh');
        }


        if($("#houzez-listing-map").length > 0 || $('#mapViewHalfListings').length > 0 ) {

            $('select[name="area"], select[name="bedrooms"], select[name="bathrooms"], select[name="min-price"], select[name="max-price"], input[name="min-price"], input[name="max-price"], input[name="min-area"], input[name="max-area"], select[name="type"], input[name="keyword"]').on('change', function() {
                var current_form = $(this).parents('form');
                var form_widget = $(this).parents('.widget_houzez_advanced_search');
                houzez_search_on_change(current_form, form_widget);
            });

            $('select[name="location"]').on('change', function() {
                var current_form = $(this).parents('form');
                var form_widget = $(this).parents('.widget_houzez_advanced_search');
                var only_city = 'yes';
                houzez_search_on_change(current_form, form_widget, '', '', only_city);
                populate_area_dropdown(current_form);
            })

            $(".search-date").on("dp.change", function(e) {
                //alert($(this).val());
                var current_form = $(this).parents('form');
                var form_widget = $(this).parents('.widget_houzez_advanced_search');
                houzez_search_on_change(current_form, form_widget);
            });

            $('select[name="status"]').on('change', function() {
                var current_form = $(this).parents('form');
                var form_widget = $(this).parents('.widget_houzez_advanced_search');

                var search_status = $(this).val();
                if( search_status == rent_status_for_price_range ) {
                    if(advanced_search_price_slide != 0) {
                        houzez_search_on_change(current_form, form_widget, advanced_search_price_range_min_rent, advanced_search_price_range_max_rent);
                    } else {
                        houzez_search_on_change(current_form, form_widget);
                    }
                } else {
                    if(advanced_search_price_slide != 0) {
                        houzez_search_on_change(current_form, form_widget, advanced_search_price_range_min, advanced_search_price_range_max);
                    } else {
                        houzez_search_on_change(current_form, form_widget);
                    }
                }

            })

            if(current_tempalte == 'template/property-listings-map.php') {
                houzez_half_map_listings();
            } else {
                houzez_header_listing_map();
            }
        } else {
            $('select[name="location"]').on('change', function() {
                var current_form = $(this).parents('form');
                populate_area_dropdown(current_form);
            })
        }

        var remove_map_loader = function(map) {
            google.maps.event.addListener(map, 'tilesloaded', function() {
                jQuery('#houzez-map-loading').hide();
            });
        }


        /* ------------------------------------------------------------------------ */
        /*	RANGE SLIDER
         /* ------------------------------------------------------------------------ */
        var price_range_main_search = function( min_price, max_price ) {
            $(".price-range-advanced").slider({
                range: true,
                min: min_price,
                max: max_price,
                values: [min_price, max_price],
                slide: function (event, ui) {
                    $(".min-price-range-hidden").val( currency_symb + addCommas(ui.values[0]) );
                    $(".max-price-range-hidden").val( currency_symb + addCommas(ui.values[1]) );

                    $(".min-price-range").text( currency_symb + addCommas(ui.values[0]) );
                    $(".max-price-range").text( currency_symb + addCommas(ui.values[1]) );
                },
                stop: function( event, ui ) {

                    if($("#houzez-listing-map").length > 0 || $('#mapViewHalfListings').length > 0 ) {
                        var current_form = $(this).parents('form');
                        var form_widget = $(this).parents('form');
                        houzez_search_on_change(current_form, form_widget);
                    }
                }
            });

            $(".min-price-range-hidden").val(currency_symb + addCommas($(".price-range-advanced").slider("values", 0)));
            $(".max-price-range-hidden").val(currency_symb + addCommas($(".price-range-advanced").slider("values", 1)));

            $(".min-price-range").text(currency_symb + addCommas($(".price-range-advanced").slider("values", 0)));
            $(".max-price-range").text(currency_symb + addCommas($(".price-range-advanced").slider("values", 1)));
        }

        if($( ".price-range-advanced").length > 0 ) {
            price_range_main_search( advanced_search_price_range_min, advanced_search_price_range_max );
        }
        $('.houzez-adv-price-range select[name="status"]').on('change', function(){
            var search_status = $(this).val();
            if( search_status == rent_status_for_price_range ) {
                price_range_main_search(advanced_search_price_range_min_rent, advanced_search_price_range_max_rent);
            } else {
                price_range_main_search( advanced_search_price_range_min, advanced_search_price_range_max );
            }
        });

        /* On page load ( as on search page ) */
        var selected_status_adv_search = $('.houzez-adv-price-range select[name="status"]').val();
        if( selected_status_adv_search == rent_status_for_price_range ){
            price_range_main_search(advanced_search_price_range_min_rent, advanced_search_price_range_max_rent);
        }

        var price_range_widget = function(min_price, max_price) {
            $("#slider-price").slider({
                range: true,
                min: min_price,
                max: max_price,
                values: [min_price, max_price],
                slide: function (event, ui) {
                    $("#min-price").val( currency_symb + addCommas(ui.values[0]));
                    $("#max-price").val( currency_symb + addCommas(ui.values[1]));
                },
                stop: function( event, ui ) {

                    if($("#houzez-listing-map").length > 0 ) {
                        var current_form = $(this).parents('form');
                        var form_widget = $(this).parents('.widget_houzez_advanced_search');
                        houzez_search_on_change(current_form, form_widget);
                    }
                }
            });
            $("#min-price").val(currency_symb + addCommas($("#slider-price").slider("values", 0)));
            $("#max-price").val(currency_symb + addCommas($("#slider-price").slider("values", 1)));
        }

        if($( "#slider-price").length >0) {
            price_range_widget( advanced_search_price_range_min, advanced_search_price_range_max );
        }

        $('#widget_status').on('change', function(){
            var search_status = $(this).val();
            if( search_status == rent_status_for_price_range ) {
                price_range_widget(advanced_search_price_range_min_rent, advanced_search_price_range_max_rent);
            } else {
                price_range_widget( advanced_search_price_range_min, advanced_search_price_range_max );
            }
        });

        /* On page load ( as on search page ) */
        var selected_status_widget_search = $('#widget_status').val();
        if( selected_status_widget_search == rent_status_for_price_range ){
            price_range_widget(advanced_search_price_range_min_rent, advanced_search_price_range_max_rent);
        }


        if($( "#slider-size").length >0) {
            $("#slider-size").slider({
                range: true,
                min: advanced_search_widget_min_area,
                max: advanced_search_widget_max_area,
                values: [advanced_search_widget_min_area, advanced_search_widget_max_area],
                slide: function (event, ui) {
                    $("#min-size").val(ui.values[0] +' '+measurement_unit);
                    $("#max-size").val(ui.values[1] +' '+measurement_unit);
                },
                stop: function( event, ui ) {

                    if($("#houzez-listing-map").length > 0 ) {
                        var current_form = $(this).parents('form');
                        var form_widget = $(this).parents('.widget_houzez_advanced_search');
                        houzez_search_on_change(current_form, form_widget);
                    }
                }
            });
            $("#min-size").val($("#slider-size").slider("values", 0) +' '+measurement_unit);
            $("#max-size").val($("#slider-size").slider("values", 1) +' '+measurement_unit);
        }

        $('.infobox_trigger').each(function(i) {
            $(this).on('mouseenter', function() {
                if(houzezMap) {
                    google.maps.event.trigger(markers[i], 'click');
                }
            });
            $(this).on('mouseleave', function() {
                infobox.open(null,null);
            });
        });


        /*--------------------------------------------------------------------------
         *  Currency Switcher
         * -------------------------------------------------------------------------*/
        var currencySwitcherList = $('#houzez-currency-switcher-list');
        if( currencySwitcherList.length > 0 ) {

            $('#houzez-currency-switcher-list > li').click(function(e) {
                e.stopPropagation();
                currencySwitcherList.slideUp( 200 );

                var selectedCurrencyCode = $(this).data( 'currency-code' );

                if ( selectedCurrencyCode ) {

                    $('#houzez-selected-currency span').html( selectedCurrencyCode );
                    $('#houzez-switch-to-currency').val( selectedCurrencyCode );
                    var security = $('#currency_switch_security').val();
                    var houzez_switch_to_currency = $('#houzez-switch-to-currency').val();
                    fave_processing_modal('<i class="'+process_loader_spinner+'"></i> '+currency_updating_msg);

                    $.ajax({
                        url: ajaxurl,
                        dataType: 'JSON',
                        method: 'POST',
                        data: {
                            'action' : 'houzez_switch_currency',
                            'switch_to_currency' : houzez_switch_to_currency,
                            'security' : security
                        },
                        success: function (res) {
                            if( res.success ) {
                                window.location.reload();
                            } else {
                                console.log( res );
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            console.log(err.Message);
                        }
                    });

                }

            });

            $('#houzez-selected-currency').click(function(e){
                currencySwitcherList.slideToggle( 200 );
                e.stopPropagation();
            });

            $('html').click(function() {
                currencySwitcherList.slideUp( 100 );
            });
        }


        /*--------------------------------------------------------------------------
         *  Area Switcher
         * -------------------------------------------------------------------------*/
        var areaSwitcherList = $('#houzez-area-switcher-list');
        if( areaSwitcherList.length > 0 ) {

            $('#houzez-area-switcher-list > li').click(function(e) {
                e.stopPropagation();
                areaSwitcherList.slideUp( 200 );

                var selectedAreaCode = $(this).data( 'area-code' );
                var houzez_switch_area_text = $('#houzez_switch_area_text').val();

                if ( selectedAreaCode ) {

                    $('#houzez-selected-area span').html( houzez_switch_area_text );
                    $('#houzez-switch-to-area').val( selectedAreaCode );
                    var security = $('#area_switch_security').val();
                    var houzez_switch_to_area = $('#houzez-switch-to-area').val();
                    fave_processing_modal('<i class="'+process_loader_spinner+'"></i> '+measurement_updating_msg);

                    $.ajax({
                        url: ajaxurl,
                        dataType: 'JSON',
                        method: 'POST',
                        data: {
                            'action' : 'houzez_switch_area',
                            'switch_to_area' : houzez_switch_to_area,
                            'security' : security
                        },
                        success: function (res) {
                            if( res.success ) {
                                window.location.reload();
                            } else {
                                console.log( res );
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            console.log(err.Message);
                        }
                    });

                }

            });

            $('#houzez-selected-area').click(function(e){
                areaSwitcherList.slideToggle( 200 );
                e.stopPropagation();
            });

            $('html').click(function() {
                areaSwitcherList.slideUp( 100 );
            });
        }

        /*--------------------------------------------------------------------------
         *  AutoComplete Search
         * -------------------------------------------------------------------------*/
        if( keyword_autocomplete != 0 ) {
            var houzezAutoComplete = function () {

                var houzezSource = jQuery.parseJSON(HOUZEZ_ajaxcalls_vars.houzez_autoComplete);

                var houzezAuto = $('input[name="keyword"]').autocomplete({
                    source: houzezSource,
                    delay: 300,
                    minLength: 1,
                    change: function() {
                        if($("#houzez-listing-map").length > 0 || $('#mapViewHalfListings').length > 0 ) {
                            var current_form = $(this).parents('form');
                            var form_widget = $(this).parents('.widget_houzez_advanced_search');
                            houzez_search_on_change(current_form, form_widget);
                        }
                    }
                });
                houzezAuto.autocomplete('option','change');//.call(houzezAuto);

            }
            houzezAutoComplete();
        }

        /*--------------------------------------------------------------------------
         *  Single Property
         * -------------------------------------------------------------------------*/
        if( is_singular_property == "yes" ) {

            if( property_detail_top == 'v3' ) {
                var houzezSlidesToShow = '8';
            } else {
                var houzezSlidesToShow = '11';
            }

            var houzez_detail_slider_main_settings = function () {
                return {
                    speed: 500,
                    autoplay: false,
                    autoplaySpeed: 4000,
                    rtl: houzez_rtl,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    //fade: true,
                    asNavFor: '.slideshow-nav'
                }
            }
            var houzez_detail_slider_nav_settings = function () {
                return {
                    speed: 500,
                    autoplay: false,
                    autoplaySpeed: 4000,
                    rtl: houzez_rtl,
                    slidesToShow: houzezSlidesToShow,
                    slidesToScroll: 1,
                    asNavFor: '.slide',
                    arrows: false,
                    dots: false,
                    centerMode: true,
                    focusOnSelect: true

                }
            }

            var property_detail_slideshow = function () {
                $('.slide').slick(houzez_detail_slider_main_settings());
                $('.slideshow-nav').slick(houzez_detail_slider_nav_settings());
            }
            property_detail_slideshow();

        }

        if( is_singular_property == 'yes' && $('#singlePropertyMap').length > 0 ) {

            // tabs Height
            var tabsHeight = function() {
                jQuery(".detail-media .tab-content").css('min-height',jQuery("#gallery").innerHeight());
                jQuery("#singlePropertyMap,#street-map").css('min-height',jQuery(".detail-media .tab-content").innerHeight()).width(jQuery(".detail-media .tab-content").innerWidth());
            }

            jQuery(window).on('load',function(){
                tabsHeight();
            });
            jQuery(window).on('resize',function(){
                //alert(jQuery("#gallery").height());
                tabsHeight();
            }); // End tabs height

            // Map and street view
            if( property_map != 0 ) {
                var map = null;
                var panorama = null;
                var fenway = new google.maps.LatLng(prop_lat, prop_lng);
                var mapOptions = {
                    center: fenway,
                    zoom: 15,
                    scrollwheel: false
                };
                var panoramaOptions = {
                    position: fenway,
                    pov: {
                        heading: 34,
                        pitch: 10
                    }
                };

                var initialize = function () {
                    map = new google.maps.Map(document.getElementById('singlePropertyMap'), mapOptions);
                    panorama = new google.maps.StreetViewPanorama(document.getElementById('street-map'), panoramaOptions);

                    var propsSecurity = $('#securityHouzezMap').val();

                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: ajaxurl,
                        data: {
                            'action': 'houzez_get_single_property',
                            'prop_id': $('#prop_id').val(),
                            'security': propsSecurity
                        },
                        success: function(data) {
                            if( google_map_style !== '' ) {
                                var styles = JSON.parse ( google_map_style );
                                map.setOptions({styles: styles});
                            }

                            if(data.getprops === true) {
                                houzezAddMarkers(data.props, map);
                                houzezSetPOIControls(map, map.getCenter());
                            }
                        },
                        error: function(errorThrown) {

                        }
                    });

                }

                jQuery('a[href="#gallery"]').on('shown.bs.tab', function (e) {
                    //alert('ok');
                    $('.slide').slick('unslick');
                    $('.slideshow-nav').slick('unslick');

                    $('.slide').slick(houzez_detail_slider_main_settings());
                    $('.slideshow-nav').slick(houzez_detail_slider_nav_settings());
                });

                jQuery('a[href="#singlePropertyMap"]').on('shown.bs.tab', function (e) {
                    var center = panorama.getPosition();
                    google.maps.event.trigger(map, "resize");
                    map.setCenter(center);
                });
                jQuery('a[href="#street-map"]').on('shown.bs.tab', function (e) {
                    fenway = panorama.getPosition();
                    panoramaOptions.position = fenway;
                    panorama = new google.maps.StreetViewPanorama(document.getElementById('street-map'), panoramaOptions);
                });

                google.maps.event.addDomListener(window, 'load', initialize);


            }// End map and street

        }


    }// typeof HOUZEZ_ajaxcalls_vars

}); // end document ready
