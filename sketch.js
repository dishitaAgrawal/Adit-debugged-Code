const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

// all variables
var winner;
var allPlayers;
var player;
var database;
var playerCount;
var gameState = 0;
var form;
var bend = 0;
var game;
var background_Img2;
var bckground;
var bckground2;
var bckground3;
var bckground4;
var bckground5;
var bckground6;
var box;
var title;
var titleImg;
var scene2IMG;
var readyUPIMG;
var scene3IMG;
var smithDodges;
var neoDodges;
var screen1 = 1;
var screen2 = 0;
var screen3 = 0;
var screen4 = 0;
var ground;
var song1;
var player1_img, player2_img;
var players = [];
var player1;
var player2;
var health;
var gun;
var sentinel;
var sentinel_IMG;
var neoDodges_img;
var smithDodges_img;
var timer = 0;
var sc;
var telephone_img;
var telephone;
var neoBullet;
var smithBullet;
var neoINFO_IMG;
var smithINFO_IMG;
var smithINFO;
var neoINFO;
var smithBullet_IMG;
var neoBullet_IMG;
var healthTitle1;
var healthTitle2;
var gameOver;
var gameOverIMG;
var bgAnimation;


function preload() {
  //all images
  titleImg = loadImage("Images/Matrix.png");
  scene2IMG = loadImage("Images/Scene2.jpg");
  readyUPIMG = loadImage("Images/ReadyUPImg.png");
  scene3IMG = loadImage("Images/Scene3.jpg");
  player1_img = loadImage("Images/N1.png");
  player2_img = loadImage("Images/S1.png");
  neoDodges_img = loadAnimation("Images/N8.png");
  smithDodges_img = loadAnimation("Images/S7.png");
  sentinel_IMG = loadImage("Images/Sentinel.png");
  song1 = loadSound("INTRO.mp3");
  telephone_img = loadImage("Images/Telephone.png");
  neoINFO_IMG = loadImage("Images/neo info.png");
  smithINFO_IMG = loadImage("Images/smith info.png");
  smithBullet_IMG = loadImage("Images/smithBullet.png");
  neoBullet_IMG = loadImage("Images/neoBullet.png");
  gameOverIMG = loadImage("Images/Game Over.jpg");
  //USING ANIMATION INTEAD OF MATTER.JS TO SET FIRST SCREEN BACKGROUND
  bgAnimation = loadAnimation(
    "Images/1.png",
    "Images/2.png",
    "Images/3.png",
    "Images/4.png",
    "Images/5.png",
    "Images/6.png",
    "Images/7.png",
    "Images/8.png",
    "Images/9.png",
    "Images/10.png",
    "Images/11.png",
    "Images/12.png",
    "Images/13.png",
    "Images/14.png",
    "Images/15.png",
    "Images/16.png"
  );

}
function setup() {
  createCanvas(displayWidth, displayHeight);
  database = firebase.database();

  //class object
  game = new Game();

  //sprites
  bg11=createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
  bg11.addAnimation("beginScreen",bgAnimation);
  bg11.scale=1.5;

  box = createSprite(displayWidth / 2 + 25, displayHeight / 2 - 25, 1200, 300);
  box.shapeColor = "black";

  title = createSprite(displayWidth / 2, displayHeight / 2.2);
  title.addImage(titleImg);

  ground = createSprite(-700, 700);

  game.getState();

  game.start();
  // Ashish input
  // gameState.update(1);
  // song1.setVolume(2);

  // player1 = createSprite(-500, -500, 100, 500);
  // player1.addImage("player1", player1_img);
  // player1.addAnimation("dodge1", neoDodges_img);
  // player1.scale = 1.1;

  // player2 = createSprite(-500, -500, 500, 100);
  // player2.addImage("player2", player2_img);
  // player2.addAnimation("dodge2", smithDodges_img);
  // player2.scale = 0.85;



  // player2.debug = true;
  // neoINFO = createSprite(2300, 500);
  // neoINFO.addImage(neoINFO_IMG);
  // neoINFO.scale = 0.00001;
  // smithINFO = createSprite(250, 500);
  // smithINFO.addImage(smithINFO_IMG);
  // smithINFO.scale = 0.00001;

  // neoDodges = new NeoDodge(1300 - Player.distance, 1050);
  // smithDodges = new SmithDodge(1300 - Player.distance, 1050);
  telephone = createSprite(-10000, 700);
  telephone.addImage(telephone_img);
  telephone.scale = 1;

}

function draw() {

  if (screen1 === 1) {
    // // // // //FIRST SCREEN
    // animation(bgAnimation,displayWidth/2,displayHeight/2); 
    drawSprites();
  }
  if (gameState === 0) {
    //telephone logic
    sc = second();
    // to display scene 2 when playerCount === 2
    if (playerCount === 2) {
      form.displayScene2();
    }
  }
  if (screen2 === 1) {
    // // // // //SECOND SCREEN
    background(readyUPIMG);
    box.destroy();
    title.destroy();
    drawSprites();
  }
  if (gameState === 0) {
    if (screen3 === 1) {
      // // // // //THIRD SCREEN

      background(scene2IMG);
      drawSprites();
      game.play();

      if (sc >= 45 && sc < 50) {
        telephone.x = displayWidth / 2 + 10;
        telephone.y = displayHeight / 2 - 1250;
        telephone.velocityY = 13;
      }
      if (telephone.y > displayHeight) {
        telephone.y = displayHeight / 2 - 1250;
      }
      if (sc === 55) {
        telephone.y = displayHeight / 2 - 1250;
        telephone.velocityY = 0;
      }

      // telephone logic for player1
      if (player1.collide(telephone)) {
        player.updatePlayer1Health(100);
        telephone.y = displayHeight / 2 - 1250;
        telephone.velocityY = 0;
      }
      // Telephone logic for player2
      if (player2.collide(telephone)) {
        player.updatePlayer2Health(100);
        telephone.y = displayHeight / 2 - 1250;
        telephone.velocityY = 0;
      }
    }
  }
  //gameState end
  if (screen4 === 1) {
    game.update(1);
    // // // //  //FOURTH SCREEN
    // background(scene3IMG);
    if (gameState === 1) {
      //for scrolling background and Sentinels (AS OF NOW TEMPORARY)
      ground.velocityX = 5;
      ground.scale = 1.6;
      ground.addImage(scene3IMG);
      if (ground.x > 3250) {
        ground.x = -700;
      }
      gameOver = createSprite(displayWidth / 2, displayHeight / 2);
      gameOver.addImage(gameOverIMG);
      player1.destroy();
      player2.destroy();
      telephone.destroy();
      neoBullet.destroy();
      smithBullet.destroy();

      player.updateCount(0);
      game.update(0);
      drawSprites();
    }
  }
}
