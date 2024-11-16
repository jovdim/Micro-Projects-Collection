function calculateBMI() {
    const weightUnit = document.getElementById("weightUnit").value;
    const heightUnit = document.getElementById("heightUnit").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
  
    let weightInKg = weight;
    let heightInM = height;
  
    // Convert weight to kg if pounds are used
    if (weightUnit === "lbs") {
      weightInKg = weight * 0.453592; 
    }
  
    // Convert height to meters if centimeters or inches are used
    if (heightUnit === "cm") {
      heightInM = height / 100; 
    } else if (heightUnit === "in") {
      heightInM = height * 0.0254;
    }
  
    // Check for valid weight and height
    if (
      !isNaN(weightInKg) &&
      weightInKg > 0 &&
      !isNaN(heightInM) &&
      heightInM > 0
    ) {
      const bmi = (weightInKg / (heightInM * heightInM)).toFixed(2);
      document.getElementById("bmiResult").value = bmi;
    } else {
      document.getElementById("bmiResult").value = ""; // Clear result if invalid input
    }
  }
  
  // Event listeners for real-time calculation
  document.getElementById("weight").addEventListener("input", calculateBMI);
  document.getElementById("height").addEventListener("input", calculateBMI);
  document.getElementById("weightUnit").addEventListener("change", calculateBMI);
  document.getElementById("heightUnit").addEventListener("change", calculateBMI);
  
  // Reset button functionality
  document.getElementById("resetBtn").addEventListener("click", function () {
    document.getElementById("weight").value = "";
    document.getElementById("height").value = "";
    document.getElementById("bmiResult").value = "";
  });
  