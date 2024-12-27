const cajaService = require('../service/cajaService');

function verCaja(req, res) {
  res.json(cajaService.obtenerCaja());
}

module.exports = { verCaja };
