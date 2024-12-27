const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/caja.json');

function getCaja() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

function updateCaja(newData) {
  fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2));
}

module.exports = { getCaja, updateCaja };
