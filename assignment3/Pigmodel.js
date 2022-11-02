System.register([], function (exports_1, context_1) {
    "use strict";
    var Pig;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Pig = class Pig {
                constructor(name, height, weight, personality, category) {
                    this.name = name;
                    this.height = height;
                    this.weight = weight;
                    this.personality = personality;
                    this.category = category;
                }
            };
            exports_1("Pig", Pig);
        }
    };
});
