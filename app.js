document.addEventListener("DOMContentLoaded", () => {

  const ADMIN_PIN = "1234";

  const btnAdmin = document.getElementById("btnAdmin");
  const admin = document.getElementById("admin");
  const home = document.getElementById("home");

  btnAdmin.addEventListener("click", () => {

    const pin = window.prompt("Ingrese el PIN del técnico:");

    if (!pin) {
      alert("Acceso cancelado");
      return;
    }

    if (pin !== ADMIN_PIN) {
      alert("PIN incorrecto");
      return;
    }

    home.classList.add("hidden");
    admin.classList.remove("hidden");
  });

});

