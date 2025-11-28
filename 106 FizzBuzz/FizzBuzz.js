// Fizz Buzz Game
let output = [];
let n = 1;
function FizzBuzz() {
    if (n % 5 === 0 && n % 3 === 0) {
        output.push("FizzBuzz");
    } else if (n % 5 === 0) {
        output.push("Buzz");
    } else if (n % 3 === 0) {
        output.push("Fizz");
    } else {
        output.push(n);
    }

    console.log(output);
    n++;
}

FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz();
FizzBuzz(); FizzBuzz(); FizzBuzz();