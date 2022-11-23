var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zoombie, zoombieImg, zoombieGroup;
var lifes, lifeCount = 3;
var bullet, bulletImg, bulletGroup, bulletSound;
var score = 0;
var life3,life2,lif1,life1Img,life2Img,life3Img;
var infinito, edges;
var hardcore = -1;
var reset,restImg;

var gameState = 1;


function preload(){
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  zoombieImg = loadImage("assets/zombie.png");

  life3Img = loadAnimation("./assets/heart_3.png","assets/heart_3.png");
  life2Img = loadAnimation("./assets/heart_2.png","assets/heart_2.png");
  life1Img = loadAnimation("./assets/heart_1.png","assets/heart_1.png");

  bulletImg = loadImage("assets/bala.png");

  bulletSound = loadSound("assets/somDeTiro.mp3");

  restImg = loadImage("assets/reset.png");
}

function setup() {  
  createCanvas(windowWidth,windowHeight);
  //adicione a imagem de fundo
  bg = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
bg.addImage(bgImg);
bg.scale = 1.6;

life3 = createSprite(windowWidth-200,windowHeight/100+30,20,20);
life3.addAnimation("3vidas",life3Img);
life3.scale = 0.5;

life2 = createSprite(windowWidth-150,windowHeight/100+30,20,20);
life2.addAnimation("3vidas",life2Img);
life2.scale = 0.5;

life1 = createSprite(windowWidth-100,windowHeight/100+30,20,20);
life1.addAnimation("3vidas",life1Img);
life1.scale = 0.5;

infinito = createSprite(windowWidth/2,windowHeight/2,10000,20);
infinito.visible = false;

reset = createSprite(windowWidth/2,windowHeight/2,200,200);
reset.addImage(restImg);
reset.scale = 0.1;
reset.visible = false;

//crie o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.4;
   player.setCollider("rectangle",0,0,300,300)


  zoombieGroup = createGroup();
  bulletGroup = createGroup();
}

function draw() {
  background("black");
  if(gameState === 1){
  //mova o jogador para cima e para baixo e torne o jogo compatível com dispositivos móveis usando touches (toques)
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-15
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+15
}
if(keyDown("left_arrow")||touches.length>0){
  player.x = player.x-15
}
if(keyDown("right_arrow")||touches.length>0){
 player.x = player.x+15
}

bg.depth = bg.depth - 20;
//libere as balas e mude a imagem do atirador para a posição de tiro quando a tecla espaço for pressionada
if(keyWentDown("space")){
  bulletSound.play();
  bulletSpawn();
  player.addImage(shooter_shooting)
 
}

//o jogador volta à imagem original quando pararmos de pressionar a tecla espaço
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(frameCount%140 === 0){
 zoombiesSpawn();
}
if(zoombieGroup.isTouching(player)){
 lifeCount -= 1;
 zoombieGroup.destroyEach();
 hardcore = hardcore/4;
}
if(zoombieGroup.isTouching(bulletGroup)){
  zoombieGroup.destroyEach();
  score = 100;
  hardcore = hardcore*2;
}

if(lifeCount === 2){
  life3.visible = false;
}

if(lifeCount === 1){
  life3.visible = false;
  life2.visible = false;
}

if(lifeCount === 0){
  life3.visible = false;
  life2.visible = false;
  life1.visible = false;
}

if(lifeCount === 0){
gameState = 0;
}

edges = createEdgeSprites();
player.collide(edges);
player.collide(infinito);
}


if(gameState === 0){
bulletGroup.destroyEach();
zoombieGroup.destroyEach();
reset.visible = true;
if(mousePressedOver(reset)){
  gameState = 1;
  reset.visible = false;
  hardcore = 1;
  lifeCount = 3;
}
}
drawSprites();

console.log(lifeCount)
}
function zoombiesSpawn(){
  zoombie = createSprite(windowWidth+40,random(windowHeight/2,windowHeight-50),100,100);
  zoombie.addImage(zoombieImg);
  zoombie.velocityX = hardcore;
  zoombie.scale = 0.2;
  zoombie.lifeTime = 500;
  zoombieGroup.add(zoombie);
}

function bulletSpawn(){
  bullet = createSprite(player.x+92,player.y-32,50,20);
  bullet.velocityX = 20;
  bullet.addImage(bulletImg);
  bullet.scale = 0.05;
  bullet.rotation = 45;
  bulletGroup.add(bullet);
}