// code load strategies : ... install , clear , fetch  ,..
let cacheName="static-cache";
let cachedAssets=[
    './index.html',
    './contact.html',
    './UP/1.jpg',
    './UP/2.jpg',
    './style.css',
    './fallback.json'
];



// install :  event with service worker : write caches 

self.addEventListener('install',async function(){

    console.log('From Install');
    // write cache files :
    // use caches api : open (create) | match () , delete , keys , put :  caches API
    // create cache file use caches.open
    let createdCache=await caches.open(cacheName);
    // 
    await createdCache.addAll(cachedAssets);
    // call skiWaiting from serbice worker object
    await self.skipWaiting();
});//end of install event 

// activate : clear cache
self.addEventListener('activate',async function(){
console.log('From activate');
});//end of activate

// fetch :  fetch : From cache , or from network
self.addEventListener('fetch',async function(event){
    // console.log('From Fetch',event.request);
    // by default from network :
    // respond with caches : 

    // strategy : cache first : online or offline : respond with cache
    // return await event.respondWith(caches.match(event.request));// in case : connected : online : load data from network : else load data from cache

    // check connectivity : online or offline 
    if(!navigator.onLine)
    {
        
                return await event.respondWith(cacheFirst(event.request));// cacheFirst


    }else{
        //return await event.respondWith(fetch(event.request));// network : online : create cache-dynamic (put all requests )
        return await event.respondWith(networkFirst(event.request));

    }
    // incase online : respond from network

    

});


async function cacheFirst(req){
    return await caches.match(req)||await caches.match('')
}
async function networkFirst(req){
    // return await caches.match(req);
    // create dynamic cache : put any request plus response
    let dynamicCache = await caches.open('dynamic-cache');
    // fetch response for current passed req
    let resp=await fetch(req);
    // post req plus resp inside dynamic cache
    await dynamicCache.put(req,resp.clone());
    return resp;





}


