
function add() {
    let a = document.getElementById("num1").value;
    let b = document.getElementById("num2").value;
    let c = Number(a) + Number(b);
    console.log(c);
    document.getElementById("demo0").innerHTML = "The sum of a and b is: " + c;
}
function sub() {
    let a = document.getElementById("num1").value;
    let b = document.getElementById("num2").value;
    let c = Number(a) - Number(b);
    console.log(c);
    document.getElementById("demo1").innerHTML = "The difference of a and b is: " + c;
}
function mul() {
    let a = document.getElementById("num1").value;
    let b = document.getElementById("num2").value;
    let c = Number(a) * Number(b);
    console.log(c);
    document.getElementById("demo2").innerHTML = "The multiplication of a and b is: " + c;
}
function div() {
    let a = document.getElementById("num1").value;
    let b = document.getElementById("num2").value;
    let c = Number(a) / Number(b);
    console.log(c);
    document.getElementById("demo3").innerHTML = "The division of a and b is: " + c;
}