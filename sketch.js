var start,startImage;
var human,animal,tree;
var gameState="start";
var road,roadImage,invisibleGround;
var factory,factory1,factory2,factory3;
var treesGroup,factoriesGroup,fruitsGroup,smokeGroup;
var orangeImage,mangoImage,appleImage,bananaImage;
var gameOver,reset;
var gameOverImage,resetImage;
var smoke,smoke1,smoke2,smoke3;
var bg,backgroundImage,backgroundImage2,backgroundImage3,backgroundImage4,backgroundImage5;
var score;
function preload(){
    
    tree1=loadImage("tree1.png");
    tree2=loadImage("tree2.png");
    tree3=loadImage("tree3.png");
    tree4=loadImage("tree4.png");
    tree5=loadImage("tree5.png");

    startImage=loadImage("start1.jpg");

    roadImage=loadImage("road1.png");

    factory1=loadImage("factory1.png");
    factory2=loadImage("factory2.png");
    factory3=loadImage("factory3.png")

    orangeImage=loadImage("orange.png");
    mangoImage=loadImage("mango.png");
    appleImage=loadImage("apple.png");
    bananaImage=loadImage("banana.png");

    gameOverImage=loadImage("gameover.png");
    resetImage=loadImage("reset.jpg");

    smoke1=loadImage("smoke1.png");
    smoke2=loadImage("smoke2.png");
    smoke3=loadImage("smoke3.png");

    backgroundImage=loadImage("bg1.jpg");
    backgroundImage2=loadImage("bg2.jpg");
    backgroundImage3=loadImage("bg3.jpg");
    backgroundImage4=loadImage("bg4.jpg");
    backgroundImage5=loadImage("bg5.jpg");
}
function setup(){
    canvas = createCanvas(displayWidth - 20, displayHeight-30);

     
    bg=createSprite(650,200,400,200);
   // bg.addImage(backgroundImage)
    bg.scale=1.3
    bg.visible=false
    bg.velocityX=-2
    bg.x=bg.width/2

    road = createSprite(600,650,200,100);
    road.addImage(roadImage);
    road.x=road.width/2
    road.visible=false
  
    start=createSprite(600,200,50,50)
    start.addImage(startImage)
    start.scale=0.2

    human=createSprite(400,580,40,40);
    human.visible=false

    animal=createSprite(200,580,70,30);
    animal.visible=false
   
    invisibleGround = createSprite(200,600,1200,10);
    invisibleGround.visible = false;

    score=0

    treesGroup =createGroup();
    factoriesGroup =createGroup();
    fruitsGroup = createGroup();
    smokeGroup = createGroup();
}
function draw(){
    background(0);
    if(mousePressedOver(start)){
        gameState="play"
    }
    if(gameState=="play"){
        
        spawnTrees();
        spawnFactories();
        spawnFruits();
        spawnSmoke();
 
        if(keyDown("UP_ARROW")){
            human.velocityY = -12;
        }
        human.velocityY = human.velocityY + 0.8

        start.visible=false
        human.visible=true
        animal.visible=true
        road.visible=true
        bg.visible=true
        
        human.collide(invisibleGround);
        if(score<10){
            bg.addImage(backgroundImage)
        }
        if(score>=10){
            bg.addImage(backgroundImage2)
        }
        if(score>=20){
            bg.addImage(backgroundImage3)
        }
        if(score>=30){
            bg.addImage(backgroundImage4)
        }
        if(score>=40){
            bg.addImage(backgroundImage5)
        }
       console.log(frameCount)
       road.velocityX=-2
       if(road.x<0){
        road.x=road.width/2
       }

       if(bg.x<0){
        bg.x=bg.width/2
       }
  
        if(fruitsGroup.isTouching(human)){
            score=score+1
            fruitsGroup.destroyEach();
        }
        if(smokeGroup.isTouching(human)){
            score=score-1
            smokeGroup.destroyEach();
            gameState=="end"
        }
       
    }
     if(gameState=="end"){
         gameOver=createSprite(400,400,40,40);
         gameOver.addImage(gameOverImage);

         reset=createSprite(400,200,20,20);
         reset.addImage(resetImage);

         if(mousePressedOver(reset)){
             gameState="start"
             road.visible=false
             human.visible=false
             animal.visible=false
             start.visible=true
             bg.visible=false
             
         }
     }
    

    
    drawSprites();
    fill(225);
    textSize(30);
    text("Score: "+ score, 500,50);
}

function spawnTrees(){
    if (frameCount % 379 === 0){
    tree=createSprite(800,530,70,30);
    
    tree.velocityX=-2
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: tree.addImage(tree1);
              break;
      case 2: tree.addImage(tree2);
              break;
      case 3: tree.addImage(tree3);
              break;
      case 4: tree.addImage(tree4);
              break;
      case 5: tree.addImage(tree5);
              break;
      default: break;
    }
    tree.scale=0.2
    tree.lifetime =400
    treesGroup.add(tree);
    tree.depth = human.depth;
    human.depth = human.depth + 1;
    }
}

function spawnFactories(){
    if(frameCount % 297 ==0){
    factory=createSprite(800,530,40,40);
    factory.velocityX=-2
   
    var rand =Math.round(random(1,3))
    switch(rand){
        case 1 :factory.addImage(factory1);
        break;
        case 2 :factory.addImage(factory2);
        break;
        case 3 :factory.addImage(factory3);
        break;
        default: break;
    }
    factory.lifetime =400
    factory.scale=0.3
    factoriesGroup.add(factory);
    factory.depth = human.depth;
    human.depth = human.depth + 1;
    }
}

function spawnFruits(){
    if(frameCount % 379 ==0){
    fruit=createSprite(770,500,100,100);
    fruit.velocityX=-2

    var rand=Math.round(random(1,4))
    switch(rand){
        case 1 :fruit.addImage(mangoImage);
        break;
        case 2: fruit.addImage(orangeImage);
        break;
        case 3: fruit.addImage(appleImage);
        break;
        case 4: fruit.addImage(bananaImage);
        break;
        default:break;
    }
    fruit.scale=0.06
    fruit.lifetime =  400
    fruitsGroup.add(fruit);
    fruit.depth = human.depth;
    human.depth = human.depth + 1;
    }
}

function spawnSmoke(){
    if(frameCount % 250 == 0){
        smoke=createSprite(random(100,800),200,30,30);
        var rand =Math.round(random(1,3))
        switch(rand){
            case 1 :smoke.addImage(smoke1);
            break;
            case 2 :smoke.addImage(smoke2);
            break;
            case 3 :smoke.addImage(smoke3);
            break;
            default: break;
        }
        smoke.velocityY=2
        smoke.velocityX=-2
        smoke.scale=0.1
        smoke.lifetime=300
        smokeGroup.add(smoke);
        smoke.depth = human.depth;
        human.depth = human.depth + 1;
       
    }
}
