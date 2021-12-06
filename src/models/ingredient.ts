export default class Ingredient{
    id: string;
    name: string;
    type:string;
    proteins:number;
    fat:number;
    carbohydrates:number;
    calories:number;
    price:number;
    image:string;
    imageMobile:string;
    imageLarge:string;
    v:number;
    isLocked: boolean;

    constructor(id:string, 
        name:string, 
        type:string, 
        proteins:number, 
        fat:number, 
        carbohydrates:number, 
        calories:number, 
        price:number, 
        image:string, 
        imageMobile:string, 
        imageLarge:string, 
        v:number,
        isLoocked:boolean = false){
            this.id = id; 
            this.name = name;
            this.type = type;
            this.proteins = proteins;
            this.fat = fat;
            this.carbohydrates = carbohydrates;
            this.calories = calories;
            this.price = price;
            this.image = image;
            this.imageMobile = imageMobile;
            this.imageLarge = imageLarge;
            this.v = v;
            this.isLocked = isLoocked;
        }
}
