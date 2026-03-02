document.addEventListener("DOMContentLoaded", function () {

  const container = document.getElementById("interactionContainer");
  const searchInput = document.getElementById("searchInput");

  let data = JSON.parse(localStorage.getItem("interactions")) || [];

  // ===== Stats Function =====
  function updateStats(filteredData) {

    const totalContactsEl = document.getElementById("totalContacts");
    const thisMonthEl = document.getElementById("thisMonth");
    const pendingEl = document.getElementById("pendingCount");

    const totalContacts = filteredData.length;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    let thisMonthCount = 0;

    filteredData.forEach(item => {
      const itemDate = new Date(item.date);
      if (
        itemDate.getMonth() === currentMonth &&
        itemDate.getFullYear() === currentYear
      ) {
        thisMonthCount++;
      }
    });

    const pendingCount = filteredData.filter(item => !item.notes).length;

    totalContactsEl.textContent = totalContacts;
    thisMonthEl.textContent = thisMonthCount;
    pendingEl.textContent = pendingCount;
  }

  // ===== Render Function =====
  function renderCards(filteredData) {

    container.innerHTML = "";

    if (filteredData.length === 0) {
      container.innerHTML = "<p style='color:#aaa;'>No interactions found.</p>";
      return;
    }

    filteredData.forEach(item => {

      const card = document.createElement("div");
      card.className = "card interaction-card";

      card.innerHTML = `
        <div class="card-header">
          <h4>
          <a href="view.html?id=${item.id}" style="color:white; text-decoration:none;">
           ${item.name}
          </a>
          </h4>
          <button class="delete-btn" data-id="${item.id}">✕</button>
        </div>
        <p>${item.company || "—"} | ${item.event || "—"}</p>
        <small>${new Date(item.date).toLocaleDateString()}</small>
      `;

      container.appendChild(card);
    });
  }

  // Initial load
  updateStats(data);
  renderCards(data);

  // ===== Search Functionality =====
  searchInput.addEventListener("input", function () {

    const query = this.value.toLowerCase();

    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(query) ||
      (item.company && item.company.toLowerCase().includes(query))
    );

    updateStats(filteredData);
    renderCards(filteredData);
  });

  // ===== Delete Functionality =====
  document.addEventListener("click", function (e) {

    if (e.target.classList.contains("delete-btn")) {

      const id = Number(e.target.getAttribute("data-id"));

      data = data.filter(item => item.id !== id);

      localStorage.setItem("interactions", JSON.stringify(data));

      updateStats(data);
      renderCards(data);
    }
  });

});