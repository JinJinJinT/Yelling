const player = require('play-sound')(opts = {})

player.play('./audio/output1321218472773181400.mp3', (err)=>{
    if(err) console.log(`can't play ${err}`)
})