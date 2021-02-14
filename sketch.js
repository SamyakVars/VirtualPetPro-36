var dog,sadDog,happyDog;
var addFood, feedPet, database;
var fedTime, lastFed;
var foodObj;
var foodStock, food;
var col
var dogName;
var submit;

var subbed = false

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");

}

function setup() {
  createCanvas(1000,400);

  dogName = createInput("Enter Dog Name")
  dogName.position(420, 180)

  submit = createButton("Enter")
  submit.position(480, 260)
  submit.mousePressed(submitted)
  

  database = firebase.database()
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15

  dog.setCollider("rectangle", 0, 0, 700, 500)

  foodObj = new Food()
  foodObj.getFoodStock()

  foodStock = database.ref('foodStock')
  foodStock.on("value", readStock)

  
  addFood = createButton("Add Food")
  addFood.mousePressed(addMoreFood)
  addFood.position(725, 15)

  feedPet = createButton("Feed Pet")
  feedPet.mousePressed(feedDog)
  feedPet.position(825, 15)

  screenStart = createSprite(500, 200, 1000, 400)

}

function draw() {
  background(46,139,87);
  

  if(dog.x == 800){
    dog.velocityX = 0
    dog.velocityY = 0
  }

  if(col != null && food <= 10){
    if(dog.isTouching(col)){
      dog.velocityX = 25
      dog.velocityY = 5
    }
  }else if(col != null && food > 10 && food <= 20){
    if(dog.isTouching(col)){
      dog.velocityX = 25
      dog.velocityY = 2.5
    }
  }else if(col != null && food > 20 && food <= 30){
    if(dog.isTouching(col)){
      dog.velocityX = 25
      dog.velocityY = -0.2
    }
  }else if(col != null && food > 30 && food <= 40){
    if(dog.isTouching(col)){
      dog.velocityX = 25
      dog.velocityY = -1.4
    }
  } else if(col != null && food > 40 && food <= 50){
    if(dog.isTouching(col)){
      dog.velocityX = 25
      dog.velocityY = -4
    }
  } else if(col != null && food > 50 && food <= 60){
    if(dog.isTouching(col)){
      dog.velocityX = 25
      dog.velocityY = -6
    }
  }

  if(dog.x < 50){
    dog.x = 800
    dog.y = 200
    dog.velocityY = 0
    dog.velocityX = 0
  }
  

  console.log(dog.x)
  console.log(dog.y)

  if(subbed){
    textSize(25)
    fill(255)
    text(dogName.value(), 25, 375)
  }
  

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  textSize(15)
  fill(255)
  if(lastFed >= 12){
    text("Last Fed: " + lastFed % 12 + " PM", 450, 30)
  } else if(lastFed == 0){
    text("Last Fed: 12 AM", 450, 30)
  }else{
    text("Last Fed: " + lastFed + " AM", 450, 30)
  }

  //console.log(lastFed)

  foodObj.display()
  drawSprites();
}

function addMoreFood(){
  food++
  database.ref('/').update({
    foodStock: food
  })
}

function feedDog(){
  dog.addImage(happyDog);


  if(food <= 10){
      dog.velocityX = -25
      dog.velocityY = -5
  }else if(food <= 20 && food > 10){
    dog.velocityX = -25
    dog.velocityY = -2.5
  }else if(food > 20 && food <= 30){
    dog.velocityX = -25
    dog.velocityY = -0.2
  } else if(food > 30 && food <= 40){
    dog.velocityX = -25
    dog.velocityY = 1.4
  } else if(food > 40 && food <= 50){
    dog.velocityX = -25
    dog.velocityY = 4
  }
  
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    foodStock:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function readStock(data){
  food = data.val();
  foodObj.updateFoodStock(food);
}

function submitted(){
  dogName.hide()
  submit.hide()

  subbed = true

  screenStart.y = 1000
}


