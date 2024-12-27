const express = require('express');
const cajaController = require('../controllers/cajaController');
const pedidosController = require('../controllers/pedidosController');
const gastosController = require('../controllers/gastosController');
const ingresosController = require('../controllers/ingresosController');

const router = express.Router();

// Rutas de Caja
router.get('/caja', cajaController.getCaja);
router.post('/caja/ingresar', cajaController.ingresarDinero);

// Rutas de Pedidos
router.get('/pedidos', pedidosController.obtenerPedidos);
router.post('/pedidos', pedidosController.agregarPedido);
router.put('/pedidos/:id', pedidosController.editarPedido);
router.put('/pedidos/:id/pagado', pedidosController.marcarPagado);
router.put('/pedidos/:id/entregado', pedidosController.marcarEntregado);

// Rutas de Gastos
router.get('/gastos', gastosController.getGastos);
router.post('/gastos', gastosController.registrarGasto);

// Rutas de Ingresos
router.get('/ingresos', ingresosController.getIngresos);
router.post('/ingresos', ingresosController.registrarIngreso);

module.exports = router;
