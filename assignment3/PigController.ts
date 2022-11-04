import { Pig } from "./Pigs/Pigmodel";

interface PigControllerInterface{
    add(p:Pig): void;
    getAll():Pig[];
}

export class PigController implements PigControllerInterface{
    pig: Pig[]

    constructor(){
        this.pig = []
    }

    add(p : Pig): void{
        this.pig.push(p);
        localStorage.pigArray = JSON.stringify(this.pig);
    }

    getAll(): Pig[] {
        return JSON.parse(localStorage.pigArray)
    }
}