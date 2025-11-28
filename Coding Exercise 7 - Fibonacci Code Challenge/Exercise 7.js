// Fibonacci Code Challenge
function fibonacciGenerator(n) {
    //Do NOT change any of the code above 👆

    //Write your code here:
    // Fibunacci Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ...
    let array = [];
    let l = 0;
    let u = 1;
    for (let i = 0; i < n; i++) {
        if (i < 2) {
            array.push(l);
            l = l + u;
        } else {
            array.push((array[i - 1] + array[i - 2]));
        }
    }
    return array;

    //Return an array of fibonacci numbers starting from 0.

    //Do NOT change any of the code below 👇
}

let d = fibonacciGenerator(12);
console.log(d);
