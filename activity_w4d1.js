
// types of freebies and custom prices
const tokens = {
    customer:   { max_free_hours: 2, hourly_fee: 3   },
    staff:      { max_free_hours: 6, hourly_fee: 1   },
    manager:    { max_free_hours: 10,hourly_fee: 0   },
    promo:      { max_free_hours: 0, hourly_fee: 0.2 },
};

// list of approved staff members
const staffRecord = [
    {type: 'staff'  , car_reg: "QW123ER"},
    {type: 'manager', car_reg: "IOP321YU"},
    {type: 'staff'  , car_reg: "ASD456FG"},
    {type: 'staff'  , car_reg: "ZXC789VB"},
];

// parent class
class Car {
    constructor(carReg, arrival){
        this._hourlyFee   = 1.5;
        this._carReg      = carReg;
        this._arrivalTime = arrival;
        this._parkingFee  = 0;
    }
    leavingCarPark(departure) {
        if( typeof departure == 'number' ) {
            let timeParked = departure - this._arrivalTime;
            this._parkingFee = timeParked * this._hourlyFee;
            this.sendMessage(`Thank you. You'll be charged for parking ${timeParked} hours. You need to pay £${this._parkingFee}`);
            return this._parkingFee;
        } else {
            this.sendMessage('leavingCarPark.err: provide departure (number) as a param');
            return 0;
        }
    }
    debitCustomer(){
        this.sendMessage(`Customer has been  debited with £${this._parkingFee}`);
    }
    sendMessage( textMessage ){
        console.log( textMessage );
    }
}

class CarExtra extends Car{
    constructor(carReg, arrival, thisToken = 'customer'){
        super(carReg, arrival);

        this._token      = tokens[thisToken];
        // finds if the car is a staff's and get it;s token
        staffRecord.forEach( ox => { if(ox.car_reg == carReg ) this._token = tokens[ox.type]; } );
        this._hourlyFee  = this._token.hourly_fee;
        this._freeTime   = this._token.max_free_hours;
        // notify entry to car park
        this.sendMessage(`New car to car park: ${carReg} [${this._token.keys()}]`)
    }
    // have to take into account free time as well, then redirect to super
    leavingCarPark(departure){
        if( typeof departure == 'number' ) {
            let timeParked = departure - this._arrivalTime;
            if(timeParked <= this._freeTime)
                super.leavingCarPark( this._arrivalTime );
            else 
                // tax only for time over the free time
                super.leavingCarPark( departure - this._freeTime ); 
        }
    }
    debitCustomer(){
        if(this._parkingFee == 0)
            this.sendMessage("Thank you! You don't need to pay anything for parking.");
        else 
            super.debitCustomer();
    }
}


console.log('~~~ the base class');
const newCar = new Car('GV 123', 5);
const parkingFee = newCar.leavingCarPark(7);
if(parkingFee>0) newCar.debitCustomer();

console.log('\n~~~ the new extended class');

console.log('\n> staff arrives at 8 and leaves at 16');
let carStaff    = new CarExtra('ASD456FG','8');  // staff arrives at 8
carStaff.leavingCarPark(16);                     // leaves at 16 (after 8 hours)

console.log('\n> manager arrives at 8 and leaves at 17');
let carManager  = new CarExtra('IOP321YU',9);    // manager arrives at 9
carManager.leavingCarPark(17);                   // leaves at 17, after 8 hours

console.log('\n> customer arrives at 12 and leaves at 16');
let carCust  = new CarExtra('IOP321YU',12);
carCust.leavingCarPark(16);

console.log('\n> customer with promotion, arrives at 10 and leaves at 18');
let carCustOffer  = new CarExtra('IOP321YU',10,'promo');
carCustOffer.leavingCarPark(18);
