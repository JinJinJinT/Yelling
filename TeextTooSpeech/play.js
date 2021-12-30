const { exec } = require("child_process")

const play = file => {
   setInterval(() => {
      exec(
         `node ./TeextTooSpeech/mp3player.js ${file}`,
         (error, stdout, stderr) => {
            if (error) {
               console.log(`error: ${error.message}`)
               return
            }
            if (stderr) {
               console.log(`stderr: ${stderr}`)
               return
            }
            console.log(`stdout: ${stdout}`)
         }
      )
   }, 8000)
}
module.exports = play
