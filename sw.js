const version = "v1";

const assets = [
	"index.html",
	"index.js",
	"index.css",
	"beep.wav"
];

self.addEventListener("install", async () => {
	const cache = await caches.open(version);
	await cache.addAll(assets);
});

self.addEventListener("activate", async () => {
	const cacheNames = await caches.keys();
	await Promise.all(
		cacheNames
			.filter((name) => name !== version)
			.map((name) => caches.delete(name))
	);
});


self.addEventListener("fetch", async (event) => {
	const {request} = event;
	const cache = await caches.open(version)
	try {
		const fetched = await fetch(request);
		await cache.put(request, fetched.clone())
		event.respondWith(fetched);
	} catch (e) {
		const cached = await caches.match(request);
		event.respondWith(cached);
	}
});
