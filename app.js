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
   FIREBASE
========================= */
const db = firebase.firestore();

/* =========================
   CONFIGURACIÓN
========================= */
const WHATSAPP_TECNICO = "573152309386"; // TU NÚMERO
const PIN_ADMIN = "M1234";

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
  if (pin === PIN_ADMIN) {
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
   CREAR ORDEN + FIREBASE + WHATSAPP
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
    nombre,
    telefono,
    direccion,
    tipo,
    descripcion,
    estado: "Pendiente",
    fecha: new Date().toISOString()
  };

  // 🔥 GUARDAR EN FIREBASE (GLOBAL)
  db.collection("ordenes").add(orden)
    .then(() => {
      enviarWhatsApp(orden);
      alert("Orden creada con éxito");

      formulario.querySelectorAll("input, textarea").forEach(i => i.value = "");
      document.getElementById("tipo").value = "";
      volver();
    })
    .catch(err => {
      alert("Error al guardar la orden");
      console.error(err);
    });
};

/* =========================
   WHATSAPP AUTOMÁTICO (SIN CAMBIOS)
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
   MIS ÓRDENES (LOCAL - OPCIONAL)
========================= */
function mostrarOrdenes() {
  listaOrdenes.innerHTML = "<p>Consulta el estado con el técnico.</p>";
}

/* =========================
   PANEL ADMIN (🔥 FIREBASE GLOBAL)
========================= */
function cargarAdmin() {
  const adminOrdenes = document.getElementById("adminOrdenes");

  db.collection("ordenes")
    .orderBy("fecha", "desc")
    .onSnapshot(snapshot => {
      adminOrdenes.innerHTML = "";

      if (snapshot.empty) {
        adminOrdenes.innerHTML = "<p>No hay órdenes</p>";
        return;
      }

      snapshot.forEach(doc => {
        const o = doc.data();

        const div = document.createElement("div");
        div.className = "orden admin";
        div.innerHTML = `
          <strong>Cliente:</strong> ${o.nombre}<br>
          <strong>Teléfono:</strong> ${o.telefono}<br>
          <strong>Dirección:</strong> ${o.direccion}<br>
          <strong>Servicio:</strong> ${o.tipo}<br>
          <strong>Descripción:</strong> ${o.descripcion}<br>
          <strong>Estado:</strong> ${o.estado}<br><br>

          <button onclick="cambiarEstado('${doc.id}', 'Confirmada')">Confirmar</button>
          <button onclick="cambiarEstado('${doc.id}', 'Finalizada')">Finalizar</button>
        `;
        adminOrdenes.appendChild(div);
      });
    });
}

function cambiarEstado(id, estado) {
  db.collection("ordenes").doc(id).update({ estado });
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

