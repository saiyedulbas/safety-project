export class ProductModel{
    id:number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
    rating: Rating;
    
    

    constructor(){
        this.id = 0;
        this.title = '';
        this.price = 0;
        this.description = '';
        this.image = '';
        this.category = '';
        this.rating = new Rating();
        
    }
}
export class Rating{
    rate: number;
    count: number;
    constructor(){
        this.rate = 0;
        this.count = 0;
    }
}