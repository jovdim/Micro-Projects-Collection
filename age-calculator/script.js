//If you find this useful, please star the repo and follow me on github: https://github.com/jovdim/Micro-Projects-Collection

const dobInput = document.getElementById("dob");
const calculateButton = document.getElementById("calculate-button");
const ageOutput = document.getElementById("age-output");
const nextBirthdayOutput = document.getElementById("next-birthday");
const zodiacSignOutput = document.getElementById("zodiac-sign");
const funFactOutput = document.getElementById("fun-fact");

// Calculate age function
function calculateAge() {
  const dob = new Date(dobInput.value);
  if (isNaN(dob)) {
    ageOutput.textContent = "Please enter a valid date of birth.";
    return;
  }

  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const monthDifference = now.getMonth() - dob.getMonth();
  const dayDifference = now.getDate() - dob.getDate();

  // Adjust age if birthday hasn't occurred yet this year
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  // Calculate next birthday
  const nextBirthday = new Date(
    now.getFullYear(),
    dob.getMonth(),
    dob.getDate()
  );
  if (nextBirthday < now) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }

  const daysUntilNextBirthday = Math.ceil(
    (nextBirthday - now) / (1000 * 60 * 60 * 24)
  );
  const monthsUntilNextBirthday = Math.ceil(daysUntilNextBirthday / 30);

  // Calculate zodiac sign
  const zodiacSigns = [
    { name: "Aries", start: new Date(0, 2, 21), end: new Date(0, 3, 19) }, // March 21 - April 19
    { name: "Taurus", start: new Date(0, 3, 20), end: new Date(0, 4, 20) }, // April 20 - May 20
    { name: "Gemini", start: new Date(0, 4, 21), end: new Date(0, 5, 20) }, // May 21 - June 20
    { name: "Cancer", start: new Date(0, 5, 21), end: new Date(0, 6, 22) }, // June 21 - July 22
    { name: "Leo", start: new Date(0, 6, 23), end: new Date(0, 7, 22) }, // July 23 - August 22
    { name: "Virgo", start: new Date(0, 7, 23), end: new Date(0, 8, 22) }, // August 23 - September 22
    { name: "Libra", start: new Date(0, 8, 23), end: new Date(0, 9, 22) }, // September 23 - October 22
    { name: "Scorpio", start: new Date(0, 9, 23), end: new Date(0, 10, 21) }, // October 23 - November 21
    {
      name: "Sagittarius",
      start: new Date(0, 10, 22),
      end: new Date(0, 11, 21),
    }, // November 22 - December 21
    { name: "Capricorn", start: new Date(0, 11, 22), end: new Date(0, 0, 19) }, // December 22 - January 19
    { name: "Aquarius", start: new Date(0, 0, 20), end: new Date(0, 1, 18) }, // January 20 - February 18
    { name: "Pisces", start: new Date(0, 1, 19), end: new Date(0, 2, 20) }, // February 19 - March 20
  ];

  let zodiacSign = "Unknown";
  const dobMonth = dob.getMonth();
  const dobDay = dob.getDate();

  for (const sign of zodiacSigns) {
    const startDate = new Date(0, sign.start.getMonth(), sign.start.getDate());
    const endDate = new Date(0, sign.end.getMonth(), sign.end.getDate());

    // Adjust for Capricorn's year boundary
    if (sign.name === "Capricorn") {
      if (
        (dobMonth === 11 && dobDay >= 22) ||
        (dobMonth === 0 && dobDay <= 19)
      ) {
        zodiacSign = sign.name;
        break;
      }
    } else if (
      (dobMonth === startDate.getMonth() && dobDay >= startDate.getDate()) ||
      (dobMonth === endDate.getMonth() && dobDay <= endDate.getDate())
    ) {
      zodiacSign = sign.name;
      break;
    }
  }

  // Fun fact based on age
  const funFacts = [
    "You are at the prime of your life!",
    "Age is just a number, but wisdom is priceless.",
    "Cherish every moment, for time waits for no one.",
  ];
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

  // Display results
  ageOutput.textContent = `You are ${age} years, ${Math.abs(
    monthDifference
  )} months, and ${Math.abs(dayDifference)} days old.`;
  nextBirthdayOutput.textContent = `Your next birthday is in ${daysUntilNextBirthday} days, which is approximately ${monthsUntilNextBirthday} months away.`;
  zodiacSignOutput.textContent = `Your zodiac sign is ${zodiacSign}.`;
  funFactOutput.textContent = `Fun Fact: ${randomFact}`;
}

calculateButton.addEventListener("click", calculateAge);
