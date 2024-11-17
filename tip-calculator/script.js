function updateTip() {
    const bill = parseFloat(document.getElementById('bill').value) || 0;
    const tipPercentage = parseFloat(document.getElementById('tip').value) || 0;
    const people = parseInt(document.getElementById('people').value) || 1;
  
    if (bill < 0 || tipPercentage < 0 || people <= 0) {
      showError('Invalid input! Make sure values are correct.');
      return;
    }
  
    const totalTip = (bill * (tipPercentage / 100)).toFixed(2);
    const totalAmount = (bill + parseFloat(totalTip)).toFixed(2);
    const perPerson = (totalAmount / people).toFixed(2);
  
    document.getElementById('total-tip').textContent = `$${totalTip}`;
    document.getElementById('total-amount').textContent = `$${totalAmount}`;
    document.getElementById('per-person').textContent = `$${perPerson}`;
  }
  
  function resetForm() {
    document.getElementById('bill').value = '';
    document.getElementById('tip').value = '';
    document.getElementById('people').value = '';
    document.getElementById('total-tip').textContent = '$0.00';
    document.getElementById('total-amount').textContent = '$0.00';
    document.getElementById('per-person').textContent = '$0.00';
  }
  
  function showError(message) {
    const error = document.createElement('div');
    error.textContent = message;
    error.className = 'error-message';
    document.body.appendChild(error);
  
    setTimeout(() => error.remove(), 3000);
  }
  