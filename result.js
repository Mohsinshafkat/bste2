document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('result-container');
  if (!container) return;

  // URL parameters read karna (?roll=90625&year=2023)
  const urlParams = new URLSearchParams(window.location.search);
  const roll = urlParams.get('roll');
  const year = urlParams.get('year');

  if (!roll || !year) {
    container.innerHTML = `
      <div class="missing-result">
        <div class="missing-icon">!</div>
        <h2>Invalid Search Parameters</h2>
        <p>Please enter Roll Number and Passing Year from verification page.</p>
        <a href="v.html" class="button button-primary">Go to Verification Page</a>
      </div>
    `;
    return;
  }

  // Search in studentsData array
  const student = (window.studentsData || []).find(s => 
    String(s.roll) === String(roll).trim() && String(s.year) === String(year).trim()
  );

  if (student) {
    // Record matched
    container.innerHTML = `
      <div class="result-card">
        <div class="result-status">
          <span>✓</span> Official Verification Status: Verified Match
        </div>
        
        <div class="result-title">
          <p class="eyebrow">Credential Card</p>
          <h2>${student.name}</h2>
        </div>

        <div class="record-grid">
          <div class="record-row"><dt>Father / Husband Name</dt><dd>${student.fatherName || student.father_name || 'N/A'}</dd></div>
          <div class="record-row"><dt>Roll Number</dt><dd>${student.roll}</dd></div>
          <div class="record-row"><dt>Registration No.</dt><dd>${student.regNo || ('BSTE/TEC/' + student.roll)}</dd></div>
          <div class="record-row"><dt>Passing Year</dt><dd>${student.year}</dd></div>
          <div class="record-row"><dt>Programme / Course</dt><dd>${student.course || student.program}</dd></div>
          <div class="record-row"><dt>Institute / Board</dt><dd>${student.institute || 'BSTE PAKISTAN'}</dd></div>
          <div class="record-row"><dt>Session</dt><dd>${student.session || 'N/A'}</dd></div>
          <div class="record-row"><dt>Grade</dt><dd>${student.grade || 'N/A'}</dd></div>
          <div class="record-row"><dt>Total Marks</dt><dd>${student.totalMarks || student.total || 'N/A'}</dd></div>
          <div class="record-row"><dt>Obtained Marks</dt><dd>${student.obtainedMarks || student.obtained || 'N/A'}</dd></div>
          <div class="record-row"><dt>Percentage</dt><dd>${student.percentage || 'N/A'}</dd></div>
        </div>

        <div class="result-actions">
          <button onclick="downloadCustomPDF('${student.roll}')" class="button button-primary">
            Download Verification Document <span>↓</span>
          </button>
          <a href="v.html" class="button button-outline">Verify Another Record</a>
        </div>
      </div>
    `;
  } else {
    // Record Not Found
    container.innerHTML = `
      <div class="missing-result">
        <div class="missing-icon">✕</div>
        <h2>No Record Found</h2>
        <p>No student record was found matching Roll No: <strong>${roll}</strong> and Year: <strong>${year}</strong>.</p>
        <a href="v.html" class="button button-primary">Try Again</a>
      </div>
    `;
  }
});
