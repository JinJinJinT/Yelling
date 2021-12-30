var fs = require("fs")
var Lame = require("node-lame").Lame
var Speaker = require("speaker")

// Create the Speaker instance
const speaker = new Speaker({
   channels: 2, // 2 channels
   bitDepth: 16, // 16-bit samples
   sampleRate: 44100 // 44,100 Hz sample rate
})

// PCM data from stdin gets piped into the speaker
//fs.createReadStream(process.argv[2]).pipe(speaker)

// fs.createReadStream(process.argv[2])
//    .pipe(new lame.Decoder())
//    .on("format", function (format) {
//       this.pipe(new Speaker(format))
//    })
let file = fs.createReadStream(process.argv[2]).path
console.log(`file ${file}`)

const decoder = new Lame({
   output: "buffer",
   mp3Input: true
}).setFile(file)
console.log("decoder made")

decoder
   .decode()
   .then(() => {
      // Decoding finished
      decoder.getBuffer().pipe(speaker)
   })
   .catch(error => {
      console.log("ER:", error)
   })

// fs.createReadStream(process.argv[2])
//    .pipe(new lame.Decoder())
//    .on("format", function (format) {
//       this.pipe(new Speaker(format))
//    })
