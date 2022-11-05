"use strict";
//import { Pig } from "./Pigs/Pigmodel";
class PigController {
    constructor() {
        this.pig = [];
        this.flag = false;
    }
    add(p) {
        // flag = true if refresh
        // flag = false if no refresh
        // 3 scenarios
        // first entry
        if (localStorage.length == 0) {
            this.flag = true;
            this.pig.push(p);
            localStorage.pigArray = JSON.stringify(this.pig);
            localStorage.numOfPigs = JSON.stringify(Pig.num);
        }
        // entry after refresh
        else if (!this.flag) {
            var temp = this.getAll();
            console.log(temp);
            for (var i = 0; i < temp.length; i++) {
                this.pig.push(temp[i]);
            }
            this.pig.push(p);
            localStorage.pigArray = JSON.stringify(this.pig);
            this.flag = true;
            localStorage.numOfPigs = JSON.stringify(parseInt(localStorage.numOfPigs) + 1);
        }
        else if (this.flag) {
            this.flag = true;
            this.pig.push(p);
            localStorage.pigArray = JSON.stringify(this.pig);
            console.log(parseInt(localStorage.numOfPigs));
            localStorage.numOfPigs = JSON.stringify(parseInt(localStorage.numOfPigs) + 1);
        }
        console.log(this.flag);
    }
    getAll() {
        return JSON.parse(localStorage.pigArray);
    }
    removePig(index) {
        console.log(index);
        var temp = this.getAll();
        temp.splice(index, 1);
        localStorage.pigArray = JSON.stringify(temp);
        localStorage.numOfPigs = JSON.stringify(parseInt(localStorage.numOfPigs) - 1);
    }
}
