console.log('service worker loaded')
addEventListener('push',function(event){
    //below code was tested.
    const data= event.data.json()
    console.log("push recieved: ",data)
    navigator.serviceWorker.ready.then(function(registration){
        registration.showNotification(data,title,{
            body:'Notified',
            
        })
    })

})