const OAuth = require('oauth').OAuth
const tumblr = require('tumblr')
const appConsumerKey = 'ZcMcl1wmyAyF3xr1TnkjIlgU8G7xJK1wmoGfG1sULTL1wpWE9t'
const appConsumerSecret='3LIzxmGOfmrjIgT1cHDyECMNrHtxZ3TomNOTCY7sKoOQC3cxjq'
const authorizeUrl = 'https://www.tumblr.com/oauth/authorize';
const requestTokenUrl = 'https://www.tumblr.com/oauth/request_token';
const accessTokenUrl = 'https://www.tumblr.com/oauth/access_token';
const oa = new OAuth(
    requestTokenUrl,
    accessTokenUrl,
    appConsumerKey,
    appConsumerSecret,
    '1.0A',
    'https://squwbs.com',
    'HMAC-SHA1'
  );

  oa.getOAuthRequestToken(function (err, token, secret) {
    if (err) {
      console.error('\tFailed with error', err);
    }
    console.log('\ttoken %s | secret %s', token, secret);
    var oauth={
        consumer_key:appConsumerKey,
        consumer_secret:appConsumerSecret,
        token:token,
        token_secret:secret,
    }
    var blog = new tumblr.Blog('gamutperiod.tumblr.com',oauth)
    blog.posts({limit:1,offset:0},function(err,response){
        if(err){
            console.log(err)
        }
        //console.log(response.posts)
        //var response = Object.assign({},res)
        for (var i =0; i<response.posts.length; i++){
            // console.log(response.posts[i])
            // console.log(response.posts[i].post_url)
            // console.log(i+' '+response.posts[i].type)
            // console.log(response.posts[i].short_url)
            // // console.log(response.posts[i].body)
            // console.log('postID:',response.posts[i].id)
            // console.log('postTimeStamp:',response.posts[i].timestamp)
            if(response.posts[i].type=='video'){
                // console.log(response.posts[i].permalink_url)
                // if(response.posts[i].player[0].embed_code!=false){
                //     console.log(response.posts[i].player[0].embed_code)
                // }
                
                if(response.posts[i].video!==undefined){
                    if(response.posts[i].video.youtube!==undefined){
                        console.log(i+' '+response.posts[i].type)
                        console.log(response.posts[i].short_url)
                        // console.log(response.posts[i].body)
                        console.log('postID:',response.posts[i].id)
                        console.log('postTimeStamp:',response.posts[i].timestamp)
                        console.log(response.posts[i].video.youtube.video_id)
                        console.log(response.posts[i].permalink_url)
                        
                    }
                }
                // else{
                //     console.log('skip')
                // }
                
            }
            
            if(response.posts[i].type=='photo'){
                console.log(i+' '+response.posts[i].type)
                console.log(response.posts[i].short_url)
                // console.log(response.posts[i].body)
                console.log('postID:',response.posts[i].id)
                console.log('postTimeStamp:',response.posts[i].timestamp)
                if(response.posts[i].image_permalink==undefined){
                    
                    for(var j = 0; j<response.posts[i].photos.length; j++){
                        console.log(response.posts[i].photos[j].original_size.url)
                        console.log(response.posts[i].photos[j].original_size.width+' X '+response.posts[i].photos[j].original_size.height)
                    }
                }
                else{
                    console.log(response.posts[i].image_permalink)
                }
            }
            if(response.posts[i].type=='quote'){
                console.log(i+' '+response.posts[i].type)
                console.log(response.posts[i].short_url)
                // console.log(response.posts[i].body)
                console.log('postID:',response.posts[i].id)
                console.log('postTimeStamp:',response.posts[i].timestamp)
                console.log(response.posts[i].text)
            }
            if(response.posts[i].type=='audio'){
                //console.log(response.posts[i])
                console.log(i+' '+response.posts[i].type)
                console.log(response.posts[i].short_url)
                // console.log(response.posts[i].body)
                console.log('postID:',response.posts[i].id)
                console.log('postTimeStamp:',response.posts[i].timestamp)
                //console.log(response.posts[i].embed)
                //console.log(response.posts[i].player)
                console.log(response.posts[i].audio_url)
            }

            if(response.posts[i].type=='text'){
                console.log(i+' '+response.posts[i].type)
                console.log(response.posts[i].short_url)
                // console.log(response.posts[i].body)
                console.log('postID:',response.posts[i].id)
                console.log('postTimeStamp:',response.posts[i].timestamp)
                console.log(response.posts[i].body)
            }
            if(response.posts[i].type=='link'){
                console.log(i+' '+response.posts[i].type)
                console.log(response.posts[i].short_url)
                // console.log(response.posts[i].body)
                console.log('postID:',response.posts[i].id)
                console.log('postTimeStamp:',response.posts[i].timestamp)
                console.log(response.posts[i].title)
                console.log(response.posts[i].url)
                if(response.posts[i].link_image!==undefined){
                    console.log(response.posts[i].link_image)
                }
            }
            if(response.posts[i].type=='chat'){
                console.log(i+' '+response.posts[i].type)
                console.log(response.posts[i].short_url)
                // console.log(response.posts[i].body)
                console.log('postID:',response.posts[i].id)
                console.log('postTimeStamp:',response.posts[i].timestamp)
                //console.log(response.posts[i])
                console.log(response.posts[i].title)
                //console.log(response.posts[i].dialogue)
                for (var j = 0; j<response.posts[i].dialogue.length;j++){
                    console.log(response.posts[i].dialogue[j].name+':'+response.posts[i].dialogue[j].phrase)
                }
            }
            //console.log('')
            
        }
    })
  })
