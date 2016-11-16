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

        initialize: function () {
            this.setUpListeners();
        },

        setUpListeners: function () {
            $(document).on('click', '.btn', this.checkBtn);
            $(document).on('click', '.pop_up', this.showOverlay);
            $(document).on('click', '#dark_overlay', this.deleteOverlay);
            $(document).on('click', '.close', this.deleteOverlay);
            $(document).on('submit', 'form', this.submitForm);
        },

        checkBtn: function(e){
            var action = $(this).data('target');
            switch (action){
                case 'calc':
                    var destination = $('#seventh').offset().top;
                    $('html,body').animate( { scrollTop: destination }, 1100 );
                    break;
                case 'zamer':
					client.showFormZamer(e);
                    break;
				case 'callback':
					client.showFormCallback(e);
					break;
            }
            e.preventDefault();
        },

        showFormZamer: function(e){
			$('.pop_up_form.zamer').show();
			e.preventDefault();
        },

        showFormCallback: function(e){
			$('.pop_up_form.callback').show();
			e.preventDefault();
        },

        deleteOverlay: function(){
            $('#dark_overlay').fadeOut('fast','swing',function(){
                $(this).remove();
                client.hideForm();
            });
        },

        hideForm: function() {
            $('.pop_up_form').hide();
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
		
		submitForm: function(e){
			var form = $(this),
                formData = form.serialize();

            if ( client.validateForm(form) === false )
                return false;

            console.log('GO AJAX! ==> ' + formData);
			
			$.ajax({
                url: "/mail.php",
                type: "POST",
                data: formData,
                dataType: "html",
                success: function(data){
                    form.html('<p>Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.</p><p>А пока вы можете посетить <a href="http://xn--80aleen8i.xn--p1ai/" target="_blank">наш сайт</a> и узнать много интересного про <a href="http://xn--80aleen8i.xn--p1ai/rolstavni/" target="_blank">рольставни</a> и <a href="http://xn--80aleen8i.xn--p1ai/vorota/garazhnye/" target="_blank">гаражные ворота</a></p>');
                },
                error: function( xhr, status, errorThrown ) {
                    alert( "Sorry, there was a problem!" );
                    console.log( "Error: " + errorThrown );
                    console.log( "Status: " + status );
                    console.dir( xhr );
                }
            });

            e.preventDefault();
		},
		
		validateForm: function(form) {

            var inputs = form.find('input.required'),
                textarea = form.find('textarea'),
                valid = true;

				inputs.each(function(index, el) {

					var input = $(el),
						val = $.trim( input.val() )
					label = input.siblings('label'),
						err = 'Обязательно для заполнения';
					input.removeClass('error').siblings('.tip').text('');
					
					if ( val.length === 0 ) {
						input.addClass('error').siblings('.tip').text(err);
						valid = false;
					}


            });

            return valid;

        }
    }

    client.initialize();
});