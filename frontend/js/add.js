document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("interactionForm");

  const params = new URLSearchParams(window.location.search);
  const editId = Number(params.get("id"));

  let data = JSON.parse(localStorage.getItem("interactions")) || [];

  // ===== EDIT MODE =====
  if (editId) {

    const interaction = data.find(item => item.id === editId);

    if (interaction) {
      document.getElementById("name").value = interaction.name;
      document.getElementById("company").value = interaction.company;
      document.getElementById("event").value = interaction.event;
      document.getElementById("notes").value = interaction.notes;

      document.querySelector(".topbar h1").textContent = "Edit Interaction";
    }
  }

  // ===== FORM SUBMIT =====
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const company = document.getElementById("company").value.trim();
    const event = document.getElementById("event").value.trim();
    const notes = document.getElementById("notes").value.trim();

    if (!name) {
      showToast("Name is required.", "error");
      return;
    }

    if (editId) {
      // UPDATE EXISTING
      data = data.map(item =>
        item.id === editId
          ? { ...item, name, company, event, notes }
          : item
      );

    } else {
      // CREATE NEW
      const interaction = {
        id: Date.now(),
        name,
        company,
        event,
        notes,
        date: new Date().toISOString()
      };

      data.push(interaction);
    }

    localStorage.setItem("interactions", JSON.stringify(data));

    showToast(editId ? "Interaction updated!" : "Interaction added!", "success");

     setTimeout(() => {
      window.location.href = "dashboard.html";
     }, 800);
  });

});