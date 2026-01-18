function checkGeneration() {
    // Get user input
    let age = document.getElementById("ageInput").value;
    let generation;

    // Control statements
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

    // Display result
    document.getElementById("result").innerHTML =
        "Your age: " + age + "<br>" +
        "Generation: " + generation;
}
