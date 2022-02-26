img="";
Status="";
objects=[];
function preload(){
    music=loadSound('alarm.mp3');
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function draw(){
    image(video,0,0,380,380);
    if(Status=="person"){
        music.stop();
        objectDetector.detect(video,gotresults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Object Detected";
            document.getElementById("no_of_obj").innerHTML="Baby Found";
            fill('blue');
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke('red');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }else{
        music.play();
    }
}
function modelloaded(){
    console.log("Model Loaded");
    Status=true;
}
function gotresults(error,results){
     if(error){
         console.error(error);
     }else{
         console.log(results);
         objects=results;
     }
}