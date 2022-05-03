class Animal{
    constructor(name){
        this._name = name;
        this._thirst = 100;
    }
    get name()   { return this._name; }
    get thirst() { return this._thirst; }
}

class Bunny extends Animal{
    constructor(nameZ, hopBool){
        super(nameZ);
        this._isHopping = hopBool;
    }
    startHopping(){
        this._isHopping = true;
    }
}

console.log( Animal, Bunny );

const animalObj = new Animal("Jordan");
const bunnyObj = new Bunny( "Sylar", true );

console.log( animalObj, bunnyObj );

