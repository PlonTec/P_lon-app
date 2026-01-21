// ===============================
// REFERENCIAS
// ===============================
const home = document.getElementById("home");
const formulario = document.getElementById("formulario");
const ordenes = document.getElementById("ordenes");
const admin = document.getElementById("admin");

const listaOrdenes = document.getElementById("listaOrdenes");
const adminOrdenes = document.getElementById("adminOrdenes");

const btnServicio = document.getElementById("btnServicio");
const btnOrdenes = document.getElementById("btnOrdenes");
const btnAdmin = document.getElementById("btnAdmin");
const btnGuardar = document.getElementById("guardar");

// ===============================
// UTILIDAD
// ===============================
function ocultarTodo() {
  home.classList.add("hidden");
  formulario.classList.add("hidden");
  ordenes.classList.add("hidden");
  admin.classList.add("hidden");
}

// ===============================
// BOTONES PRINCIPALES
// ===============================
btnServicio.onclick = () => {
  ocultarTodo();
  formulario.classList.remove("hidden");
};

btnOrdenes.onclick = () => {
  ocultarTodo();
  ordenes.classList.remove("hidden");
  mostrarOrdenes();
};

// ===============================
// VOLVER (GLOBAL)
// ===============================
function volver() {
  ocultarTodo();
  home.classList.remove("hidden");
}
window.volver = volver; // 🔴 CLAVE: expone la función al HTML

// ===============================
// GUARDAR ORDEN
// ===============================
btnGuardar.onclick = () => {
  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const direccion = document.getElementById("direccion").value;
  const tipo = document.getElementById("tipo").value;
  const descripcion = document.getElementById("descripcion").value;

  if (!nombre || !telefono || !direccion || !tipo || !descripcion) {
    alert("Por favor completa todos los campos");
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

// ===============================
// MOSTRAR ÓRDENES CLIENTE
// ===============================
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
window.mostrarOrdenes = mostrarOrdenes;

// ===============================
// CANCELAR ORDEN
// ===============================
function cancelar(id) {
  let data = JSON.parse(localStorage.getItem("ordenes")) || [];
  data = data.filter(o => o.id !== id);
  localStorage.setItem("ordenes", JSON.stringify(data));
  mostrarOrdenes();
}
window.cancelar = cancelar;

// ===============================
// PANEL ADMIN (EXCLUSIVO)
// ===============================
const ADMIN_PIN = "1234";

btnAdmin.onclick = () => {
  const pin = window.prompt("Ingrese el PIN del técnico");

  if (!pin) return;

  if (pin !== ADMIN_PIN) {
    alert("PIN incorrecto");
    return;
  }

  ocultarTodo();
  admin.classList.remove("hidden");
  cargarAdmin();
};

// ===============================
// CARGAR ADMIN
// ===============================
function cargarAdmin() {
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
      <strong>Estado:</strong> ${o.estado}<br>
      <button onclick="cambiarEstado(${o.id}, 'Confirmada')">Confirmar</button>
      <button onclick="cambiarEstado(${o.id}, 'Finalizada')">Finalizar</button>
    `;
    adminOrdenes.appendChild(div);
  });
}
window.cargarAdmin = cargarAdmin;

// ===============================
// CAMBIAR ESTADO
// ===============================
function cambiarEstado(id, estado) {
  let data = JSON.parse(localStorage.getItem("ordenes")) || [];
  data = data.map(o => {
    if (o.id === id) o.estado = estado;
    return o;
  });
  localStorage.setItem("ordenes", JSON.stringify(data));
  cargarAdmin();
}
window.cambiarEstado = cambiarEstado;


