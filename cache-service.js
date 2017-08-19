self.addEventListener('fetch', function(event) {
	return event.respondWith(
		caches.match(event.request)
		.then(function(cachedResponse) {
			if(cachedResponse) {
				console.log('using cachedResponse', event.request.url);
				return cachedResponse;
			} else {
				console.log('fetching request for', event.request.url);
				return fetch(event.request)
					.then(function(response) {
						return caches.open('swapi')
							.then(function(cache) {
								cache.put(event.request, response.clone())
								return response;
							})
					})
			}
		})
	)
});
