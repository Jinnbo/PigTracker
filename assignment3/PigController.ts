//import { Pig } from "./Pigs/Pigmodel";

interface PigControllerInterface{
    add(p:Pig): void;
    getAll():Pig[];
    removePig(index:number):void;
}

class PigController implements PigControllerInterface{
    pig: Pig[];
    flag: boolean;

    constructor(){
        this.pig = [];
        this.flag = false;
    }

    add(p : Pig): void{ 

        // flag = true if refresh
        // flag = false if no refresh

        // 3 scenarios
        
        // first entry
       if (localStorage.length == 0){
            this.flag = true;
            this.pig.push(p);
            localStorage.pigArray = JSON.stringify(this.pig);
        }

        // entry after refresh
        else if (!this.flag){
            var temp: Pig[] = this.getAll();
            console.log(temp);
            
            for (var i =0;i<temp.length;i++){
                this.pig.push(temp[i]);
            }
            this.pig.push(p);
            localStorage.pigArray = JSON.stringify(this.pig);
            this.flag = true;
        }
        else if (this.flag){
            this.flag = true;
            this.pig.push(p);
            localStorage.pigArray = JSON.stringify(this.pig);
        }
        console.log(this.flag)
    }

    getAll(): Pig[] {
        return JSON.parse(localStorage.pigArray)
    }

    removePig(index: number): void {
        this.pig.splice(index,1);
        localStorage.pigArray = JSON.stringify(this.pig);
        Pig.num--;
        if (Pig.num == 0){
            localStorage.clear();
        }
    }

}