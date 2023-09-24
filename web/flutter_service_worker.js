'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "1874ee19a2444dca25f05405427fcb65",
"assets/AssetManifest.json": "304f51de51cab53fed2a0c989c55a0d1",
"assets/assets/font/Cafe24Supermagic/Cafe24Supermagic-Bold-v1.0.otf": "e8e546f0ac28a8d06488aeba40e2d386",
"assets/assets/images/%25EB%2586%2580%25EC%259D%25B4%25EA%25B3%25B5%25EC%259B%2590%2520%25ED%2581%25B4%25EB%25A6%25BD%25EC%2595%2584%25ED%258A%25B8.png": "7379b2bcf3076c10dc4a8d60fddfc2a3",
"assets/assets/images/%25EB%258F%2599%25EB%25AC%25BC%25EC%259B%2590%2520%25ED%2581%25B4%25EB%25A6%25BD%25EC%2595%2584%25ED%258A%25B8.png": "df06e72337564c141dcd0fb894a2f144",
"assets/assets/images/%25EC%258A%25A4%25ED%2582%25A4%25EC%259E%25A5%2520%25ED%2581%25B4%25EB%25A6%25BD%25EC%2595%2584%25ED%258A%25B8.jpg": "dd2b2360239d4865a168367a07fe12d9",
"assets/assets/images/%25EC%259B%258C%25ED%2584%25B0%25ED%258C%258C%25ED%2581%25AC%2520%25ED%2581%25B4%25EB%25A6%25BD%25EC%2595%2584%25ED%258A%25B8.jpg": "82b82335b0e3ca670107df70a2ae95bc",
"assets/assets/images/%25EC%259B%258C%25ED%2584%25B0%25ED%258C%258C%25ED%2581%25AC%2520%25ED%2581%25B4%25EB%25A6%25BD%25EC%2595%2584%25ED%258A%25B82.jpg": "7b226a71051d815b6da3c87d68480c95",
"assets/assets/images/%25EC%259E%2591%25EC%2597%258527.png": "8ba26d181cdbdb0f577510317ec89fb6",
"assets/assets/images/aquarium_background.jpg": "840b440ef225338afbc769db1c40b883",
"assets/assets/images/dingga_logo2.png": "e43ac7cff1f950a0454e298d86f753e7",
"assets/assets/images/ski_background.jpg": "761a3320ea868c3f015f182132e537c2",
"assets/assets/images/themepark_background.jpg": "8f3f36195bc3e29cee63eb3bbd7e0a24",
"assets/assets/images/themepark_background2.jpg": "2aeedbedd0e0518963d157470c70cd59",
"assets/assets/images/zoo_background.jpg": "004b5c6f5532197fe6244cc6ff529c98",
"assets/FontManifest.json": "3455b022e90ffd2c4bbb024ef7d9c068",
"assets/fonts/MaterialIcons-Regular.otf": "8cc18270b056d5eb8d7a145ff376e6d7",
"assets/NOTICES": "f5cbca0e4b4337a44c2eb9a923e96839",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/fluttertoast/assets/toastify.js": "56e2c9cedd97f10e7e5f1cebd85d53e3",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "5caccb235fad20e9b72ea6da5a0094e6",
"canvaskit/canvaskit.wasm": "d9f69e0f428f695dc3d66b3a83a4aa8e",
"canvaskit/chromium/canvaskit.js": "ffb2bb6484d5689d91f393b60664d530",
"canvaskit/chromium/canvaskit.wasm": "393ec8fb05d94036734f8104fa550a67",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "d1fde2560be92c0b07ad9cf9acb10d05",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "845486c8b079ddd99074b5d757e48a03",
"/": "845486c8b079ddd99074b5d757e48a03",
"main.dart.js": "2e841ca8a8d4267b6aa0916aa9a6962f",
"manifest.json": "dde774e580ca832c883607d4316cfeea",
"version.json": "ab1246fe50f2f95ca210450b9c58fafa"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
