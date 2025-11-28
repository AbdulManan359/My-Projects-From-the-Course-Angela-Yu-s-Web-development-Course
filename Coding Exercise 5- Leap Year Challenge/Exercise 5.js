function isLeap(year) {

    /**************Don't change the code above****************/

    //Write your code here.    
    let x = (year / 4) % 2;
    let y = (year / 100) % 2;
    let z = (year / 400) % 2;
    if (x === 0 && y !== 0) {
        return "Leap year."
    } else if (x === 0 && y === 0 && z === 0) {
        return "Leap year."
    } else {
        return "Not leap year."
    }



    /**************Don't change the code below****************/

}


// A year is a leap year if it is evenly divisible by 4.
// Excecpt if that year is also evenly divisible by 100.
// unless that year is also evenly divisible by 400.