import { Pig } from "./Pigmodel";

export class WhitePig extends Pig{

    constructor(
        public name: string, 
        public height: string, 
        public weight: string, 
        public personality: String,
        public category: string,
        public breed: string,
        public speed: number){
            super(name,height,weight,personality,category,breed);
        }
    
}