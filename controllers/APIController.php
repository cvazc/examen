<?php

namespace Controllers;

use MVC\Router;
use Model\Cliente;

header('Access-Control-Allow-Origin: *');

class APIController
{
    public static function index(Router $router)
    {
        $router->render('dashboard/index', []);
    }

    public static function login(Router $router)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuario = $_POST['usuario'];
            $password = $_POST['password'];

            var_dump($_SESSION);
            if ($usuario == "root" && $password == "root") {
                session_start();
                $_SESSION['login'] = true;
                header('Location: http://localhost:3000/');
            } else {
                header('Location: http://localhost:3000/login');
            }
        }
        $router->render('dashboard/login', []);
    }

    public static function logout()
    {
        session_start();
        $_SESSION = [];
        header('Location: /login');
    }

    public static function clientes()
    {
        $clientes = Cliente::all();
        echo json_encode($clientes);
    }

    public static function agregar()
    {
        $cliente = new Cliente($_POST);
        $cliente->crear();
    }

    public static function actualizar()
    {
        $cliente = new Cliente($_POST);
        $cliente->actualizar();
    }

    public static function cliente()
    {
        $id = $_POST['id'];
        $cliente = Cliente::find($id);
        echo json_encode($cliente);
    }

    public static function eliminar()
    {
        $id = $_POST['id'];
        $id = filter_var($id, FILTER_VALIDATE_INT);
        if ($id) {
            $cliente = Cliente::find($id);
            $cliente->eliminar();
        }
    }

    public static function buscar()
    {
        $clientes = Cliente::buscarCliente("nombre", "correo", $_POST['buscar']);
        $json = array();
        while ($row = mysqli_fetch_array($clientes)) {
            $json[] = array(
                "id" => $row['id'],
                "nombre" => $row['nombre'],
                "apellido" => $row['apellido'],
                "domicilio" => $row['domicilio'],
                "correo" => $row['correo']
            );
        }
        $jsonString = json_encode($json);
        echo $jsonString;
    }
}
