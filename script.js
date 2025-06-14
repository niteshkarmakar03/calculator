(() => {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.btn');
  let current = '';

  function updateDisplay(val) {
    display.value = val || '0';
  }

  function calculate() {
    try {
      // Basic expression evaluation
      const result = Function(`"use strict";return (${current})`)();
      current = result.toString();
      updateDisplay(current);
    } catch {
      updateDisplay('Error');
      current = '';
    }
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.textContent;

      if (btn.id === 'clear') {
        current = '';
        updateDisplay();
      } else if (btn.id === 'backspace') {
        current = current.slice(0, -1);
        updateDisplay(current);
      } else if (btn.id === 'equals') {
        calculate();
      } else {
        current += val;
        updateDisplay(current);
      }
    });
  });

  document.addEventListener('keydown', e => {
    if (/[\d.+\-*/]/.test(e.key)) {
      current += e.key;
      updateDisplay(current);
    } else if (e.key === 'Backspace') {
      current = current.slice(0, -1);
      updateDisplay(current);
    } else if (e.key === 'Enter') {
      calculate();
    } else if (e.key.toLowerCase() === 'c') {
      current = '';
      updateDisplay();
    }
  });
})();
