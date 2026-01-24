function checkGeneration() {
    let age = document.getElementById("ageInput").value; //variable
    let generation; //variable

    if (age >= 13 && age <= 28) {
        generation = "Gen Z";
    } else if (age >= 29 && age <= 44) {
        generation = "Millennial";
    } else if (age >= 45 && age <= 60) {
        generation = "Gen X";
    } else if (age >= 61) {
        generation = "Boomer";
    } else if (age > 0) {
        generation = "Child";
    } else {
        generation = "Please enter a valid age";
    }

    document.getElementById("result").innerHTML =
        "Your age: " + age + "<br>" +
        "Generation: " + generation;
}
