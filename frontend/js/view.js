document.addEventListener("DOMContentLoaded", async function () {

  const container = document.getElementById("detailContainer");

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    container.innerHTML = "<p>Invalid Interaction ID.</p>";
    return;
  }

  try {
    const interaction = await apiGet(`/interactions/${id}`);

    if (!interaction || interaction.error || interaction === "Interaction not found") {
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
        <p>${new Date(interaction.created_at).toLocaleDateString()}</p>
      </div>

      <div class="detail-item">
        <h4>Notes</h4>
        <p>${interaction.notes || "—"}</p>
      </div>
    `;
  } catch (err) {
    container.innerHTML = "<p>Error loading interaction.</p>";
  }
});