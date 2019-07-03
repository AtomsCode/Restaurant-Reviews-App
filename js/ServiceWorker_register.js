if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('js/ServiceWorker.js')
	.then(function() {
		console.log('Registration successful');
	})
	.catch(function() {
		console.log('Registration fail');
	});
}
