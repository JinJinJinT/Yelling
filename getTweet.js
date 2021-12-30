let Twit = require('twit')
let config = require('./TeextTooSpeech/config')
let T = new Twit(config)
const getTweets = (userName)=>{
    T.get('statuses/user_timeline', {screen_name: userName}, (err,data)=>{
        if(err) console.log(err)
        else {
            data.forEach(obj=>{
                console.log('text:',obj.text,'id:', obj.id)
            })
            
        }
    })
}

module.exports = getTweets