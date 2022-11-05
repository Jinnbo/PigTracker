System.register(["./Pigmodel"], function (exports_1, context_1) {
    "use strict";
    var Pigmodel_1, BlackPig;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Pigmodel_1_1) {
                Pigmodel_1 = Pigmodel_1_1;
            }
        ],
        execute: function () {
            BlackPig = class BlackPig extends Pigmodel_1.Pig {
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
            };
            exports_1("BlackPig", BlackPig);
        }
    };
});