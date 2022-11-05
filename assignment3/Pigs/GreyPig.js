"use strict";
//import { Pig } from "./Pigmodel";
class GreyPig extends Pig {
    constructor(name, height, weight, personality, category, breed, swimming) {
        super(name, height, weight, personality, category, breed);
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.personality = personality;
        this.category = category;
        this.breed = breed;
        this.swimming = swimming;
    }
}
