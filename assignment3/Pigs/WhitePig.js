"use strict";
class WhitePig extends Pig {
    constructor(name, height, weight, personality, category, breed, speed) {
        super(name, height, weight, personality, category, breed);
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.personality = personality;
        this.category = category;
        this.breed = breed;
        this.speed = speed;
    }
}
