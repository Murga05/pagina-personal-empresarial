// =============================
// CLASE TAREA
// =============================
class Tarea {
    constructor(nombre, completa = false) {
        this.nombre = nombre;
        this.completa = completa;
    }

    editar(nuevoNombre) {
        this.nombre = nuevoNombre;
    }

    cambiarEstado() {
        this.completa = !this.completa;
    }
}

// =============================
// CLASE GESTOR DE TAREAS
// =============================
class GestorDeTareas {
    constructor() {
        this.tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    }

    agregarTarea(tarea) {
        this.tareas.push(tarea);
        this.guardar();
    }

    eliminarTarea(index) {
        this.tareas.splice(index, 1);
        this.guardar();
    }

    guardar() {
        localStorage.setItem("tareas", JSON.stringify(this.tareas));
    }
}

// =============================
// MANIPULACIÓN DEL DOM
// =============================
const gestor = new GestorDeTareas();

const inputTarea = document.getElementById("tareaInput");
const botonAgregar = document.getElementById("agregarBtn");
const listaTareas = document.getElementById("listaTareas");

// =============================
// RENDERIZAR TAREAS
// =============================
const renderizarTareas = () => {
    listaTareas.innerHTML = "";

    gestor.tareas.forEach((tarea, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${tarea.nombre}</span>
            <div>
                <button onclick="editarTarea(${index})">Editar</button>
                <button onclick="eliminarTarea(${index})">Eliminar</button>
            </div>
        `;

        listaTareas.appendChild(li);
    });
};

// =============================
// AGREGAR TAREA
// =============================
botonAgregar.addEventListener("click", () => {
    const texto = inputTarea.value.trim();

    if (texto === "") {
        alert("No se permiten tareas vacías");
        return;
    }

    const nuevaTarea = new Tarea(texto);
    gestor.agregarTarea(nuevaTarea);

    inputTarea.value = "";
    renderizarTareas();
});

// =============================
// ELIMINAR TAREA
// =============================
const eliminarTarea = index => {
    gestor.eliminarTarea(index);
    renderizarTareas();
};

// =============================
// EDITAR TAREA
// =============================
const editarTarea = index => {
    const nuevoNombre = prompt(
        "Editar tarea",
        gestor.tareas[index].nombre
    );

    if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
        gestor.tareas[index].editar(nuevoNombre);
        gestor.guardar();
        renderizarTareas();
    }
};

// =============================
// CARGAR TAREAS AL INICIAR
// =============================
renderizarTareas();
