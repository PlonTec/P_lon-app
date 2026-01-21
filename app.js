alert("APP CARGADA CORRECTAMENTE");

/* =========================
   REFERENCIAS
========================= */
const home = document.getElementById("home");
const formulario = document.getElementById("formulario");
const ordenes = document.getElementById("ordenes");
const admin = document.getElementById("admin");
const listaOrdenes = document.getElementById("listaOrdenes");

/* =========================
   CONFIGURACIÓN
========================= */
const WHATSAPP_TECNICO = "573152309386"; // CAMBIA ESTE NÚMERO

/* =========================
   BOTONES PRINCIPALES
========================= */
document.getElementById("btnServicio").onclick = () => {
  ocultarTodo();
  formulario.classList.remove("hidden");
};

document.getElementById("btnOrdenes").onclick = () => {
  ocultarTodo();
  ordenes.classList.remove("hidden");
  mostrarOrdenes();
};

document.getElementById("btnAdmin").onclick = () => {
  const pin = prompt("Ingrese el PIN del técnico");
  if (pin === "M1234") {
    ocultarTodo();
    admin.classList.remove("hidden");
    cargarAdmin();
  } else {
    alert("PIN incorrecto");
  }
};

/* =========================
   VOLVER
========================= */
function volver() {
  ocultarTodo();
  home.classList.remove("hidden");
}

/* =========================
   CREAR ORDEN + WHATSAPP
========================= */
document.getElementById("guardar").onclick = () => {
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

  enviarWhatsApp(orden);

  alert("Orden creada con éxito");
  formulario.querySelectorAll("input, textarea").forEach(i => i.value = "");
  document.getElementById("tipo").value = "";
  volver();
};

/* =========================
   WHATSAPP AUTOMÁTICO
========================= */
function enviarWhatsApp(o) {
  const mensaje =
`🛠️ *Nueva orden de servicio - P-LON*

👤 Cliente: ${o.nombre}
📞 Teléfono: ${o.telefono}
📍 Dirección: ${o.direccion}
🔧 Servicio: ${o.tipo}
📝 Descripción: ${o.descripcion}`;

  const url = `https://wa.me/${WHATSAPP_TECNICO}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

/* =========================
   MIS ÓRDENES
========================= */
function mostrarOrdenes() {
  listaOrdenes.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("ordenes")) || [];

  if (data.length === 0) {
    listaOrdenes.innerHTML = "<p>No hay órdenes</p>";
    return;
  }

  data.forEach(o => {
    const div = document.createElement("div");
    div.className = "orden";
    div.innerHTML = `
      <strong>Servicio:</strong> ${o.tipo}<br>
      <strong>Estado:</strong> ${o.estado}<br>
      <button onclick="cancelar(${o.id})">Cancelar</button>
    `;
    listaOrdenes.appendChild(div);
  });
}

/* =========================
   CANCELAR
========================= */
function cancelar(id) {
  let data = JSON.parse(localStorage.getItem("ordenes")) || [];
  data = data.filter(o => o.id !== id);
  localStorage.setItem("ordenes", JSON.stringify(data));
  mostrarOrdenes();
}

/* =========================
   PANEL ADMIN (MEJORADO)
========================= */
function cargarAdmin() {
  const adminOrdenes = document.getElementById("adminOrdenes");
  adminOrdenes.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("ordenes")) || [];

  if (data.length === 0) {
    adminOrdenes.innerHTML = "<p>No hay órdenes</p>";
    return;
  }

  data.forEach(o => {
    const div = document.createElement("div");
    div.className = "orden admin";
    div.innerHTML = `
      <strong>Orden:</strong> ${o.id}<br>
      <strong>Cliente:</strong> ${o.nombre}<br>
      <strong>Teléfono:</strong> ${o.telefono}<br>
      <strong>Dirección:</strong> ${o.direccion}<br>
      <strong>Servicio:</strong> ${o.tipo}<br>
      <strong>Descripción:</strong> ${o.descripcion}<br>
      <strong>Estado:</strong> ${o.estado}<br><br>
      <button onclick="cambiarEstado(${o.id}, 'Confirmada')">Confirmar</button>
      <button onclick="cambiarEstado(${o.id}, 'Finalizada')">Finalizar</button>
    `;
    adminOrdenes.appendChild(div);
  });
}

function cambiarEstado(id, estado) {
  let data = JSON.parse(localStorage.getItem("ordenes")) || [];
  data = data.map(o => {
    if (o.id === id) o.estado = estado;
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


