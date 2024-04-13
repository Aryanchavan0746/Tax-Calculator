document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close');
    const closeResultButton = document.querySelector('.close-button');
    const taxResult = document.getElementById('taxResult');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const grossIncome = parseFloat(document.getElementById('grossIncome').value);
      const extraIncome = parseFloat(document.getElementById('extraIncome').value);
      const ageGroup = document.getElementById('ageGroup').value;
      const deductions = parseFloat(document.getElementById('deductions').value);
  
      // Validate inputs
      let isValid = true;
      if (isNaN(grossIncome) || grossIncome <= 0) {
        document.getElementById('grossIncomeError').textContent = 'Invalid input';
        isValid = false;
      } else {
        document.getElementById('grossIncomeError').textContent = '';
      }
      if (isNaN(extraIncome) || extraIncome < 0) {
        document.getElementById('extraIncomeError').textContent = 'Invalid input';
        isValid = false;
      } else {
        document.getElementById('extraIncomeError').textContent = '';
      }
      if (!ageGroup) {
        document.getElementById('ageGroupError').textContent = 'Age group is required';
        isValid = false;
      } else {
        document.getElementById('ageGroupError').textContent = '';
      }
      if (isNaN(deductions) || deductions < 0) {
        document.getElementById('deductionsError').textContent = 'Invalid input';
        isValid = false;
      } else {
        document.getElementById('deductionsError').textContent = '';
      }
  
      // Calculate tax
      if (isValid) {
        let overallIncome = grossIncome + extraIncome - deductions;
        let tax = 0;
        if (overallIncome > 800000) {
          if (ageGroup === '<40') {
            tax = 0.3 * (overallIncome - 800000);
          } else if (ageGroup === '≥40 & <60') {
            tax = 0.4 * (overallIncome - 800000);
          } else if (ageGroup === '≥60') {
            tax = 0.1 * (overallIncome - 800000);
          }
        }
        taxResult.textContent = `      ₹${overallIncome.toFixed(2)} after tax deduction of ₹${tax.toFixed(2)}.`;
        modal.style.display = 'block';
      }
    });
  
    closeButton.addEventListener('click', function() {
      modal.style.display = 'none';
      clearForm();
    });
  
    closeResultButton.addEventListener('click', function() {
      modal.style.display = 'none';
      clearForm();
    });
  
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
        clearForm();
      }
    });
  
    function clearForm() {
      // Clear input fields
      document.getElementById('grossIncome').value = '';
      document.getElementById('extraIncome').value = '';
      document.getElementById('ageGroup').value = '';
      document.getElementById('deductions').value = '';
      // Clear error messages
      document.getElementById('grossIncomeError').textContent = '';
      document.getElementById('extraIncomeError').textContent = '';
      document.getElementById('ageGroupError').textContent = '';
      document.getElementById('deductionsError').textContent = '';
    }
  });
  