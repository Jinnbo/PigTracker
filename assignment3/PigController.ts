
interface PigControllerInterface{
    add(p:Pig): void;
    getAll():Pig[];
    removePig(index:number):void;
    sortPigs(pList: Pig[]): Pig[];
}

class PigController implements PigControllerInterface{
    pig: Pig[];
    flag: boolean;

    constructor(){
        this.pig = [];
        this.flag = false;
    }

    add(p : Pig): void{ 
        
        // If first pig entry
       if (localStorage.length == 0){
            this.flag = true;
            this.pig.push(p);

            localStorage.pigArray = JSON.stringify(this.pig);
            localStorage.numOfPigs = JSON.stringify(Pig.num);
        }
        
        // Pig entry after refreshing window
        else if (!this.flag){
            var temp: Pig[] = this.getAll();
            console.log(temp);
            
            for (var i =0;i<temp.length;i++){
                this.pig.push(temp[i]);
            }
            this.pig.push(p);
            localStorage.pigArray = JSON.stringify(this.pig);
            this.flag = true;

            localStorage.numOfPigs = JSON.stringify( parseInt(localStorage.numOfPigs)+1);
        }
        // Pig entry without refreshing window and not first entry
        else if (this.flag){
            this.flag = true;
            this.pig.push(p);
            localStorage.pigArray = JSON.stringify(this.pig);
    
            localStorage.numOfPigs = JSON.stringify( parseInt(localStorage.numOfPigs)+1);
        }

        localStorage.pigArray = JSON.stringify(this.sortPigs(this.getAll()));
    }

    // Return pigArray
    getAll(): Pig[] {
        return JSON.parse(localStorage.pigArray)
    }

    removePig(index: number): void {

        // Splice pig from the pigArray
        var temp: Pig[] = this.getAll();
        temp.splice(index,1);

        localStorage.pigArray = JSON.stringify(temp);
        localStorage.numOfPigs = JSON.stringify( parseInt(localStorage.numOfPigs)-1);
    }
    
    sortPigs(pList: Pig[]): Pig[] {
        
        var temp: Pig[] = this.getAll();

        // Sort by name
        temp.sort((pig1,pig2) =>{
            if (pig1.name > pig2.name){
                return 1;
            }
            if (pig1.name < pig2.name){
                return -1;
            }
            return 0;
        });

        // Sort by category
        temp.sort((pig1,pig2) =>{
            if (pig1.category > pig2.category){
                return 1;
            }
            if (pig1.category < pig2.category){
                return -1;
            }
            return 0;
        });

        return temp
    }

}