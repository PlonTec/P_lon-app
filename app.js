document.addEventListener("DOMContentLoaded", () => {

  const ADMIN_PIN = "1234";

  const btnAdmin = document.getElementById("btnAdmin");
  const admin = document.getElementById("admin");
  const home = document.getElementById("home");

  btnAdmin.addEventListener("click", () => {
    alert("Botón Admin detectado"); // PRUEBA CLAVE

    const pin = prompt("Ingrese el PIN del técnico");

    if (pin !== ADMIN_PIN) {
      alert("Acceso denegado");
      return;
    }

    home.classList.add("hidden");
    admin.classList.remove("hidden");
  });

});






