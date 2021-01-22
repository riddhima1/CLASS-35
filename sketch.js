var BALL;
var database,position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    BALL = createSprite(250,250,10,10);
    BALL.shapeColor = "red";

  //  taking the value from the database(ref is for reference);
    var BALLposition= database.ref("ball/position");
    //this on will listen the values that is x and y values from the database;
    BALLposition.on("value",readposition);
}

function draw(){
    background("white");
    //We are declaring the 'position' variable in line 2 but it takes some
    // time for the application to read the values from the database and assign it to this value.
    // Till then the position value is undefined and the ball sprite is displayed at
    // the default value of 250, 250 we used to create it.
    //When we press the arrow key immediately on the start of the application we are trying to write the 
    //'undefined' position values into the database.
    // We can fix this by drawing the ball or writing to the database only when 'position' is NOT EQUAL to undefined.
    if(position!==undefined){

    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
       writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
       writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
       writePosition(0,+1);
    }
    drawSprites();
}
}
function writePosition(x,y){
   //  set is helping us to write the values.(on is to read and set is to write).
    database.ref("ball/position").set({
    'x' : position.x + x,
    'y' : position.y + y
    })
}

function readposition(data){
    position = data.val();
    BALL.x= position.x;
    BALL.y= position.y;

}