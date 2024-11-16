// If you find this project and comments useful, please give it a star and follow us on GitHub : https://github.com/jovdim/Micro-Projects-Collection 

// Function to convert temperature
function convertTemperature(value, fromUnit, toUnit) {
    let celsius;

    // Convert to Celsius
    if (fromUnit === "celsius") {
        celsius = value;
    } else if (fromUnit === "fahrenheit") {
        celsius = (value - 32) * (5 / 9);
    } else if (fromUnit === "kelvin") {
        celsius = value - 273.15;
    }

    // Convert from Celsius to target unit
    if (toUnit === "celsius") {
        return celsius;
    } else if (toUnit === "fahrenheit") {
        return celsius * (9 / 5) + 32;
    } else if (toUnit === "kelvin") {
        return celsius + 273.15;
    }
}

// Function to convert area
function convertArea(value, fromUnit, toUnit) {
    const conversionFactors = {
        sqMeter: 1,
        sqKilometer: 1e6,
        sqFoot: 0.092903,
        acre: 4046.86,
    };

    const valueInSqMeters = value * conversionFactors[fromUnit];
    return valueInSqMeters / conversionFactors[toUnit];
}

// Function to convert weight
function convertWeight(value, fromUnit, toUnit) {
    const conversionFactors = {
        gram: 1,
        kilogram: 1000,
        pound: 453.592,
        ounce: 28.3495,
    };

    const valueInGrams = value * conversionFactors[fromUnit];
    return valueInGrams / conversionFactors[toUnit];
}

// Function to convert length
function convertLength(value, fromUnit, toUnit) {
    const conversionFactors = {
        meter: 1,
        kilometer: 1000,
        mile: 1609.34,
        yard: 0.9144,
    };

    const valueInMeters = value * conversionFactors[fromUnit];
    return valueInMeters / conversionFactors[toUnit];
}

// Function to convert time
function convertTime(value, fromUnit, toUnit) {
    const conversionFactors = {
        second: 1,
        minute: 60,
        hour: 3600,
        day: 86400,
    };

    const valueInSeconds = value * conversionFactors[fromUnit];
    return valueInSeconds / conversionFactors[toUnit];
}

// Event listeners for conversion buttons
document.getElementById("temperatureConvertBtn").addEventListener("click", function () {
    const inputValue = parseFloat(document.getElementById("temperatureInput").value);
    const fromUnit = document.getElementById("fromTemperatureUnit").value;
    const toUnit = document.getElementById("toTemperatureUnit").value;
    const result = convertTemperature(inputValue, fromUnit, toUnit);
    document.getElementById("temperatureResult").textContent = `Result: ${result.toFixed(2)} ${toUnit}`;
});

document.getElementById("areaConvertBtn").addEventListener("click", function () {
    const inputValue = parseFloat(document.getElementById("areaInput").value);
    const fromUnit = document.getElementById("fromAreaUnit").value;
    const toUnit = document.getElementById("toAreaUnit").value;
    const result = convertArea(inputValue, fromUnit, toUnit);
    document.getElementById("areaResult").textContent = `Result: ${result.toFixed(2)} ${toUnit}`;
});

document.getElementById("weightConvertBtn").addEventListener("click", function () {
    const inputValue = parseFloat(document.getElementById("weightInput").value);
    const fromUnit = document.getElementById("fromWeightUnit").value;
    const toUnit = document.getElementById("toWeightUnit").value;
    const result = convertWeight(inputValue, fromUnit, toUnit);
    document.getElementById("weightResult").textContent = `Result: ${result.toFixed(2)} ${toUnit}`;
});

document.getElementById("lengthConvertBtn").addEventListener("click", function () {
    const inputValue = parseFloat(document.getElementById("lengthInput").value);
    const fromUnit = document.getElementById("fromLengthUnit").value;
    const toUnit = document.getElementById("toLengthUnit").value;
    const result = convertLength(inputValue, fromUnit, toUnit);
    document.getElementById("lengthResult").textContent = `Result: ${result.toFixed(2)} ${toUnit}`;
});

document.getElementById("timeConvertBtn").addEventListener("click", function () {
    const inputValue = parseFloat(document.getElementById("timeInput").value);
    const fromUnit = document.getElementById("fromTimeUnit").value;
    const toUnit = document.getElementById("toTimeUnit").value;
    const result = convertTime(inputValue, fromUnit, toUnit);
    document.getElementById("timeResult").textContent = `Result: ${result.toFixed(2)} ${toUnit}`;
});

// Show/hide conversion forms based on selected category
document.getElementById("conversionCategory").addEventListener("change", function () {
    const selectedCategory = this.value;
    const conversionForms = document.querySelectorAll(".conversion");
    
    conversionForms.forEach(form => {
        form.style.display = "none"; // Hide all forms
    });

    if (selectedCategory) {
        document.getElementById(selectedCategory).style.display = "block"; // Show selected form
    }
});
