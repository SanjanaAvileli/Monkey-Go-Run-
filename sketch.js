var bananaImage,obstacleImage,player_running;
var jungle;
var foodGroup;
var obstacleGroup;
var score = 0;
var back,back_Image;
var Moneky;
var ground;
var gameOver,gameOver_Image;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
    
  
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png", "Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png", "Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  back_Image = loadImage("jungle.jpg");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
  gameOver_Image = loadImage("gameOver.png");
  
 foodGroup = new Group();
obstacleGroup = new Group();
  
  }


function setup() {
  createCanvas(500,400);
  
  back = createSprite(50,180,20,50);
  back.addImage("Image",back_Image);
  back.velocityX = -2;
  
  ground = createSprite(200,390,500,20);
  ground.visible = false;
  
  
  Monkey = createSprite(40,350,20,20);
  Monkey.addAnimation("running",player_running);
  Monkey.scale = 0.18;
  
  gameOver = createSprite(200,250);
  gameOver.addImage("Image",gameOver_Image);
  

  
  
  
  
}

function draw() {
  background(220);
  
  if(back.x < 0){
   back.x = back.width/2;
   }
  
  if(gameState === PLAY){
    
     gameOver.visible = false;
     
  if(keyDown("space")){
      Monkey.velocityY = -12 ;
    
    }
     
  if(obstacleGroup.isTouching(Monkey)){
Monkey.scale = Monkey.scale- 0.10;
  }
  
  
  
  Monkey.velocityY = Monkey.velocityY + 0.8;
  
  Monkey.collide(ground);
  
  if(foodGroup.isTouching(Monkey)){
    score = score+2;
    foodGroup.destroyEach(food);
    }
     
     switch(score){
  case 10: Moneky.scale = 0.12;
    break;
  case 20: Monkey.scale = 0.14;
    break;
  case 30: Monkey.scale = 0.16;
    break;
  case 40: Monkey.scale = 0.18;
    break;
    default: break;   
    
    
  
   }
     
 }
  
  if(obstacleGroup.isTouching(Monkey)){
  gameState = END;
    
    gameOver.visible = true;
        
    }
  
  
  else if(gameState === END){

    
    //set velcity of each game object to 0
    back.velocityX = 0;
    Monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
        
    if(keyDown("r")){
      restart();
    }
    
    score = 0;
  
  }  

  
  food();
  obstacles();
  drawSprites();
   
  stroke("white");
  textSize(20);
  fill("white");
 text("score: " + score,400,50 );
  
   
   
}

 function restart(){
  
  gameOver.visible = false;
   
   gameState = PLAY;
   
    obstacleGroup.destroyEach();
  foodGroup.destroyEach();
   
   Monkey.destroy(Monkey);
   
   Monkey = createSprite(40,350,20,20);
  Monkey.addAnimation("running",player_running);
  Monkey.scale = 0.18;
   
   back.velocityX = -2;
   
   
  if(back.x < 0){
   back.x = back.width/2;
   }
 }

function food(){
  if(frameCount % 80===0){
  var banana = createSprite(220,200);
  banana.addAnimation("banana",bananaImage);
  banana.scale = 0.05;
  Number(120,200);
  banana.velocityX = -2;
  banana.lifetime= -1;
  foodGroup.add(banana);
  
 
  } 
}

function obstacles(){
  if(frameCount %300===0){
    var stone = createSprite(180,360);
    stone.addAnimation("Stone",obstacleImage);
    stone.scale = 0.15;
    stone.velocityX = -2;
    stone.lifetime = -1;
    obstacleGroup.add(stone);
  }
}
