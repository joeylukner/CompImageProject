/*
Names: Sarah Conley & Joey Lukner
Description: A flappy bird game with AR so the bird is controlled
    by moving your face up and down
    video camrea required
*/

// global variables
let facemesh;
let video;
let predictions = [];
let img;
let font;
let bird;
let pipe;
let pipe2;
let numpipes = 1;
let gameState = 0;
let bestEverScore = 0;
let arr = [];
let coord = [];
let newb;
let active = 3;
let totalScore = 0;
arr.push([1600, 0, randomNumGenerator(400)]);
arr.push([2200, 0, randomNumGenerator(400)]);
arr.push([2800, 0, randomNumGenerator(400)]);

//initalize our canvas and AR face tracking
function setup() {
    createCanvas(1800, 1200);
    //image(img, 0, 0)
    video = createCapture(VIDEO);
    video.size(800, 600);

    facemesh = ml5.facemesh(video, modelReady);

    // This sets up an event that fills the global variable "predictions"
    // with an array every time new predictions are made
    facemesh.on("predict", results => {
        predictions = results;
    });

    // Hide the video element, and just show the canvas
    video.hide();
}

// load in our images used for pipes, bird, and background
function preload() {
    img = loadImage('flappybirdbackground.png');
    bird = loadImage('flappybird.png');
    font = loadFont('flappy-font.ttf');
    pipe = loadImage('pipe.png');
    pipe2 = loadImage('pipe2.png');
}

// no longer called but was called to check if facemesh was working/ready
function modelReady() {
    //console.log("Model ready!");
}



// function to create a random number to create the space between the pipes
function randomNumGenerator(margin) {
    let num = Math.floor(Math.random() * (1000 - margin)) + 100
    //console.log(num);
    return num;
}


function draw() {
    //draw our background
    image(img, 0, 0, width, height);

    // We can call both functions to draw all keypoints
    textFont(font);
    textSize(56);
    let margin = 400;
    
    // gamestate 0 is start screen
    if (gameState == 0) {
        fill(254, 152, 0);
        stroke(0, 0, 1)
        strokeWeight(3)
        text("Press space to start", width / 2 - 300, height / 2)

    }
    // gamestate 1 is game
    if (gameState == 1) {
        fill(75, 174, 78)
        stroke(75, 174, 78)


        for (let i = 0; i < arr.length; i++) {
            let x = arr[i][0];
            let y = arr[i][1];
            image(pipe2, x, y, 200, arr[i][2])
            image(pipe, x, arr[i][2]+margin, 200, height - 500)
            // moves pipes within range, else move back to start
            if (x > 0 && x <= 2800) {
                arr[i][0] -= 4
            }
            else {
                arr[i][0] = width
                arr[i][2] = randomNumGenerator(margin)

            }
            // determines next set of pipes and declares them active
            if (arr[i][0] == 952) {
                active = i;
                //console.log("active: " + active);
            }
            //declares no pipe active in between them until it's in range to collide
            if (arr[i][0] == 752) {
                active = 3;
                totalScore++
            }
        }
        //console.log(gameState)
        drawKeypoints();

        fill(255)

        stroke(0);
        strokeWeight(3)
        text("" + totalScore, width / 2, 200);
    }
    // gamestate 2 is game over screen
    else if (gameState == 2) {
        // creates box
        fill(249, 220, 53);
        stroke(0, 0, 1)
        strokeWeight(5)
        rect(width / 3, height / 3, width / 3, height / 3);
        strokeWeight(3)

        // creates text
        fill(254, 152, 0);
        text("Game Over!", width / 2 - 150, 200)
        text("Score", width / 2 - 70, height / 3 + 90)
        text("Best", width / 2 - 54, height / 2 + 40)
        text("Press Space to restart", width / 2 - 340, height - 200)

        fill(255)
        stroke(0)
        
        // prints scores
        if(totalScore <10 ){
            text("" + totalScore, width/2 , height / 2 - 40)
        }
        else{
            text("" + totalScore, width/2 - 16 , height / 2 - 40)
        }
        if(bestEverScore > 9){
            text("" + bestEverScore, width/2 - 15, height/2 + 110)
        }
        else{
            text("" + bestEverScore, width/2, height/2 + 110)
        }
        
        

    }
    // checks collision when there is an active pipe
    if (active != 3) {
        collision(margin);
    }



}
// every time space is pressed the pipes randomly generate and start game
function keyPressed(){
    if (key == ' ') {
        arr = [];
        arr.push([1600, 0, randomNumGenerator(400)]);
        arr.push([2200, 0, randomNumGenerator(400)]);
        arr.push([2800, 0, randomNumGenerator(400)]);
        active = 3;
        gameState = 1;
        totalScore =  0;

    }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
    for (let i = 0; i < predictions.length; i += 1) {
        const keypoints = predictions[i].scaledMesh;

        // Draw facial keypoints.

        for (let j = 2; j < 3; j += 1) {
            const [a, b] = keypoints[j];

            fill(0, 255, 0);
            //console.log("drawing ellipse")
            newa = map(a, 0, 800, 0, 1800)
            newb = map(b, 0, 600, 0, 1200)
            image(bird, 800, newb, 200, 200);
        }
    }
}

// collision detection function for checking if bird hit pipe
function collision(margin) {
    if (newb <= arr[active][2] - 60 || newb >= arr[active][2] + margin - 140) {

        if (totalScore > bestEverScore) {
            bestEverScore = totalScore;
        }
        gameState = 2;
    }
}
