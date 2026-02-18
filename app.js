class Tarea {
  constructor(nombre, completa = false) {
    this.nombre = nombre;
    this.completa = completa;
  }
}

class GestorDeTareas {
  constructor() {
    const guardadas = JSON.parse(localStorage.getItem("tareas")) || [];
    this.tareas = guardadas.map(t => new Tarea(t.nombre, Boolean(t.completa)));
  }

  agregarTarea(nombre) {
    this.tareas.push(new Tarea(nombre));
    this.guardar();
  }

  eliminarTarea(index) {
    this.tareas.splice(index, 1);
    this.guardar();
  }

  editarTarea(index, nuevoNombre) {
    this.tareas[index].nombre = nuevoNombre;
    this.guardar();
  }

  cambiarEstado(index) {
    this.tareas[index].completa = !this.tareas[index].completa;
    this.guardar();
  }

  guardar() {
    localStorage.setItem("tareas", JSON.stringify(this.tareas));
  }
}

const gestor = new GestorDeTareas();

const inputTarea = document.getElementById("tareaInput");
const botonAgregar = document.getElementById("agregarBtn");
const listaTareas = document.getElementById("listaTareas");
const contadorTareas = document.getElementById("contadorTareas");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const actualizarContador = () => {
  const completadas = gestor.tareas.filter(t => t.completa).length;
  const total = gestor.tareas.length;
  contadorTareas.textContent = `Tareas completadas: ${completadas} de ${total}`;
};

const crearBoton = (texto, clases, onClick) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = texto;
  if (clases) button.className = clases;
  button.addEventListener("click", onClick);
  return button;
};

const renderizarTareas = () => {
  listaTareas.innerHTML = "";

  gestor.tareas.forEach((tarea, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarea.completa;
    checkbox.setAttribute("aria-label", `Marcar tarea ${tarea.nombre} como completada`);
    checkbox.addEventListener("change", () => {
      gestor.cambiarEstado(index);
      renderizarTareas();
    });

    const nombre = document.createElement("span");
    nombre.textContent = tarea.nombre;
    if (tarea.completa) {
      nombre.classList.add("tarea-completa");
    }

    const acciones = document.createElement("div");
    acciones.className = "acciones-tarea";

    const btnEditar = crearBoton("Editar", "btn-secundario", () => {
      const nuevoNombre = prompt("Editar tarea", tarea.nombre);
      if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
        gestor.editarTarea(index, nuevoNombre.trim());
        renderizarTareas();
      }
    });

    const btnEliminar = crearBoton("Eliminar", "btn-peligro", () => {
      gestor.eliminarTarea(index);
      renderizarTareas();
    });

    acciones.append(btnEditar, btnEliminar);
    li.append(checkbox, nombre, acciones);
    listaTareas.appendChild(li);
  });

  actualizarContador();
};

botonAgregar.addEventListener("click", () => {
  const texto = inputTarea.value.trim();

  if (!texto) {
    alert("No se permiten tareas vacías");
    return;
  }

  gestor.agregarTarea(texto);
  inputTarea.value = "";
  renderizarTareas();
  inputTarea.focus();
});

inputTarea.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    botonAgregar.click();
  }
});

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    formStatus.textContent = "Por favor completa correctamente todos los campos del formulario.";
    return;
  }

  formStatus.textContent = "¡Gracias! Tu mensaje se envió correctamente.";
  contactForm.reset();
});

renderizarTareas();
