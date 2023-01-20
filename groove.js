const temperature = 2;
let synthSeq = [];

const model = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/groovae/tap2drum_1bar');
   
function tap2gen(t) {
  let n = [];
  for (i = 0; i < t.length; i++) {
    n.push({
      startTime: t[i]
    })
  }
  generate({
    notes: n
  })
}
async function generate(x) {
  let z = await model.encode([x]);
  let y = await model.decode(z, temperature);
  gen2synth(y[0].notes);
  z.dispose();
}
function gen2synth(g) {
  synthSeq = [];
  for (i = 0; i < g.length; i++) {
    synthSeq.push({
      time: max(0, g[i].startTime),
      note: g[i].pitch,
      velocity: g[i].velocity * 0.01
    })
  }
  synth2sampler(synthSeq);
}
function synth2sampler(s){
  for (i=0; i<s.length; i++){
    let n = reMap(s[i])[0];
    let p = reMap(s[i])[1];
    s[i].note = n
    s[i].position = p;
  }
}
function tap2gen(t) {
  let n = [];
  for (i = 0; i < t.length; i++) {
    n.push({
      startTime: t[i]
    })
  }
  generate({
    notes: n
  })
}

async function generate(x) {
  let z = await model.encode([x]);
  let y = await model.decode(z, temperature);
  gen2synth(y[0].notes);
  z.dispose();
}

function gen2synth(g) {
  synthSeq = [];
  for (i = 0; i < g.length; i++) {
    synthSeq.push({
      time: max(0, g[i].startTime),
      note: g[i].pitch,
      velocity: g[i].velocity * 0.01
    })
  }
  synth2sampler(synthSeq);
}

function synth2sampler(s){
  for (i=0; i<s.length; i++){
    let n = reMap(s[i])[0];
    let p = reMap(s[i])[1];
    s[i].note = n
    s[i].position = p;
  }
}