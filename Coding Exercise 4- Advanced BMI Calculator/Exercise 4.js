// Advanced BMI Calculator
function bmiCalculator(weight, height) {
    let bmi = weight / (height ^ 2);
    if (bmi < 18.5) {
        let interpretation = "Your BMI is " + bmi + ", so you are underweight.";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        let interpretation = "Your BMI is " + bmi + ", so you have a normal weight.";
    } else if (bmi > 24.9) {
        let interpretation = "Your BMI is " + bmi + ", so you are overweight.";
    }
    return interpretation;
}

let v = bmiCalculator(30, 1.6);
console.log(v);
