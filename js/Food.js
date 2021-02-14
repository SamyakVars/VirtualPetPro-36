class Food{
    constructor(){
        this.img = loadImage("Images/Milk.png")
        this.foodStock = 0;
        this.lastFed;
    }

    display(){
        var x = 50
        var y = 10



        if(food != 0){
            for(var i = 0; i < food; i++){
                if(i % 10 == 0){
                    //row += 1
                    x = 50;
                    y = y + 50
                }

                imageMode(CENTER)
                image(this.img, x, y, 50, 50)
                col = createSprite(x, y, 20, 40)
                col.visible = false
                x = x + 30;
                
            }
        }
    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock
    }

    deductFood(){
        if(this.foodStock>0){
         this.foodStock=this.foodStock-1;
        }
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
    }
   
}

