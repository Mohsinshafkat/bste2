(() => {
  const form = document.getElementById('verification-form');
  const rollInput = document.getElementById('roll');
  const yearInput = document.getElementById('year');
  const status = document.getElementById('form-status');
  if (!form || !Array.isArray(window.STUDENT_RECORDS)) return;

  const numericOnly = input => input.addEventListener('input', () => { input.value = input.value.replace(/\D/g, ''); });
  numericOnly(rollInput); numericOnly(yearInput);

  form.addEventListener('submit', event => {
    event.preventDefault();
    const roll = rollInput.value.trim();
    const year = yearInput.value.trim();
    status.className = 'form-status';
    if (!roll || !year) { status.textContent = 'Please enter both Roll No. and Passing Year.'; return; }
    if (year.length !== 4) { status.textContent = 'Please enter a valid four-digit passing year.'; return; }
    const record = window.STUDENT_RECORDS.find(item => item.roll === roll && item.year === year);
    if (!record) { status.textContent = 'No matching record was found. Please check both details and try again.'; return; }
    status.className = 'form-status success';
    status.textContent = 'Record matched. Opening verification result…';
    window.location.href = `r.html?roll=${encodeURIComponent(roll)}&year=${encodeURIComponent(year)}`;
  });
})();
