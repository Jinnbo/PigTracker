"use strict";
//import { Pig } from "./Pigmodel";
class BlackPig extends Pig {
    constructor(name, height, weight, personality, category, breed, strength) {
        super(name, height, weight, personality, category, breed);
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.personality = personality;
        this.category = category;
        this.breed = breed;
        this.strength = strength;
    }
}
