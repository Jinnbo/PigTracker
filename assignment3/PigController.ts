import { Pig } from "./Pigmodel";
import { GreyPig } from "./GreyPig";
import { ChestnutPig } from "./ChestnutPig";
import { WhitePig } from "./WhitePig";
import { BlackPig } from "./BlackPig";

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