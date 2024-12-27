const cajaRepo = require('../repository/cajaRepository');

function obtenerCaja() {
  return cajaRepo.getCaja();
}

function actualizarCaja(nuevaCaja) {
  cajaRepo.updateCaja(nuevaCaja);
}

module.exports = { obtenerCaja, actualizarCaja };
