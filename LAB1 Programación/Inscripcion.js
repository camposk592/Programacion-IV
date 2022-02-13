var db_sistema = openDatabase('dbsistema', '1.0', 'Sistema de Facturacion', 5 * 1024 * 1024);
if(!db_sistema){
    alert('Lo siento tu navegado NO soporta BD locales.');
}
var app = new Vue({
    el: '#appCliente',
    data: {
        clientes: [],
        buscar: '',
        cliente: {
            accion: 'nuevo',
            msg : '',
            idCliente: '',
            codigo: '',
            nombre: '',
            materia: '',
            materia_2: '',
            materia_3: '',
            materia_4: '',
            materia_5: '',
            fecha_i: '',
            
        },
    },
    methods: {
        buscarCliente(){
            /*if( this.buscar.trim().length>0 ){
                this.clientes = this.clientes.filter(item=>item.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>=0);
            } else {
                this.obtenerClientes();
            }*/
            this.obtenerClientes(this.buscar);
        },
        guardarCliente(){
            let sql = '',
                parametros = [];
            if(this.cliente.accion == 'nuevo'){
                sql = 'INSERT INTO inscripcion (codigo, nombre, materia, materia_2,materia_3,materia_4,materia_5, fecha_i) VALUES (?,?,?,?,?,?,?,?)';
                parametros = [this.cliente.codigo,this.cliente.nombre,this.cliente.materia,this.cliente.materia_2,this.cliente.materia_3,this.cliente.materia_4,this.cliente.materia_5,this.cliente.fecha_i];
            }else if(this.cliente.accion == 'modificar'){
                sql = 'UPDATE inscripcion SET codigo=?, nombre=?, materia=?, materia_2=?, materia_3=?, materia_4=?,materia_5=?,fecha_i=?,  WHERE idCliente=?';
                parametros = [this.cliente.codigo,this.cliente.nombre,this.cliente.materia,this.cliente.materia_2,this.cliente.materia_3,this.cliente.materia_4,this.cliente.materia_5,this.cliente.fecha_i,this.cliente.idCliente];
            }else if(this.cliente.accion == 'eliminar'){
                sql = 'DELETE FROM inscripcion WHERE idCliente=?';
                parametros = [this.cliente.idCliente];
            }
            db_sistema.transaction(tx=>{
                tx.executeSql(sql,
                    parametros,
                (tx, results)=>{
                    this.cliente.msg = 'Inscripcion con exito';
                    this.nuevoCliente();
                    this.obtenerClientes();
                },
                (tx, error)=>{
                    this.cliente.msg = `Error ${error.message}`;
                });
            });
        },
        modificarCliente(cliente){
            this.cliente = cliente;
            this.cliente.accion = 'modificar';
        },
        eliminarCliente(cliente){
            if( confirm(`¿Esta seguro de eliminar ${cliente.nombre}?`) ){
                this.cliente.idCliente = cliente.idCliente;
                this.cliente.accion = 'eliminar';
                this.guardarCliente();
            }
        },
        obtenerClientes(busqueda=''){
            db_sistema.transaction(tx=>{
                tx.executeSql(`SELECT * FROM inscripcion WHERE nombre like "%${busqueda}%" OR codigo like "%${busqueda}%"`, [], (tx, results)=>{
                    this.clientes = results.rows;
                    /*this.clientes = [];
                    for(let i=0; i<results.rows.length; i++){
                        this.clientes.push(results.rows.item(i));
                    }*/
                });
            });
        },
        nuevoCliente(){
            this.cliente.accion = 'nuevo';
            this.cliente.idCliente = '';
            this.cliente.codigo = '';
            this.cliente.nombre = '';
            this.cliente.materia = '';
            this.cliente.materia_2 = '';
            this.cliente.materia_3 = '';
            this.cliente.materia_4 = '';
            this.cliente.materia_5 = '';
            this.cliente.fecha_i = '';
           
        }
    },
    created(){
        db_sistema.transaction(tx=>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS inscripcion(idCliente INTEGER PRIMARY KEY AUTOINCREMENT, '+
                'codigo char(10), nombre char(75), materia TEXT, materia_2 TEXT, materia_3 TEXT ,materia_4 TEXT,materia_5 TEXT,fecha_i char(10))');
        }, err=>{
            console.log('Error al crear la tabla de clientes', err);
        });
        
        this.obtenerClientes();
    },


   
});