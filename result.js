(() => {
  const target = document.getElementById('result-container');
  if (!target || !Array.isArray(window.STUDENT_RECORDS)) return;
  const params = new URLSearchParams(window.location.search);
  const roll = params.get('roll') || '';
  const year = params.get('year') || '';
  const record = window.STUDENT_RECORDS.find(item => item.roll === roll && item.year === year);
  const escapeHTML = value => String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[char]));
  if (!record) {
    target.innerHTML = `<article class="missing-result"><div class="missing-icon">!</div><h2>Record not available</h2><p>We could not verify this result. Please return to the verification page and enter the issued roll number and passing year.</p><a class="button button-primary" href="v.html">New search <span>→</span></a></article>`;
    return;
  }
  const percentage = Number.parseFloat(record.per) || 0;
  const session = record.course.startsWith('DAE') ? `${Number(record.year) - 3}–${record.year}` : `Year ending ${record.year}`;
  const metric = percentage >= 80 ? 'Excellent performance' : percentage >= 70 ? 'Strong performance' : percentage >= 60 ? 'Satisfactory performance' : percentage >= 50 ? 'Developing performance' : 'Improvement required';
  const rows = [
    ['Name', record.name], ['Father’s Name', record.father], ['Roll No.', record.roll], ['Registration No.', record.reg], ['Programme / Course', record.course], ['Session', session], ['Grade', record.grade], ['Total Marks', record.total], ['Obtained Marks', record.obt], ['Percentage', record.per]
  ];
  target.innerHTML = `<article class="result-card"><div class="result-status"><span>✓</span>Credential record verified</div><div class="result-title"><p class="eyebrow">BSTE examination record</p><h2>${escapeHTML(record.name)}</h2></div><dl class="record-grid">${rows.map(([label,value]) => `<div class="record-row"><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value)}</dd></div>`).join('')}</dl><div class="performance"><div class="performance-top"><span>Performance metric</span><strong>${escapeHTML(metric)} · ${escapeHTML(record.per)}</strong></div><div class="performance-bar" role="progressbar" aria-label="Performance metric" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percentage}"><div class="performance-fill" style="width:${Math.min(100, Math.max(0, percentage))}%"></div></div></div><div class="result-actions"><a class="button button-outline" href="v.html">← New search</a><a class="button button-primary" href="pdf/${encodeURIComponent(record.roll)}.pdf" download="${escapeHTML(record.roll)}.pdf">Download result <span>↓</span></a></div></article>`;
})();
