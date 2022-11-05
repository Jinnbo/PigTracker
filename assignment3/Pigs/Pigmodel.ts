
abstract class Pig {
    public static num = 0;

    constructor(public name: string, public height: string, public weight: string, public personality: String,public category: string, public breed:string){
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.personality = personality;
        this. category = category;
        this.breed = breed;
        Pig.num++;
    }
}