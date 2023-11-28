<?php

require_once __DIR__ . '/../includes/app.php';

use MVC\Router;
use Controllers\APIController;

$router = new Router();

// Login
$router->get('/login', [APIController::class, 'login']);
$router->post('/login', [APIController::class, 'login']);
$router->post('/logout', [APIController::class, 'logout']);

// Dashboard
$router->get('/', [APIController::class, 'index']);
$router->get('/api/clientes', [APIController::class, 'clientes']);

$router->post('/api/buscar', [APIController::class, 'buscar']);
$router->post('/api/cliente', [APIController::class, 'cliente']);
$router->post('/api/agregar', [APIController::class, 'agregar']);
$router->post('/api/actualizar', [APIController::class, 'actualizar']);
$router->post('/api/eliminar', [APIController::class, 'eliminar']);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();
