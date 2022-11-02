import { Pig } from "./Pigmodel";

interface PigControllerInterface{
    add(pig:Pig): void;
    getAll():Pig[];
}
