$(function() {
	// on document ready
	
	$( '.exploreaza' ).on( 'click', function( e ) {
		// prevent default event
		// e.preventDefault();

		// get current city
		var city = $( e.target ).parents( '.item-content' ).find( 'h5' ).text().toLowerCase();

		// log city
		console.log( city );

		
	}); 

});