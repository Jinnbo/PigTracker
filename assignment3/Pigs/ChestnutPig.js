"use strict";
//import { Pig } from "./Pigmodel";
class ChestnutPig extends Pig {
    constructor(name, height, weight, personality, category, breed, language) {
        super(name, height, weight, personality, category, breed);
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.personality = personality;
        this.category = category;
        this.breed = breed;
        this.language = language;
    }
}
