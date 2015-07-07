$(function(){
	
	// initialize bootstrap modal
	$('#login-overlay').modal();

	$('a.login').click(function(event){
		// prevent default
		event.preventDefault();

		$('#login-overlay').modal('show');

	});
});