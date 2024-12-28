const pedidosService = require('../service/pedidosService');

function agregarPedido(req, res) {
  const pedido = req.body;
  pedidosService.agregarPedido(pedido);
  res.status(201).json({ mensaje: 'Pedido creado correctamente' });
}

function obtenerPedidos(req, res) {
  const pedidos = pedidosService.obtenerPedidos();
  res.status(200).json(pedidos);
}

function obtenerPedidoPorId(req, res) {
  const { id } = req.params;
  const pedido = pedidosService.obtenerPedidoPorId(Number(id));
  if (pedido) {
    res.status(200).json(pedido);
  } else {
    res.status(404).json({ mensaje: 'Pedido no encontrado' });
  }
}

function marcarComoPagado(req, res) {
  const { id } = req.params;
  const exito = pedidosService.marcarComoPagado(Number(id));
  if (exito) {
    res.status(200).json({ mensaje: 'Pedido marcado como pagado' });
  } else {
    res.status(404).json({ mensaje: 'Pedido no encontrado o ya pagado' });
  }
}

function marcarComoEntregado(req, res) {
  const { id } = req.params;
  const exito = pedidosService.marcarComoEntregado(Number(id));
  if (exito) {
    res.status(200).json({ mensaje: 'Pedido marcado como entregado' });
  } else {
    res.status(404).json({ mensaje: 'Pedido no encontrado o ya entregado' });
  }
}

function actualizarPedido(req, res) {
  const { id } = req.params;
  const updatedPedido = req.body;
  const exito = pedidosService.actualizarPedido(Number(id), updatedPedido);
  if (exito) {
    res.status(200).json({ mensaje: 'Pedido actualizado correctamente' });
  } else {
    res.status(404).json({ mensaje: 'Pedido no encontrado' });
  }
}

function eliminarPedido(req, res) {
  const { id } = req.params;
  const exito = pedidosService.eliminarPedido(Number(id));
  if (exito) {
    res.status(200).json({ mensaje: 'Pedido eliminado correctamente' });
  } else {
    res.status(404).json({ mensaje: 'Pedido no encontrado' });
  }
}

function cierreDeVenta(req, res) {
  try {
    const resumen = pedidosService.cierreDeVenta();
    res.status(200).json({
      mensaje: 'Cierre de venta realizado exitosamente. El sistema se reiniciará.',
      resumen
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al realizar el cierre de venta.' });
  }
}

module.exports = { agregarPedido,cierreDeVenta, obtenerPedidos, obtenerPedidoPorId, marcarComoPagado, marcarComoEntregado, actualizarPedido, eliminarPedido };
