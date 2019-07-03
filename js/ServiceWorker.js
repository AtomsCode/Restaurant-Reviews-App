"use strict";
// cache name
const staticCacheName = 'restaurant-offline-ver';
const urlsToCache = [
	'/',
  '/index.html',
  '/restaurant.html',
  'css/styles.css',
  'data/restaurants.json',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
	'js/ServiceWorker_register.js',
];

//listener for installing event
self.addEventListener('install', event => {

  // waitUntil, either it complete or fail Results

  event.waitUntil(

    //open a cache by using caches.open
    caches.open(staticCacheName).then(cache => {

			// get from cache by use cache.match(request)
			return cache.addAll(urlsToCache);

	      }).catch(err => {
	          console.log(err);
	      })
  );
});

// listener for fetch event
self.addEventListener('fetch', event => {
  event.respondWith(

    caches.match(event.request, {ignoreSearch: true}).then(response => {

      // data exists in the cache
      if (response) {

        // return the data we found in the cache
        return response;
      }

      // data not exists in the cache
      return fetch(event.request).then(response => {

        // When online cache it
        return caches.open(staticCacheName).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });

        // network error
      }).catch(err => {

        throw err;
      });
    })
  );
});

//  listener when the new serviceWorker activates
self.addEventListener('activate', event => {
  event.waitUntil(

    // get all the cacheNames that availables
    caches.keys().then(cacheNames => {
      return Promise.all(
        //  filter cacheNames by 'restaurant-reviews-'
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('restaurant-offline-') && cacheName != staticCacheName;

        }).map(cacheName => {

          return caches.delete(cacheName);
        })
      );
    })

  );
});
