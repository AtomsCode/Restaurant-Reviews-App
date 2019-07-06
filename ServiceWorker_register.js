if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/ServiceWorker.js')
	.then(function() {
		console.log('Registration successful');
	})
	.catch(function() {
		console.log('Registration fail');
	});
}
