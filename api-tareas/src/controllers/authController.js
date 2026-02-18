const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readJsonFile, writeJsonFile } = require('../utils/fileDb');

const USERS_FILE = 'users.json';

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'username y password son obligatorios' });
    }

    const users = await readJsonFile(USERS_FILE);
    const exists = users.find((u) => u.username === username);

    if (exists) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      username,
      password: hashedPassword,
      role: 'user',
    };

    users.push(newUser);
    await writeJsonFile(USERS_FILE, users);

    return res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'username y password son obligatorios' });
    }

    const users = await readJsonFile(USERS_FILE);
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const passwordOk = await bcrypt.compare(password, user.password);

    if (!passwordOk) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'secreto_dev',
      { expiresIn: '1h' }
    );

    return res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login };
