let i = 0.00;

const ms = () => {
    let s = setInterval(counter, 10)
}

const counter = () => {    
    i += 0.01;
    console.log(i);
    
}
let time = new Date().getTime();
console.log(time);