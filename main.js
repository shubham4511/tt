peter_pen_song="";
Harry_Potter_Theme_song="";
leftWritsX=0;
leftWritsY=0;
rightWritsX=0;
rightWritsY=0;
scoreLeftWrits=0;
scorerightWrits=0;
song_peter_pen="";
song_Harry_potter_Theme="";

function preload(){
  peter_pen_song=loadSound("music.mp3");
  Harry_Potter_Theme_song=loadSound("music2.mp3");
}

function setup(){
  canvas=createCanvas(600,530);
  canvas.center();
  video=createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded(){
  console.log("PoseNet Is initialized");
}

function draw(){
    image(video,0,0,600,530);
    fill("red");
    stroke("red");
    song_peter_pen=peter_pen_song.isplaying;
    song_Harry_potter_Theme=Harry_Potter_Theme_song.isplaying;

    if(scorerightWrits>0.2){
    circle(rightWritsX,rightWritsY,20);
    Harry_Potter_Theme_song.stop();
    if(song_peter_pen==false){
      peter_pen_song.play();
      document.getElementById("song_id"),innerHTML="Song Name:Peter Pen Song";
    }
     

  }
}
if(scoreLeftWrits>0.2){
  circle(leftWritsX,leftWritsY,20);
  Harry_Potter_Theme_song.stop();
  if(song_Harry_potter_Theme==false){
    Harry_Potter_Theme_song.play();
    document.getElementById("song_id"),innerHTML="Song Name:Harry Potter Theme song";
  }
  
}

function gotPoses(results){
  if(results.length >0){
    console.log(results);

     scoreLeftWrits=results[0].pose.keypoints[9].score;
     console.log("lrftWrits_score="+scoreLeftWrits);

     scorerightWrits=results[0].pose.keypoints[10].score;
     console.log("rightWrits_score="+scorerightWrits);

     leftWrits_x=results[0].pose.leftWrist.x;
     leftWrits_y=results[0].pose.leftWrist.y;
     console.log("leftWrits_x="+leftWrits_x+"leftWrits_y="+leftWrits_y);

     rightWrits_x=results[0].pose.rightWrist.x;
     rightWrits_y=results[0].pose.rightWrist.y;
     console.log("rightWrits_x="+rightWrits_x+"rightWrits_y="+rightWrits_y);
  }
}
