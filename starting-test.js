let var_string = "";
let var_num = 0;
let var_boolean = false;

let list = [1,2,3,4];
list.push(5);

for(let x of list) console.log( x );

let balance = 100;
const withdraw = (amount) => {
    balance -= amount;
    console.log(`withdranw ${amount}. balance left is ${balance}`);
};
withdraw(63);
