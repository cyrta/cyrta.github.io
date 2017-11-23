(function() {

	//GA link tracking

	window.recordOutboundLink = function(link, category, action, options) {
	  try {
	    pageTracker._trackEvent(category, action);
	    if(options && options === "new_tab") {
	      win = window.open(link.href, '_blank');
	      win.focus();
	    } else {
	      setTimeout('document.location = "' + link.href + '"', 100)
	    };
	  }catch(err){}
	}	//overlay-content-container


	var showSpeakingOverlay = function (e) {

		// add the content
		overlayContentContainer.empty().append(speaking_content);

		// show the content
		speaking_content.addClass('visible');

		// show the overlay
		setTimeout(function(){
			toggleOverlay();
		}, 1);
	};


	var overlay = document.querySelector( 'div.overlay' ),
		closeBtn = overlay.querySelector( 'button.overlay-close' ),
		overlayContentContainer = $( '#overlay-content-container'),
		speaking_content = $('#overlay-content-speaking'),

		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {

			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );

			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
		}
	}

	function resetForms() {
		$('#overlay-content-speaking .typeform-widget, #overlay-content-speaking li p:first-child').fadeIn();
		$('.success-speaking, .error-speaking').fadeOut();
	}

	$(window).on('keyup',function(e){
	  var key_code = e.keyCode ? e.keyCode : e.which;
	  var ESCAPE_KEY = 27;

	  if (key_code === ESCAPE_KEY) {
			toggleOverlay();
			resetForms();
	  }
	});

	closeBtn.addEventListener('click', toggleOverlay);
	closeBtn.addEventListener('click', resetForms);

	$('#trigger-overlay-speaking').on('click', showSpeakingOverlay);

	$('.overlay').click(function(ev) {
		ev.preventDefault;

		if ($(ev.target.parentElement).parents('ul').hasClass('speaking-main')) {
			// do nothing
		} else {
			toggleOverlay();
			resetForms();
		}
	})

	$(window).on('message', function(ev) {
	  if(ev.originalEvent.data === "form-submit") {
	    showSpeakingSuccessState();
	  }
	});

	// Typeform submit
	function showSpeakingSuccessState(){
		$('#overlay-content-speaking li p:first-child, .typeform-widget').fadeOut();
		$('.success-speaking').delay(700).fadeIn();
	}
})();
