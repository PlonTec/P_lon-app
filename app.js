/* =========================
   REFERENCIAS PRINCIPALES
========================= */
const home = document.getElementById("home");
const formulario = document.getElementById("formulario");
const ordenes = document.getElementById("ordenes");
const admin = document.getElementById("admin");
const listaOrdenes = document.getElementById("listaOrdenes");

/* =========================
   BOTONES PRINCIPALES
========================= */
document.getElementById("btnServicio").addEventListener("click", () => {
  ocultarTodo();
  formulario.classList.remove("hidden");
});

document.getElementById("btnOrdenes").addEventListener("click", () => {
  ocultarTodo();
  ordenes.classList.remove("hidden");
  mostrarOrdenes();
});

document.getElementById("btnAdmin").addEventListener("click", () => {
  ocultarTodo();
  admin.classList.remove("hidden");
  cargarAdmin();
});

/* =========================
   VOLVER
========================= */
function volver() {
  ocultarTodo();
  home.classList.remove("hidden");
}

/* =========================
   GUARDAR ORDEN
========================= */
document.getElementById("guardar").addEventListener("click", () => {
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
  document.getElementById("formularioForm").reset();
  volver();
});

/* =========================
   MOSTRAR ÓRDENES CLIENTE
========================= */
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

/* =========================
   CANCELAR ORDEN
========================= */
function cancelar(id) {
  let data = JSON.parse(localStorage.getItem("ordenes")) || [];
  data = data.filter(o => o.id !== id);
  localStorage.setItem("ordenes", JSON.stringify(data));
  mostrarOrdenes();
}

/* =========================
   PANEL ADMIN
========================= */
function cargarAdmin() {
  const adminOrdenes = document.getElementById("adminOrdenes");
  adminOrdenes.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("ordenes")) || [];

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

function cambiarEstado(id, nuevoEstado) {
  let data = JSON.parse(localStorage.getItem("ordenes")) || [];
  data = data.map(o => {
    if (o.id === id) o.estado = nuevoEstado;
    return o;
  });
  localStorage.setItem("ordenes", JSON.stringify(data));
  cargarAdmin();
}

/* =========================
   UTILIDAD
========================= */
function ocultarTodo() {
  home.classList.add("hidden");
  formulario.classList.add("hidden");
  ordenes.classList.add("hidden");
  admin.classList.add("hidden");
}
