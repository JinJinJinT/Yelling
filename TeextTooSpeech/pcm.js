var pcm = require('pcm');

var min = 1.0;
var max = -1.0;

pcm.getPcmData('output1321217567545979000.mp3', { stereo: true, sampleRate: 44100 },
  function(sample, channel) {
    // Sample is from [-1.0...1.0], channel is 0 for left and 1 for right
    min = Math.min(min, sample);
    max = Math.max(max, sample);
  },
  function(err, output) {
    if (err)
      console.log(err)
    console.log('min=' + min + ', max=' + max);
    console.log(output)
  }
);