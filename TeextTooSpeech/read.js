const fs = require("fs")
const play = require("./play")
//file shit works
//it still plays 2 files at the same time

// a button that plays one audio
// we press, pause, press

//look at file length
// play 1
// play 2
//

const read = () => {
   fs.readFile("./audiolist.txt", "utf8", (err, data) => {
      if (!err) {
         let files = data.split("\n").filter(cool => cool.length >= 1)
         console.log(files)
         let fileLength = files.length
         console.log("file length:", fileLength)
         for (let i = 0; i < fileLength; i++) {
            //console.log('waiting for 7s timeout')
            //setImmediate(()=>{
            //	console.log('playing:', i)
            //    play(files[i])
            //}, 7000)
            console.log("playing audio")
            play(files[i])
         }
      } else console.log("error reading audiolist :(", "\n", err)
   })
}

module.exports = read
