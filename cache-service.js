self.addEventListener('fetch', function(event) {
	return event.respondWith(
		caches.match(event.request)
		.then(function(cachedResponse) {
			if(cachedResponse && event.request.url.includes('swapi')) {
				return cachedResponse;
			} else {
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
