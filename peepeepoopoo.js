console.log("The bot is starting")

let Twit = require("twit")
let config = require("./TeextTooSpeech/config")
const voice = require("./TeextTooSpeech/text2speech")
const fs = require("fs")

let T = new Twit(config)

const cumID = 1321254547264733200

const checkTweet = (id, callback) => {
   T.get("statuses/mentions_timeline", { count: 5 }, (err, data) => {
      if (err) console.log("Can't find tweets responding to auth user", err)
      else {
         let tweets = data.filter(obj => {
            return obj.id > id && obj.in_reply_to_status_id == cumID
         })

         //go through all tweets, find highest id
         tweets.forEach(obj => {
            id = obj.id > id ? obj.id : id
         })
         //writes to file
         callback(id, () => {
            //maybe file implementation here
            voice(tweets)
         })
      }
   })
}

const storeNew = (newText, callback) => {
   fs.readFile("./mostrecent.txt", "utf8", (err, data) => {
      if (err) console.log("fucking err")
      //if the current read file is less than new id
      else if (data < newText) {
         fs.writeFile(
            "./mostrecent.txt",
            parseInt(newText, 10).toString(),
            err => {
               if (err) console.log("error writing newSeenTweet")
               else {
                  console.log("saved new seen tweet!", newText)
                  callback()
               }
            }
         )
      }
   })
}

setInterval(() => {
   fs.readFile("./mostrecent.txt", "utf8", (err, data) => {
      if (!err) {
         //console.log('checking tweets with id greater than', data)
         checkTweet(data, storeNew)
      } else console.log("error reading file :(", "\n", err)
   })
}, 30000)
