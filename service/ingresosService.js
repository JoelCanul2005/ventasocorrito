const ingresosRepo = require('../repository/ingresosRepository');
const cajaService = require('./cajaService');

function agregarIngreso(ingreso) {
  ingresosRepo.addIngreso(ingreso);
  const caja = cajaService.obtenerCaja();
  caja.ingresos += ingreso.monto;
  caja.total += ingreso.monto;
  cajaService.actualizarCaja(caja);
}

function obtenerIngresos() {
  return ingresosRepo.getIngresos();
}

module.exports = { agregarIngreso, obtenerIngresos };
