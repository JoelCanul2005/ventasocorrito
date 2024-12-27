const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/gastos.json');

function getGastos() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

function addGasto(gasto) {
  const gastos = getGastos();
  gastos.push(gasto);
  fs.writeFileSync(dataPath, JSON.stringify(gastos, null, 2));
}

module.exports = { getGastos, addGasto };
