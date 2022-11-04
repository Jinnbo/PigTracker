System.register(["./Pigmodel"], function (exports_1, context_1) {
    "use strict";
    var Pigmodel_1, ChestnutPig;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Pigmodel_1_1) {
                Pigmodel_1 = Pigmodel_1_1;
            }
        ],
        execute: function () {
            ChestnutPig = class ChestnutPig extends Pigmodel_1.Pig {
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
            };
            exports_1("ChestnutPig", ChestnutPig);
        }
    };
});
