//If you find this useful, please star the repo and follow me on github: https://github.com/jovdim/Micro-Projects-Collection 

document.addEventListener('DOMContentLoaded', () => {
    const lengthSlider = document.getElementById('password-length');
    const lengthDisplay = document.getElementById('length-display');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');
    const passwordOutput = document.getElementById('generated-password');
    const copyButton = document.getElementById('copy-button');
    const generateButton = document.getElementById('generate-button');
    const strengthLabel = document.getElementById('strength-label');
    const strengthBar = document.querySelector('.strength-bar div');

    const characterSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+[]{}|;:,.<>?'
    };

    // Update password length display and regenerate password
    function updateLengthDisplay() {
        lengthDisplay.textContent = lengthSlider.value;
        generatePassword();
    }

    // Generate a password based on selected criteria
    function generatePassword() {
        let availableCharacters = '';
        if (uppercaseCheckbox.checked) availableCharacters += characterSets.uppercase;
        if (lowercaseCheckbox.checked) availableCharacters += characterSets.lowercase;
        if (numbersCheckbox.checked) availableCharacters += characterSets.numbers;
        if (symbolsCheckbox.checked) availableCharacters += characterSets.symbols;

        if (availableCharacters.length === 0) {
            passwordOutput.value = '';
            strengthLabel.innerHTML = 'Strength: N/A';
            strengthBar.style.width = '0%';
            return;
        }

        let password = '';
        for (let i = 0; i < lengthSlider.value; i++) {
            const randomIndex = Math.floor(Math.random() * availableCharacters.length);
            password += availableCharacters[randomIndex];
        }

        passwordOutput.value = password;
        evaluateStrength(password);
    }

    // Evaluate password strength
    function evaluateStrength(password) {
        let strength = 0;

        // Check password length
        if (password.length >= 8 && password.length < 12) {
            strength = 1; // Moderate
        } else if (password.length >= 12 && password.length < 16) {
            strength = 2; // Strong
        } else if (password.length >= 16) {
            strength = 3; // Very Strong
        } else {
            strength = 0; // Weak
        }

        // Check for character types
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[@#$%^&*()_+[\]{};':"\\|,.<>?]/.test(password);

        // Increase strength based on the presence of character types
        let typesCount = 0;
        if (hasUppercase) typesCount++;
        if (hasLowercase) typesCount++;
        if (hasNumber) typesCount++;
        if (hasSymbol) typesCount++;

        // Adjust strength if the password has diverse character types
        if (strength > 0 && typesCount >= 3) {
            strength += 1; // Boost strength
        } else if (strength === 0 && typesCount >= 2) {
            strength = 1; // Moderate if weak but has diverse types
        }

        // Determine strength level and corresponding color
        const strengthLevels = ['Weak', 'Moderate', 'Strong', 'Very Strong'];
        const levelIndex = Math.min(strength, strengthLevels.length - 1); // Ensure we stay within bounds
        strengthLabel.innerHTML = `Strength: <strong>${strengthLevels[levelIndex]}</strong>`;

        // Set bar width and color based on strength
        const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6'];
        strengthBar.style.width = `${((levelIndex + 1) / strengthLevels.length) * 100}%`;
        strengthBar.style.backgroundColor = colors[levelIndex];
    }

    // Copy password to clipboard using modern API(web api)
    async function copyPassword() {
        if (passwordOutput.value) {
            try {
                await navigator.clipboard.writeText(passwordOutput.value);
                copyButton.classList.add('success');
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.classList.remove('success');
                    copyButton.textContent = 'Copy';
                }, 2000); // Reset button text after 2 seconds
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        }
    }

    // Event listenersss
    copyButton.addEventListener('click', copyPassword);
    generateButton.addEventListener('click', generatePassword);
    lengthSlider.addEventListener('input', updateLengthDisplay);
    uppercaseCheckbox.addEventListener('change', generatePassword);
    lowercaseCheckbox.addEventListener('change', generatePassword);
    numbersCheckbox.addEventListener('change', generatePassword);
    symbolsCheckbox.addEventListener('change', generatePassword);

    updateLengthDisplay(); 
});
