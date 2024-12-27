const gastosService = require('../service/gastosService');

function nuevoGasto(req, res) {
  const gasto = req.body;
  gastosService.agregarGasto(gasto);
  res.json({ mensaje: 'Gasto agregado correctamente' });
}

function verGastos(req, res) {
  res.json(gastosService.obtenerGastos());
}
module.exports = { nuevoGasto, verGastos };
