$(function(){
	console.log('loaded index');
	$('a[href^="acasa"]').click(function(event){
		// prevent default
		event.preventDefault();
		// do ajax request
		$.get('acasa', function( data ) {
			console.log(data);
		});
	});
});