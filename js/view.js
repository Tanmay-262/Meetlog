document.addEventListener("DOMContentLoaded", function () {

  const container = document.getElementById("detailContainer");

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  const data = JSON.parse(localStorage.getItem("interactions")) || [];

  const interaction = data.find(item => item.id === id);

  if (!interaction) {
    container.innerHTML = "<p>Interaction not found.</p>";
    return;
  }

  container.innerHTML = `
    <div class="detail-item">
      <h4>Name</h4>
      <p>${interaction.name}</p>
    </div>

    <div class="detail-item">
      <h4>Company</h4>
      <p>${interaction.company || "—"}</p>
    </div>

    <div class="detail-item">
      <h4>Event</h4>
      <p>${interaction.event || "—"}</p>
    </div>

    <div class="detail-item">
      <h4>Date</h4>
      <p>${new Date(interaction.date).toLocaleDateString()}</p>
    </div>

    <div class="detail-item">
      <h4>Notes</h4>
      <p>${interaction.notes || "—"}</p>
    </div>
  `;
});