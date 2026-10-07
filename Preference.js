// dashboard.js - For Student Dashboard

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Handle Delete Modal - know which student to delete
  let rowToDelete = null;
  const deleteButtons = document.querySelectorAll('[data-bs-target="#deleteModal"]');
  const deleteModal = document.getElementById('deleteModal');
  
  deleteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      rowToDelete = e.target.closest('tr');
    });
  });

  // Confirm delete
  const confirmDeleteBtn = deleteModal.querySelector('.btn-danger');
  confirmDeleteBtn.addEventListener('click', () => {
    if (rowToDelete) {
      rowToDelete.remove();
      updateNotificationCount(-1);
      showToast('Student deleted successfully');
    }
  });

  // 2. Notifications badge counter
  let notificationCount = 5;
  function updateNotificationCount(change) {
    notificationCount += change;
    const badge = document.querySelector('.badge.bg-success');
    if (badge) badge.textContent = notificationCount;
  }

  // 3. NIN Upload with progress simulation
  const fileInput = document.getElementById('files');
  const progressBar = document.querySelector('.progress-bar');
  const uploadBtn = document.querySelector('.btn-primary');

  if (uploadBtn) {
    uploadBtn.addEventListener('click', () => {
      if (!fileInput.files.length) {
        alert('Please select a document first!');
        return;
      }
      
      // Simulate upload progress
      let progress = 0;
      progressBar.style.width = '0%';
      progressBar.textContent = '0%';
      
      const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${progress}%`;
        
        if (progress >= 100) {
          clearInterval(interval);
          showToast('NIN uploaded successfully!');
          // Hide spinner
          document.querySelector('.spinner-grow')?.parentElement.classList.add('d-none');
        }
      }, 200);
    });
  }

  // 4. Add new student dynamically (for testing)
  window.addStudent = function(name, email, phone) {
    const tbody = document.querySelector('table tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${name}</td>
      <td>${email}</td>
      <td>${phone}</td>
      <td>https://example.com</td>
      <td><span class="badge bg-success"> Active </span></td>
      <td><button class="btn btn-danger" data-bs-target="#deleteModal" data-bs-toggle="modal"><i class="bi bi-trash"></i></button></td>
    `;
    tbody.appendChild(tr);
    updateNotificationCount(1);
  }

  // 5. Simple Toast notification helper
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'alert alert-success position-fixed bottom-0 end-0 m-3';
    toast.style.zIndex = '9999';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // 6. Search/Filter table (bonus)
  // You can add <input id="searchInput"> later
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      document.querySelectorAll('table tbody tr').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(term) ? '' : 'none';
      });
    });
  }

  console.log('Dashboard JS loaded - Welcome Trust!');
});
