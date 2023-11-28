<?php

session_start();
if (!$_SESSION['login']) {
    header("Location: /login");
}
?>

<nav class="navbar bg-dark">
    <div class="container-fluid">
        <a href="/" class="navbar-brand fw-bold text-light">CRUD Clientes</a>
        <button type="button" class="btn btn-success" id="btnAgregar">&plus; Agregar Cliente</button>
        <form action="/logout" method="post">
        <button type="submit" class="btn btn-danger" id="btnAgregar">Cerrar Sesión</button>
    </form>
    </div>
    
</nav>
<div class="container my-5">
    <!-- Buscar Clientes por Coincidencia de nombre o correo -->
    <form class="d-flex py-4" method="post">
        <input type="search" id="buscar" placeholder="Buscar cliente por nombre o correo" class="form-control me-2" />
    </form>
    <!-- <div id="mostrarClientes"></div> -->
    <!-- Agregar o Modificar Cliente -->
    <form class="py-4" method="post" id="form">
        <h2 id="formTitle"></h2>
        <p class="bg-danger text-white p-2 rounded-3 text-uppercase fw-bold" id="alertaCliente"></p>
        <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" class="form-control" id="nombre" name="nombre">
        </div>
        <div class="form-group">
            <label for="apellido">Apellido</label>
            <input type="text" class="form-control" id="apellido" name="apellido">
        </div>
        <div class="form-group">
            <label for="domicilio">Domicilio</label>
            <input type="text" class="form-control" id="domicilio" name="domicilio">
        </div>
        <div class="form-group">
            <label for="correo">Correo</label>
            <input type="email" class="form-control" id="correo" name="correo">
        </div>
        <input type="hidden" id="id" name="id">
        <div class="py-2">
            <button type="submit" class="btn btn-success" id="btnAddUpd"></button>
            <button type="button" class="btn btn-danger" id="btnCancelar">Cancelar</button>
        </div>
    </form>
    <!-- Muestra los clientes -->
    <table class="table table-bordered table-sm">
        <thead>
            <tr>
                <th class="text-center">ID</th>
                <th class="text-center">Nombre</th>
                <th class="text-center">Apellido</th>
                <th class="text-center">Domicilio</th>
                <th class="text-center">Correo</th>
                <th class="text-center">Acciones</th>
            </tr>
        </thead>
        <tbody id="clientes"></tbody>
    </table>
</div>