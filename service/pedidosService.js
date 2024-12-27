const pedidosRepo = require('../repository/pedidosRepository');
const cajaService = require('./cajaService');

function agregarPedido(pedido) {
  pedidosRepo.addPedido(pedido);
}

function obtenerPedidos() {
  return pedidosRepo.getPedidos();
}

function obtenerPedidoPorId(id) {
  return pedidosRepo.getPedidoById(id);
}

function marcarComoPagado(id) {
  const pedido = pedidosRepo.getPedidoById(id);
  if (pedido && !pedido.pagado) {
    pedido.pagado = true;
    pedidosRepo.updatePedido(id, pedido);
    const caja = cajaService.obtenerCaja();
    caja.total += pedido.total;
    caja.vendido += pedido.total;
    cajaService.actualizarCaja(caja);
    return true;
  }
  return false;
}

function marcarComoEntregado(id) {
  const pedido = pedidosRepo.getPedidoById(id);
  if (pedido && !pedido.entregado) {
    pedido.entregado = true;
    pedidosRepo.updatePedido(id, pedido);
    return true;
  }
  return false;
}

function actualizarPedido(id, updatedPedido) {
  const pedido = pedidosRepo.getPedidoById(id);
  if (pedido) {
    // Si el pedido ya está marcado como pagado, restamos el monto de la caja antes de restablecerlo
    if (pedido.pagado) {
      // Restar el monto de la caja
      const caja = cajaService.obtenerCaja();
      caja.total -= pedido.total;
      caja.vendido -= pedido.total;
      cajaService.actualizarCaja(caja);
    }

    // Actualizar pedido y restablecer los campos de pagado y entregado
    updatedPedido.pagado = false; // Restablecer a false
    updatedPedido.entregado = false; // Restablecer a false
    pedidosRepo.updatePedido(id, updatedPedido);
    return true;
  }
  return false;
}

function eliminarPedido(id) {
  const pedido = pedidosRepo.deletePedido(id);
  if (pedido) {
    // Restar el monto de la caja al eliminar el pedido
    const caja = cajaService.obtenerCaja();
    caja.total -= pedido.total;
    caja.vendido -= pedido.total;
    cajaService.actualizarCaja(caja);
    return true;
  }
  return false;
}


function cierreDeVenta() {
  const pedidos = pedidosRepo.getPedidos();
  const caja = cajaService.obtenerCaja();
  
  const resumen = {
    ingresos: caja.total,
    pedidos: pedidos,
    gastos: caja.gastos || 0
  };

  setTimeout(() => {
    pedidosRepo.clearPedidos();
    cajaService.actualizarCaja({ total: 0, ingresos: 0, vendido: 0, gastos: 0 });
    console.log('Datos reiniciados después del cierre de venta.');
  }, 15*60*1000); 

  return resumen;
}
module.exports = { agregarPedido,cierreDeVenta, obtenerPedidos, obtenerPedidoPorId, marcarComoPagado, marcarComoEntregado, actualizarPedido, eliminarPedido };
