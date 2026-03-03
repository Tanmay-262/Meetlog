function showToast(message, type = "default") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;

  toast.classList.remove("success", "error");
  if (type === "success") toast.classList.add("success");
  if (type === "error") toast.classList.add("error");

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}