function myFunction() {
    var a = document.getElementById("num1").value;
    var b = document.getElementById("num2").value;
    a = Number(a);
    b = Number(b);
    var c = a + b;
    document.getElementById("demo").innerHTML = "The sum of a and b is: " + c;
}