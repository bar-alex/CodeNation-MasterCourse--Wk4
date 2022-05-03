const rosie_obj = {
    _name: 'Rosie',
    _hopping: false,
    _thirst: 50,
    get name(){
        return this._name;
    },
    get hopping(){
        return this._hopping;
    },
    get thirst(){
        return this._thirst;
    },
};


class Bunny {
    constructor(name){
        this._name = name;
        this._hops = 0;
    }
    get name(){
        return this._name;
    }
    get hopping(){
        return this._hopping;
    }
    get thirst(){
        return this._thirst;
    }
}

const rosie = new Bunny('Rosie');

console.log( rosie.name );