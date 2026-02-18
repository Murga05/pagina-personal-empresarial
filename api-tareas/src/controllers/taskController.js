const { readJsonFile, writeJsonFile } = require('../utils/fileDb');

const TASKS_FILE = 'tareas.json';

const getTasks = async (req, res, next) => {
  try {
    const tasks = await readJsonFile(TASKS_FILE);
    return res.status(200).json(tasks);
  } catch (error) {
    return next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { titulo, descripcion } = req.body;

    if (!titulo || !descripcion) {
      return res.status(400).json({ message: 'titulo y descripcion son obligatorios' });
    }

    const tasks = await readJsonFile(TASKS_FILE);
    const newTask = {
      id: Date.now().toString(),
      titulo,
      descripcion,
      usuarioId: req.user.id,
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    await writeJsonFile(TASKS_FILE, tasks);

    return res.status(201).json(newTask);
  } catch (error) {
    return next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;
    const tasks = await readJsonFile(TASKS_FILE);
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      titulo: titulo || tasks[taskIndex].titulo,
      descripcion: descripcion || tasks[taskIndex].descripcion,
      updatedAt: new Date().toISOString(),
    };

    await writeJsonFile(TASKS_FILE, tasks);

    return res.status(200).json(tasks[taskIndex]);
  } catch (error) {
    return next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tasks = await readJsonFile(TASKS_FILE);
    const filteredTasks = tasks.filter((task) => task.id !== id);

    if (filteredTasks.length === tasks.length) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    await writeJsonFile(TASKS_FILE, filteredTasks);

    return res.status(200).json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
