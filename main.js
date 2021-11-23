objects=[];
noline="";
img="";
function preload(){
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.position(600,200);
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!");
    noline=true;
    objectDetector.detect(video,gotResults);
}
function draw() { 
    image(video, 0, 0, 380, 380); 
    if(noline != "") { 
        r = random(255); 
        g = random(255); 
        b = random(255); 
        objectDetector.detect(video, gotResults); 
        for (i = 0; i < objects.length; i++) { 
            document.getElementById("status").innerHTML = "Status : Object Detected"; 
            document.getElementById("objects").innerHTML = "Number of objects detected are : "+ objects.length; 
            textSize(15);
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100); 
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill(); 
            strokeWeight(5);
            stroke(r,g,b); 
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
        } 
    } 
}
function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}