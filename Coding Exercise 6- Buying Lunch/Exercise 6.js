// Who is buying lunch Code Challenge.
function whosPaying(names) {
    let l = Math.floor((names.length) * Math.random());
    let payee = names[l] + " is going to buy lunch today!";
    return payee;
}

let r = whosPaying(["Ali", "Armaghan", "Ayesha", "Ammar"]);
console.log(r);
