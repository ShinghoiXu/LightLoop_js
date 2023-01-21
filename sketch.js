let tapping = false, tapInit, tapBeats = [];
let lightThreshold = 70;
let tracking = false;
const duration = 2;
let playheadX = 0, seqWidth = 640, display = [];
let trackPoints = [];
let video,sampler,heightBaseline;
let flag;
let options = {
     video: {
         facingMode: {
          exact: "environment"
        }
     }
   };


function setup() {
  flag = IsPC();
  if(flag == true){
    createCanvas(640, 480).position(20,100);
    heightBaseline = 400;
  }
  else{
    createCanvas(640, 1200).position(20,100);
    heightBaseline = 1100;
  }
  print(heightBaseline);
  
  frameRate(60);
  background(20);
  strokeWeight(4);
  stroke(0);
  rectMode(CENTER);
  
  if(flag == true){
    video = createCapture(VIDEO);
    video.size(1920,1080);
  }
  else{
    video = createCapture(options);
    video.size(750,1334);
  }
  
  
  video.hide();
  
  let h3 = createElement('h3', 'Loading...');
  h3.style('color', 'white');
  h3.style('font-family', 'courier');
  h3.position(width/3, height/2);
  
  model.initialize().then(txt);
  
  function txt() {
    
    h3.remove();
    
    textAlign(CENTER, CENTER);
    textFont('Courier');
    fill(220);
    textSize(16);
    text('LightLoop is a project\n designed to interpret lights in windows\n into drum beat loops\n\n↓', width/2, 160);
    textSize(14);
    text('  by Chengkai Xu',width/2,heightBaseline+80);
    
    let go = createButton('Start!')
    go.position(314, 400);
    go.mousePressed(() => {
      Tone.start();
      Tone.Transport.start();
      sampler = new Tone.Sampler(sampleMap).connect(reverb);
      go.remove();
      setTimeout(() => {
        tracking = true;
      },10);
    });
  }
}

function draw() {
  
  if (Tone.Transport.state == 'started') {
    background(67,125,222);
    if(flag == true){
      image(video,0,0,640,360);
    }
    else{
      image(video,0,0,640,1130);
    }
    
    fill(255, 100, 0);
    noStroke();
    circle(playheadX + 40, heightBaseline-20, 10);
    trackPointsDis();
    if(frameCount % 200 == 0){
      trackAndPlay();
    }

    if (tapBeats.length) {
      stroke(200);
      for (i = 0; i < tapBeats.length; i++) {
        let x = (tapBeats[i] - tapBeats[0]) / 2 * seqWidth;
        line(x + 40, heightBaseline, x + 40, heightBaseline+20);
      }
      line(seqWidth-40, heightBaseline, seqWidth-40, heightBaseline+20);
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
          display[i].position * 2 + heightBaseline,
          display[i].velocity * v * 20 + 2);
      }
    }
    
    playheadX += deltaTime * 0.001 / duration * seqWidth;
  } 
  
}

function mousePressed(){
  if (Tone.Transport.state == 'started' && tracking){
    trackPoints.push(createVector(mouseX,mouseY));
  }
}

function trackPointsDis(){
  for(let i = 0; i < trackPoints.length ; i++){
    fill(get(trackPoints[i].x,trackPoints[i].y));
    strokeWeight(2);
    if(brightness(get(trackPoints[i].x,trackPoints[i].y))>128){
      stroke(0);
    }
    else{
      stroke(255);
    }
    rect(trackPoints[i].x,trackPoints[i].y,10,16);
  }
}

function trackAndPlay() {
  if (tracking && trackPoints.length >= 2 && Tone.Transport.state == 'started') {
    tapBeats = [0];
    timeCache = 1;
    for(let i = 0 ; i < trackPoints.length ; i++){
      if(brightness(get(trackPoints[i].x,trackPoints[i].y))>lightThreshold || i == trackPoints.length-1){
        thisbeat = timeCache * duration / (trackPoints.length+1) + random(0.08,0.1);
        print(timeCache * duration / (trackPoints.length+1));
        tapBeats.push(thisbeat);
        timeCache = 1;
      }
      else{
        timeCache++;
      }
      
    }
    generate(tap2gen(tapBeats));  
  }
}

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

function switchCamera()
{
  switchFlag = !switchFlag;
  stopCapture();
  if(switchFlag==true)
  {
   video.remove();
   options = {
     video: {
         facingMode: {
          exact: "environment"
        }
     }
   };

  }
  else
  {
   video.remove();
   options = {
     video: {
         facingMode: {
          exact: "user"
        }
     }
   };
  }
  video = createCapture(options);
}
 
