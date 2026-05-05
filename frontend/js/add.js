document.addEventListener("DOMContentLoaded", async function () {

  const form = document.getElementById("interactionForm");

  const params = new URLSearchParams(window.location.search);
  const editId = params.get("id");

  // ===== EDIT MODE =====
  if (editId) {
    try {
      const interaction = await apiGet(`/interactions/${editId}`);
      
      if (interaction && !interaction.error) {
        document.getElementById("name").value = interaction.name || "";
        document.getElementById("company").value = interaction.company || "";
        document.getElementById("event").value = interaction.event || "";
        document.getElementById("notes").value = interaction.notes || "";
  
        document.querySelector(".topbar h1").textContent = "Edit Interaction";
      }
    } catch (err) {
      showToast("Error loading interaction", "error");
    }
  }

  // ===== FORM SUBMIT =====
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const company = document.getElementById("company").value.trim();
    const event = document.getElementById("event").value.trim();
    const notes = document.getElementById("notes").value.trim();

    if (!name) {
      showToast("Name is required.", "error");
      return;
    }

    const payload = { name, company, event, notes };

    try {
      if (editId) {
        // UPDATE EXISTING
        const res = await apiPut(`/interactions/${editId}`, payload);
        if (res.ok) {
          showToast("Interaction updated!", "success");
        } else {
          showToast("Failed to update", "error");
          return;
        }
      } else {
        // CREATE NEW
        const res = await apiPost("/interactions", payload);
        if (res.ok) {
          showToast("Interaction added!", "success");
        } else {
          showToast("Failed to add", "error");
          return;
        }
      }

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 800);
      
    } catch (err) {
      showToast("An error occurred", "error");
    }
  });

});