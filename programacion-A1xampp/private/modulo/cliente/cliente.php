<?php 
include('../../db/DB.php');

class cliente{ 
    private $datos=[], $db;
    public $respuesta = ['msg'=> 'correcto'];
}
public function recibir_datos($cliente =''){
    $this->datos = json_decode($cliente,true);
}
private function validar_datos(){
    if (empt(trim($this->datos['codigo']))) {
        $this->respuesta['msg'] = 'Por favor ingrese el codigo';
    }
    if (empt(trim($this->datos['nombre']))) {
        $this->respuesta['msg'] = 'Por favor ingrese el nombre';
    }
    if (empt(trim($this->datos['direccion']))) {
        $this->respuesta['msg'] = 'Por favor ingrese el direccion';
    }
    if (empt(trim($this->datos['telefono']))) {
        $this->respuesta['msg'] = 'Por favor ingrese el telefono';
    }
    if (empt(trim($this->datos['dui']))) {
        $this->respuesta['msg'] = 'Por favor ingrese el dui';
    }
}
private function almacenar_datos(){
    
}
}
?>