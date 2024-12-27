const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/ingresos.json');

function getIngresos() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

function addIngreso(ingreso) {
  const ingresos = getIngresos();
  ingresos.push(ingreso);
  fs.writeFileSync(dataPath, JSON.stringify(ingresos, null, 2));
}

module.exports = { getIngresos, addIngreso };
