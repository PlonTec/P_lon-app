// ====== CONFIGURACIÓN ======
const ADMIN_PIN = "1234"; // puedes cambiarlo luego

// ====== CREAR ORDEN ======
function crearOrden() {
  const nombre = document.getElementById("clienteNombre").value;
  const telefono = document.getElementById("clienteTelefono").value;
  const servicio = document.getElementById("servicio").value;

  if (!nombre || !telefono || !servicio) {
    alert("Por favor completa todos los campos");
    return;
  }

  const orden = {
    nombre,
    telefono,
    servicio,
    estado: "Pendiente",
    fecha: new Date().toLocaleString()
  };

  let ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
  ordenes.push(orden);
  localStorage.setItem("ordenes", JSON.stringify(ordenes));

  document.getElementById("cliente").style.display = "none";
  document.getElementById("confirmacion").style.display = "block";
}

// ====== VOLVER ======
function volver() {
  document.getElementById("confirmacion").style.display = "none";
  document.getElementById("cliente").style.display = "block";
}

// ====== CANCELAR ORDEN ======
function cancelarOrden() {
  let ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
  ordenes.pop();
  localStorage.setItem("ordenes", JSON.stringify(ordenes));
  volver();
}

// ====== PANEL ADMIN ======
function abrirAdmin() {
  document.getElementById("adminPanel").style.display = "block";
}

function validarPin() {
  const pin = document.getElementById("adminPin").value;

  if (pin === ADMIN_PIN) {
    document.getElementById("loginAdmin").style.display = "none";
    document.getElementById("contenidoAdmin").style.display = "block";
    cargarOrdenes();
  } else {
    alert("PIN incorrecto");
  }
}

function cerrarAdmin() {
  document.getElementById("adminPanel").style.display = "none";
  document.getElementById("loginAdmin").style.display = "block";
  document.getElementById("contenidoAdmin").style.display = "none";
}

// ====== MOSTRAR ÓRDENES ======
function cargarOrdenes() {
  const lista = document.getElementById("listaOrdenes");
  lista.innerHTML = "";

  const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];

  if (ordenes.length === 0) {
    lista.innerHTML = "<p>No hay órdenes registradas</p>";
    return;
  }

  ordenes.forEach((orden, index) => {
    lista.innerHTML += `
      <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
        <strong>${orden.nombre}</strong><br>
        📞 ${orden.telefono}<br>
        🔧 ${orden.servicio}<br>
        📅 ${orden.fecha}<br>
        📌 Estado: ${orden.estado}
      </div>
    `;
  });
}

  });
}


