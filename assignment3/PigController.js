System.register([], function (exports_1, context_1) {
    "use strict";
    var PigController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            PigController = class PigController {
                constructor() {
                    this.pig = [];
                }
                add(p) {
                    this.pig.push(p);
                    localStorage.pigArray = JSON.stringify(this.pig);
                }
                getAll() {
                    return JSON.parse(localStorage.pigArray);
                }
            };
            exports_1("PigController", PigController);
        }
    };
});
