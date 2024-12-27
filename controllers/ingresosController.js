const ingresosService = require('../service/ingresosService');

function nuevoIngreso(req, res) {
  const ingreso = req.body;
  ingresosService.agregarIngreso(ingreso);
  res.json({ mensaje: 'Ingreso agregado correctamente' });
}

function verIngresos(req, res) {
    res.json(ingresosService.obtenerIngresos());
  }

module.exports = { nuevoIngreso, verIngresos };
