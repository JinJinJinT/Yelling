// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech")

// Instantiates a client. Explicitly use service account credentials by
// specifying the private key file. All clients in google-cloud-node have this helper
const projectId = "mythical-bazaar-291106"
const keyFilename =
   "C:/Users/makot/Downloads/mythical-bazaar-291106-e0f57551146f.json"

// Import other required libraries
const fs = require("fs")
const util = require("util")
const client = new textToSpeech.TextToSpeechClient({ projectId, keyFilename })
const write = require("./write")

const loop = tweets => {
   let activeFile = true
   let final = true
   for (let i = 0; i < tweets.length; i++) {
      let obj = tweets[i]
      quickStart(
         obj.text,
         obj.id,
         activeFile,
         final,
         (file, activeFile, final) => {
            write(file, activeFile, final)
         }
      )
      activeFile = true
      if (tweets.length > 0 && i == tweets.length - 2) {
         final = true
      }
   }
   //plays the files in list
   //setTimeout(()=>{
   //read()
   //}, 2000)
   //move to final callback of write
}

async function quickStart(text, id, activeFile, final, write) {
   // The text to synthesize
   console.log(`Currently converting: ${text}`)
   text = text.replace(/@.+?\s/gi, "")
   text = text.replace(/http.+/gi, "")
   //text = 'b ' + text
   console.log("new text is", text)
   // Construct the request
   const request = {
      input: { text: text },
      // Select the language and SSML voice gender (optional)
      voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
      // select the type of audio encoding
      audioConfig: { audioEncoding: "MP3" }
   }

   // Performs the text-to-speech request
   const [response] = await client.synthesizeSpeech(request)
   // Write the binary audio content to a local file
   console.log("making writeFile")
   const writeFile = util.promisify(fs.writeFile)

   let file = `D:/makot/projects/Yelling/audio/output${id}.mp3`
   console.log("writing file")
   await writeFile(file, response.audioContent, "binary")

   console.log(`Audio content written to file: output${id}.mp3`)
   try {
      await write(file, activeFile, final)
   } catch (err) {
      console.log("error in playing")
   }
}

module.exports = loop
