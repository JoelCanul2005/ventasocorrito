const fs = require('fs');
const path = require('path');
const pedidosFilePath = path.join(__dirname, '../data/pedidos.json');
const cajaFilePath = path.join(__dirname, '../data/caja.json');

function getPedidos() {
  try {
    const pedidosData = fs.readFileSync(pedidosFilePath, 'utf-8');
    return JSON.parse(pedidosData);
  } catch (error) {
    console.error('Error al leer pedidos.json:', error);
    return [];
  }
}

function getPedidoById(id) {
  const pedidos = getPedidos();
  return pedidos.find(pedido => pedido.id === id);
}

function addPedido(pedido) {
  const pedidos = getPedidos();
  pedido.id = pedidos.length ? Math.max(...pedidos.map(p => p.id)) + 1 : 1; // Autoincrementa el ID
  pedidos.push(pedido);
  try {
    fs.writeFileSync(pedidosFilePath, JSON.stringify(pedidos, null, 2));
  } catch (error) {
    console.error('Error al escribir en pedidos.json:', error);
  }
}

function updatePedido(id, updatedPedido) {
  const pedidos = getPedidos();
  const index = pedidos.findIndex(p => p.id === id);
  if (index !== -1) {
    pedidos[index] = { ...pedidos[index], ...updatedPedido };
    try {
      fs.writeFileSync(pedidosFilePath, JSON.stringify(pedidos, null, 2));
    } catch (error) {
      console.error('Error al actualizar pedidos.json:', error);
    }
  }
}

function deletePedido(id) {
  const pedidos = getPedidos();
  const index = pedidos.findIndex(p => p.id === id);
  if (index !== -1) {
    const deletedPedido = pedidos.splice(index, 1)[0];
    try {
      fs.writeFileSync(pedidosFilePath, JSON.stringify(pedidos, null, 2));
      return deletedPedido;
    } catch (error) {
      console.error('Error al eliminar pedido en pedidos.json:', error);
      return null;
    }
  }
  return null;
}

function actualizarCaja(monto) {
  const caja = JSON.parse(fs.readFileSync(cajaFilePath, 'utf-8'));
  caja.total -= monto;
  caja.vendido -= monto;
  try {
    fs.writeFileSync(cajaFilePath, JSON.stringify(caja, null, 2));
  } catch (error) {
    console.error('Error al actualizar caja.json:', error);
  }
}

function clearPedidos() {
    try {
      fs.writeFileSync(pedidosFilePath, JSON.stringify([]));
      console.log('Pedidos eliminados exitosamente.');
    } catch (error) {
      console.error('Error al limpiar pedidos:', error.message);
    }
}

module.exports = { getPedidos, clearPedidos, getPedidoById, addPedido, updatePedido, deletePedido, actualizarCaja };
