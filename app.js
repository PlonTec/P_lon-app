document.addEventListener("DOMContentLoaded", () => {

  // ===== CONFIGURACIÓN =====
  const ADMIN_PIN = "1234";

  // ===== REFERENCIAS =====
  const home = document.getElementById("home");
  const formulario = document.getElementById("formulario");
  const ordenes = document.getElementById("ordenes");
  const admin = document.getElementById("admin");
  const listaOrdenes = document.getElementById("listaOrdenes");

  const btnServicio = document.getElementById("btnServicio");
  const btnOrdenes = document.getElementById("btnOrdenes");
  const btnAdmin = document.getElementById("btnAdmin");
  const btnGuardar = document.getElementById("guardar");

  // ===== UTILIDAD =====
  function ocultarTodo() {
    home.classList.add("hidden");
    formulario.classList.add("hidden");
    ordenes.classList.add("hidden");
    admin.classList.add("hidden");
  }

  function volver() {
    ocultarTodo();
    home.classList.remove("hidden");
  }

  // Exponer volver al HTML
  window.volver = volver;

  // ===== NAVEGACIÓN =====
  btnServicio.onclick = () => {
    ocultarTodo();
    formulario.classList.remove("hidden");
  };

  btnOrdenes.onclick = () => {
    ocultarTodo();
    ordenes.classList.remove("hidden");
    mostrarOrdenes();
  };

  // ===== PANEL ADMIN CON PIN =====
  btnAdmin.onclick = () => {
    const pin = prompt("Ingrese el PIN del técnico");

    if (pin !== ADMIN_PIN) {
      alert("Acceso denegado");
      return;
    }

    ocultarTodo();
    admin.classList.remove("hidden");
    cargarAdmin();
  };

  // ===== GUARDAR ORDEN =====
  btnGuardar.onclick = () => {
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;
    const tipo = document.getElementById("tipo").value;
    const descripcion = document.getElementById("descripcion").value;

    if (!nombre || !telefono || !direccion || !tipo || !descripcion) {
      alert("Completa todos los campos");
      return;
    }

    const orden = {
      id: Date.now(),
      nombre,
      telefono,
      direccion,
      tipo,
      descripcion,
      estado: "Pendiente"
    };

    const data = JSON.parse(localStorage.getItem("ordenes")) || [];
    data.push(orden);
    localStorage.setItem("ordenes", JSON.stringify(data));

    alert("Orden creada con éxito");
    volver();
  };

  // ===== MOSTRAR ÓRDENES CLIENTE =====
  function mostrarOrdenes() {
    listaOrdenes.innerHTML = "";
    const data = JSON.parse(localStorage.getItem("ordenes")) || [];

    if (data.length === 0) {
      listaOrdenes.innerHTML = "<p>No hay órdenes registradas</p>";
      return;
    }

    data.forEach(o => {
      const div = document.createElement("div");
      div.className = "orden";
      div.innerHTML = `
        <strong>Orden:</strong> ${o.id}<br>
        <strong>Servicio:</strong> ${o.tipo}<br>
        <strong>Estado:</strong> ${o.estado}<br>
        <button onclick="cancelar(${o.id})">Cancelar</button>
      `;
      listaOrdenes.appendChild(div);
    });
  }

  // Exponer funciones al HTML
  window.cancelar = function(id) {
    let data = JSON.parse(localStorage.getItem("ordenes")) || [];
    data = data.filter(o => o.id !== id);
    localStorage.setItem("ordenes", JSON.stringify(data));
    mostrarOrdenes();
  };

  // ===== PANEL ADMIN – VER ÓRDENES =====
  function cargarAdmin() {
    const adminOrdenes = document.getElementById("adminOrdenes");
    adminOrdenes.innerHTML = "";
    const data = JSON.parse(localStorage.getItem("ordenes")) || [];

    if (data.length === 0) {
      adminOrdenes.innerHTML = "<p>No hay órdenes registradas</p>";
      return;
    }

    data.forEach(o => {
      const div = document.createElement("div");
      div.className = "orden admin";
      div.innerHTML = `
        <strong>Orden:</strong> ${o.id}<br>
        <strong>Cliente:</strong> ${o.nombre}<br>
        <strong>Servicio:</strong> ${o.tipo}<br>
        <strong>Estado:</strong> ${o.estado}
      `;
      adminOrdenes.appendChild(div);
    });
  }

});







