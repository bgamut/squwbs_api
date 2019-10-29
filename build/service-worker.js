window.addEventListener('push',function(event){
    const payload = event.data? event.data.text() : 'no payload';
    event.waitUntil(
        window.ServiceWorkerRegistration.showNotification('squwbs',{
            body:payload,
        })
    )
})