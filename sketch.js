let tapping = false, tapInit, tapBeats = [];
const duration = 2;
let playheadX = 0, seqWidth = 400, display = [];

function setup() {
  createCanvas(480, 480).position(20,100);
  background(20);
  strokeWeight(5);
  noStroke();
  
  let h3 = createElement('h3', 'Loading...');
  h3.style('color', 'white');
  h3.style('font-family', 'courier');
  h3.position(200, 235);
  
  model.initialize().then(txt);
  
  function txt() {
    
    h3.remove();
    
    textAlign(CENTER, CENTER);
    textFont('Courier');
    fill(220);
    textSize(16);
    text('Want some beats?\n\nSimple!\n\njust   tap - tap - tap   your\n\n↓', 240, 160);
    fill(255, 100, 0);
    textSize(20);
    text('SPACEBAR', 240, 250);
    
    let go = createButton('Got it!')
    go.position(240, 395);
    go.mousePressed(() => {
      Tone.Transport.start();
      go.remove();
    });
  }
}

function draw() {
  if (Tone.Transport.state == 'started') {
    background(0, 35, 10);
    fill(255, 100, 0);
    circle(playheadX + 40, 400, 10);

    if (tapBeats.length) {
      stroke(255);
      for (i = 0; i < tapBeats.length; i++) {
        let x = (tapBeats[i] - tapBeats[0]) / 2 * seqWidth;
        line(x + 40, 430, x + 40, 450);
      }
      line(440, 430, 440, 450);
      noStroke();
    }

    if (display.length) {
      for (i = 0; i < display.length; i++) {
        let x = display[i].time / duration * seqWidth;
        let v = 1;
        let hot = playheadX - x;
        if (hot >= 0 && hot < 40) {
          fill(255, 255, 0);
          v = 3;
        } else {
          fill(255);
          v = 1;
        }
        circle(x + 40,
          display[i].position * 20 + 50,
          display[i].velocity * v * 25 + 5);
      }
    }
    
    playheadX += deltaTime * 0.001 / duration * seqWidth;
  } 
}

function keyPressed() {
  if (keyCode == 32 && Tone.Transport.state == 'started') {
    if (!tapping) {
      tapping = true;
      tapInit = Tone.Transport.seconds;
      tapBeats = [0];
      setTimeout(() => {
        tapping = false;
        generate(tap2gen(tapBeats));
      }, duration * 1000);
    } else {
      tapBeats.push(Tone.Transport.seconds - tapInit)
    }
  }
}