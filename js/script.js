$( document ).ready(function() {
    var coord_first, coord_second, coord_third, first_circled = false, second_circled = false, third_circled = false;
    $('.first.circle').circleProgress({
        value: 0.001,
        fill: { color: "#F47E22" }
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('strong').html('0');
    });

    $('.second.circle').circleProgress({
        value: 0.001,
        fill: { color: "#0093C7" }
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('strong').html('0');
    });

    $('.third.circle').circleProgress({
        value: 0.001,
        fill: { color: "#27B24C" }
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('strong').html('0');
    });

    var scr_height = screen.height;
    var view_coord = parseInt(scr_height/2);

    $(window).scroll(function() {

        coord_first = $('.circles .first').get(0).getBoundingClientRect().top;
        coord_second = $('.circles .second').get(0).getBoundingClientRect().top;
        coord_third = $('.circles .third').get(0).getBoundingClientRect().top;

        if(coord_first < view_coord && !first_circled){
            first_circled = true;
            $('.first.circle').circleProgress({
                value: 1,
                fill: { color: "#F47E22" }
            }).on('circle-animation-progress', function(event, progress) {
                $(this).find('strong').html(parseInt(40 * progress));
            });
        }

        if(coord_second < view_coord && !second_circled){
            second_circled = true;
            $('.second.circle').circleProgress({
                value: 1,
                fill: { color: "#0093C7" }
            }).on('circle-animation-progress', function(event, progress) {
                $(this).find('strong').html(parseInt(8 * progress));
            });
        }

        if(coord_third < view_coord && !third_circled){
            third_circled = true;
            $('.third.circle').circleProgress({
                value: 1,
                fill: { color: "#27B24C" }
            }).on('circle-animation-progress', function(event, progress) {
                $(this).find('strong').html(parseInt(50 * progress));
            });
        }
    });
    calcLoader.ready(function(){
        ourJquery(".calc").alutechCalc({
            calc: ["shutter", "ads400"],
            margin: 0,
            email: "a.timutsa@gmail.com"
        });
    });
    $('.works').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 567,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 939,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 4
                }
            },
        ]
    });

    $('.works').Chocolat({
        fullScreen: true,
        loop: true
    });

    var client = {

        amount: 1,

        initialize: function () {
            this.setUpListeners();
        },

        setUpListeners: function () {
            $(document).on('click', '.btn', this.checkBtn);
            $(document).on('click', '.pop_up', this.showOverlay);
            $(document).on('click', '#dark_overlay', this.deleteOverlay);
            $(document).on('click', '.close', this.deleteOverlay);
        },

        checkBtn: function(e){
            var action = $(this).data('target');
            switch (action){
                case 'calc':
                    var destination = $('section.seventh').offset().top;
                    $('html,body').animate( { scrollTop: destination }, 1100 );
                    break;
                case 'zamer':

                    break;
            }
            e.preventDefault();
        },

        showFormZamer: function(e){
            client.showOverlay();
            $('.pop_up_form.zamer').show();
            e.preventDefault();
        },

        deleteOverlay: function(){
            $('#dark_overlay').fadeOut('fast','swing',function(){
                $(this).remove();
                client.hideForm();
            });
        },

        hideForm: function() {
            $('.popup').hide();
        },

        showOverlay: function(){
            var docHeight = $(document).height();
            $('<div id=\"dark_overlay\"></div>')
                .appendTo('body')
                .height(docHeight)
                .css({
                    'opacity': 0.6,
                    'position': 'absolute',
                    'top': 0,
                    'left': 0,
                    'background-color': 'black',
                    'width': '100%',
                    'z-index': 1000,
                    'display': 'none'
                })
                .fadeIn(200);
        },

        showForm: function(type){
            var destination = $('#left_tickets').offset().top;
            $('html,body').animate( { scrollTop: destination-130 }, 1100 );
            if(type == 'buy'){
                $('.popup.buy').show();
            } else {
                var val = $('.donate_item').find('input').val();
                $('.popup.donate').show().find('.price').text(val + ' рублей');
            }
        }
    }

    client.initialize();
});