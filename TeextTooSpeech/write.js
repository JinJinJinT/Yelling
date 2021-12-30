const fs = require("fs")
const read = require("./read")

const write = (file, activeFile, final) => {
   if (activeFile) {
      fs.appendFile("./audiolist.txt", file + "\n", err => {
         if (err) {
            console.log("audioFile append error")
         } else if (final) {
            console.log("calling read: IN DEV I HATE AUDIO ENCODING")
            //read()
         } else {
            console.log("weird... nothing happend in audio append error...")
         }
      })
   } else {
      fs.writeFile("./audiolist.txt", file + "\n", err => {
         if (err) console.log("error write error")
      })
   }
}

module.exports = write
