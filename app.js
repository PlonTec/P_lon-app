const home = document.getElementById("home");
const formulario = document.getElementById("formulario");
const ordenes = document.getElementById("ordenes");
const listaOrdenes = document.getElementById("listaOrdenes");

document.getElementById("btnServicio").onclick = () => {
  home.classList.add("hidden");
  formulario.classList.remove("hidden");
};

document.getElementById("btnOrdenes").onclick = () => {
  home.classList.add("hidden");
  ordenes.classList.remove("hidden");
  mostrarOrdenes();
};

function volver() {
  formulario.classList.add("hidden");
  ordenes.classList.add("hidden");
  home.classList.remove("hidden");
}

document.getElementById("guardar").onclick = () => {
  const orden = {
    id: Date.now(),
    nombre: nombre.value,
    telefono: telefono.value,
    direccion: direccion.value,
    tipo: tipo.value,
    descripcion: descripcion.value,
    estado: "Pendiente"
  };

  let data = JSON.parse(localStorage.getItem("ordenes")) || [];
  data.push(orden);
  localStorage.setItem("ordenes", JSON.stringify(data));

  alert("Orden creada con éxito");
  formulario.reset();
  volver();
};

function mostrarOrdenes() {
  listaOrdenes.innerHTML = "";
  let data = JSON.parse(localStorage.getItem("ordenes")) || [];

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

function cancelar(id) {
  let data = JSON.parse(localStorage.getItem("ordenes"));
  data = data.filter(o => o.id !== id);
  localStorage.setItem("ordenes", JSON.stringify(data));
  mostrarOrdenes();
}
document.getElementById("btnAdmin").onclick = () => {
  home.classList.add("hidden");
  admin.classList.remove("hidden");
  cargarAdmin();
};

function cargarAdmin() {
  const adminOrdenes = document.getElementById("adminOrdenes");
  adminOrdenes.innerHTML = "";
  let data = JSON.parse(localStorage.getItem("ordenes")) || [];

  data.forEach(o => {
    const div = document.createElement("div");
    div.className = "orden admin";
    div.innerHTML = `
      <strong>Orden:</strong> ${o.id}<br>
      <strong>Cliente:</strong> ${o.nombre}<br>
      <strong>Servicio:</strong> ${o.tipo}<br>
      <strong>Estado:</strong> ${o.estado}<br>
      <button onclick="estado(${o.id}, 'Confirmada')">Confirmar</button>
      <button onclick="estado(${o.id}, 'Finalizada')">Finalizar</button>
    `;
    adminOrdenes.appendChild(div);
  });
}

function estado(id, nuevo) {
  let data = JSON.parse(localStorage.getItem("ordenes"));
  data = data.map(o => {
    if (o.id === id) {
      o.estado = nuevo;
      if (nuevo === "Finalizada") {
        o.puntos = (o.puntos || 0) + 10;
      }
    }
    return o;
  });
  localStorage.setItem("ordenes", JSON.stringify(data));
  cargarAdmin();
}
const PIN_ADMIN = "1234"; // luego lo cambiamos

function abrirAdmin() {
  document.getElementById("adminPanel").style.display = "block";
}

function cerrarAdmin() {
  document.getElementById("adminPanel").style.display = "none";
  document.getElementById("adminPin").value = "";
}

function validarPin() {
  const pin = document.getElementById("adminPin").value;

  if (pin === PIN_ADMIN) {
    document.getElementById("loginAdmin").style.display = "none";
    document.getElementById("contenidoAdmin").style.display = "block";
    cargarOrdenes();
  } else {
    alert("❌ PIN incorrecto");
  }
}

function cargarOrdenes() {
  const contenedor = document.getElementById("listaOrdenes");
  contenedor.innerHTML = "";

  const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];

  if (ordenes.length === 0) {
    contenedor.innerHTML = "<p>No hay órdenes registradas.</p>";
    return;
  }

  ordenes.forEach((orden, index) => {
    contenedor.innerHTML += `
      <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
        <strong>${orden.cliente}</strong><br>
        Servicio: ${orden.servicio}<br>
        Teléfono: ${orden.telefono}<br>
        Estado: ${orden.estado}<br>
      </div>
    `;
  });
}

