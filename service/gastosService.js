const gastosRepo = require('../repository/gastosRepository');
const cajaService = require('./cajaService');

function agregarGasto(gasto) {
  gastosRepo.addGasto(gasto);
  const caja = cajaService.obtenerCaja();
  caja.gastos += gasto.monto;
  caja.total -= gasto.monto;
  cajaService.actualizarCaja(caja);
}


function obtenerGastos() {
  return gastosRepo.getGastos();
}

module.exports = { agregarGasto, obtenerGastos };
