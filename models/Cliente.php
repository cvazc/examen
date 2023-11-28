<?php

namespace Model;

class Cliente extends ActiveRecord
{
    protected static $tabla = 'clientes';
    protected static $columnasDB = ['id','nombre','apellido','domicilio','correo'];

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->apellido = $args['apellido'] ?? '';
        $this->domicilio = $args['domicilio'] ?? '';
        $this->correo = $args['correo'] ?? '';
    }

}