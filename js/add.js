document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("interactionForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const company = document.getElementById("company").value.trim();
    const event = document.getElementById("event").value.trim();
    const notes = document.getElementById("notes").value.trim();

    if (!name) {
      alert("Name is required.");
      return;
    }

    const interaction = {
      id: Date.now(),
      name,
      company,
      event,
      notes,
      date: new Date().toLocaleDateString()
    };

    const existingData =
      JSON.parse(localStorage.getItem("interactions")) || [];

    existingData.push(interaction);

    localStorage.setItem("interactions", JSON.stringify(existingData));

    window.location.href = "dashboard.html";
  });

});