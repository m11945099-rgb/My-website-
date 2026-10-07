
// Dashboard.js - Working functionality

document.addEventListener("DOMContentLoaded", () => {
  console.log("Dashboard Loaded");

  // 1. Delete functionality
  let rowToDelete = null;
  const deleteButtons = document.querySelectorAll('[data-bs-target="#deleteModal"]');
  const confirmDeleteBtn = document.querySelector("#deleteModal .btn-danger");

  deleteButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      rowToDelete = e.target.closest("tr");
    });
  });

  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", () => {
      if (rowToDelete) {
        rowToDelete.remove();
        rowToDelete = null;
        // Show small alert
        alert("Student deleted successfully");
      }
    });
  }

  // 2. Upload progress simulation
  const fileInput = document.getElementById("file");
  const progressBar = document.querySelector(".progress-bar");
  const uploadBtn = document.querySelector(".btn-primary");

  if (fileInput) {
    fileInput.addEventListener("change", () => {
      if (fileInput.files.length > 0) {
        progressBar.style.width = "0%";
        progressBar.textContent = "0%";
        let progress = 0;
        let interval = setInterval(() => {
          progress += 10;
          progressBar.style.width = progress + "%";
          progressBar.textContent = progress + "%";
          if (progress >= 100) {
            clearInterval(interval);
            progressBar.textContent = "Upload Ready - Click Upload";
          }
        }, 200);
      }
    });
  }

  if (uploadBtn) {
    uploadBtn.addEventListener("click", () => {
      if (!fileInput || fileInput.files.length === 0) {
        alert("Please select a document first");
        return;
      }
      uploadBtn.textContent = "Uploading...";
      setTimeout(() => {
        uploadBtn.textContent = "Upload";
        alert("NIN Uploaded Successfully!");
        progressBar.style.width = "80%";
        progressBar.textContent = "80%";
        fileInput.value = "";
      }, 1500);
    });
  }

  // 3. Notifications click
  const notifIcon = document.querySelector(".bi-bell");
  if (notifIcon) {
    notifIcon.parentElement.style.cursor = "pointer";
    notifIcon.parentElement.addEventListener("click", () => {
      alert("You have 5 new notifications");
    });
  }
});