//import { Pig } from "./Pigmodel";

class ChestnutPig extends Pig{

    constructor(
        public name: string, 
        public height: string, 
        public weight: string, 
        public personality: String,
        public category: string,
        public breed: string,
        public language: string){
            super(name,height,weight,personality,category,breed);
        }
    
}