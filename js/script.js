// Webp converter
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	}
	else{
		document.querySelector('body').classList.add('no-webp');
	}
});
// /Webp converter

// Burger menu
$(document).ready(function() {
	$('.icon-menu').click(function(event) {
		$('.icon-menu,.menu__body').toggleClass('_active');
		$('body').toggleClass('_lock');
	});
});
// /Burger menu

// Responsive
$(window).resize(function(event) {
	adaptive_function();
});

function adaptive_header (w, h) {
	var menuBody = $('.menu__body');
	var headerRight = $('.header__right');
	if(w<912) {
		if(!headerRight.hasClass('done')){
			headerRight.addClass('done').appendTo(menuBody);
		}
	}
	else {
		if(headerRight.hasClass('done')){
			headerRight.removeClass('done').appendTo($('.header__menu'));
		}
	}
	
}

function adaptive_function () {
	var w=$(window).outerWidth();
	var h=$(window).outerHeight();
	adaptive_header(w, h);
}

adaptive_function();
// /Responsive

// Scroll to section
$(function() {
	$("[data-scroll]").on("click", function(event) {
		event.preventDefault();

		var $this = $(this),
			blockId = $this.data('scroll'),
			blockOffset;

		if(blockId == "#header"){
			blockOffset = 0;
		}
		else {
			blockOffset = $(blockId).offset().top;
		}

		$(".header__menu a").removeClass("_active");
		$this.addClass("_active");

		if($("#nav").hasClass("_active")) {
			$("#nav_toggle").toggleClass("_active");
			$("#nav").toggleClass("_active");
		}
		$('body').removeClass("_lock");

		$("html, body").animate({
			scrollTop: blockOffset
		}, 500);
	});
});
// /Scroll to section.

// Collapse 
$("[data-collapse]").on("click", function(event) {
	event.preventDefault();

	var $this = $(this),
		blockId = $this.data('collapse');

	$this.toggleClass("_active");
});
// /Collapse

// Slider
$(document).ready(function(){
	$('.blog__content').slick({
		dots: true,
		adaptiveHeight: true,
		speed: 700,
		easing: 'ease',
	});
	$('.quotes__content').slick({
		arrows: false,
		dots: true,
		adaptiveHeight: true,
		variableWidth: true,
		slidesToShow: 1.5,
		infinite: false,
		speed: 700,
		easing: 'ease',
	});


});
// /Slider

// ==========================================================================
// Scroll active links.
// Cache selectors
var topMenu = $(".menu"),
    topMenuHeight = topMenu.innerHeight(),
    // All list items
    menuItems = $('.menu__body a'),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).data("scroll"));
      if (item.length) { return item; }
    });


// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop() + topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   // Set/remove active class
   menuItems
   .removeClass("_active")
     .filter(function(){
	        return $(this).attr('data-scroll') == "#"+id;
	    }).addClass("_active");
});
// /Scroll active links