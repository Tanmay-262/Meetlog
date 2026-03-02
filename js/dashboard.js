document.addEventListener("DOMContentLoaded", function () {

  const container = document.getElementById("interactionContainer");

  const data = JSON.parse(localStorage.getItem("interactions")) || [];

  if (data.length === 0) {
    container.innerHTML = "<p style='color:#aaa;'>No interactions yet.</p>";
    return;
  }

  data.forEach(item => {

    const card = document.createElement("div");
    card.className = "card interaction-card";

    card.innerHTML = `
      <h4>${item.name}</h4>
      <p>${item.company} | ${item.event}</p>
      <small>${item.date}</small>
    `;

    container.appendChild(card);
  });

});