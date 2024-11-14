const display = document.getElementById('res');

const addToDisplay = (val) => {
    if (display.value === 'Error') {
        display.value = '';
    }
 mind
    if (val === '*') {
        display.value += '×';
    } else if (val === '/') {
        display.value += '÷';
    } else {
        display.value += val;
    }
};


const clearDisplay = () => {
    display.value = '';
};


const backspace = () => {
    display.value = display.value.slice(0, -1);
};

const calculateResult = () => {
    try {
        
        const expression = display.value.replace(/×/g, '*').replace(/÷/g, '/').replace('%', '/100');
        display.value = eval(expression);
    } catch {
        display.value = 'Error';
    }
};

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '.', '%'].includes(key)) {
        if (key === '*') {
            addToDisplay('×');
        } else if (key === '/') {
            addToDisplay('÷');
        } else {
            addToDisplay(key);
        }
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key.toLowerCase() === 'c') {
        clearDisplay();
    }
});
