const express = require('express');
const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://127.0.0.1:57125' // Cambia esto al dominio de tu frontend en producción
}));

const cajaController = require('./controllers/cajaController');
const pedidosController = require('./controllers/pedidosController');
const gastosController = require('./controllers/gastosController');
const ingresosController = require('./controllers/ingresosController');


//Rutas
//Caja
app.get('/caja', cajaController.verCaja);

//Pedidos
app.post('/pedido', pedidosController.agregarPedido); // Crear un nuevo pedido
app.put('/pedido/pagar/:id', pedidosController.marcarComoPagado); // Marcar un pedido como pagado
app.put('/pedido/entregar/:id', pedidosController.marcarComoEntregado); // Marcar un pedido como entregado
app.put('/pedido/actualizar/:id', pedidosController.actualizarPedido); // Actualizar un pedido
app.delete('/pedido/eliminar/:id', pedidosController.eliminarPedido); // Eliminar un pedido
app.get('/pedidos', pedidosController.obtenerPedidos); // Obtener todos los pedidos
app.get('/pedido/:id', pedidosController.obtenerPedidoPorId); // Obtener pedido por ID
app.post('/pedido/cierre', pedidosController.cierreDeVenta);


//Gastos
app.get('/gasto', gastosController.verGastos);
app.post('/gasto', gastosController.nuevoGasto);

//Ingresos
app.get('/ingreso', ingresosController.verIngresos);
app.post('/ingreso', ingresosController.nuevoIngreso);

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
