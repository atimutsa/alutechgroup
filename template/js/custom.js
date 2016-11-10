// Slider on home page
$(document).ready(function (){
			$('#foo4').carouFredSel({
					responsive: true,
					width: '100%',
					scroll: 1,
					prev: '#prev2',
					next: '#next2',
					items: {
					width: '200',
					height: 'auto',	
						visible: {
							min: 4,
							max: 4
						}
					}
				});
});


// certification 

$(document).ready(function(){
			$("a.certif_popup").fancybox({
				'overlayShow'	: false,
				'transitionIn'	: 'elastic',
				'transitionOut'	: 'elastic'
			});
});


//accordion

$.fn.accordion.defaults.container = false; 
$(function() {
  $("#acc1").accordion({
      el: ".h", 
      head: "h3", 
      next: "ul", 
      initShow : "ul.outer:eq(1)"
  });

});


// video block
$(document).ready(function(){
    var i=$('.video_block span').length;
    if(i<=3){
     $(".video_block span").css('display','block');
	 $('.video_block img').hide();
    }
    else if(i>3){
    $(".video_block span").css('display','none');
    }
});

$(document).ready(function () {
  $('.video_block img').click(function(){
    if ($(this).attr('class') != 'active'){
        $(this).hide(1000, function(){
        $('.video_block span').hide();
        $(this).parent().find('span').show(2000);
        });
      $('.video_block img').removeClass('active');
      $('.video_block img').show();
      $(this).hide(1000);
      $(this).addClass('active'); 
    }
  });
});









