const fs = require('fs').promises;
const path = require('path');

const getDataPath = (fileName) => path.join(__dirname, '..', '..', fileName);

const readJsonFile = async (fileName) => {
  const filePath = getDataPath(fileName);

  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(filePath, '[]');
      return [];
    }
    throw error;
  }
};

const writeJsonFile = async (fileName, data) => {
  const filePath = getDataPath(fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

module.exports = { readJsonFile, writeJsonFile };
