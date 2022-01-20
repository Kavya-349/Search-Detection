var status = ""; 
var search_value = "";
var objects = [];

function setup() {
    canvas = createCanvas(400,320);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modalLoaded);
    document.getElementById("object_status").innerHTML = "Status: Detecting Object";
    search_value = document.getElementById("search_input").value;
}

function modalLoaded() {
    console.log("modal Loaded");
    status = true;
}

function gotResutls(error, results) {
    if(error) {
        console.log(error);   
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video,0,0,400,320);

    if(status != "") {
        objectDetector.detect(video, gotResutls);        
        for(var i = 0; i < objects.length; i++) {

            r = random(255);
            g = random(255);
            b = random(255);

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label, objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(search_value == objects[i].label) {
                video.stop();
                
                document.getElementById("found_status").innerHTML = search_value + "found";

                var synth = window.speechSynthesis;
                
                var speak_data = search_value + "found";

                var utterThis = new SpeechSynthesisUtterance(speak_data);

                synth.speak(utterThis);
                
            }
        }
    }
}
