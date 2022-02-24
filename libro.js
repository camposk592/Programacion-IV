vue.component('v-select-autor',VueSelect.VueSelect)
Vue.component('libro',{
    data:()=>{
        return {
            buscar:'',
            libros:[],
            autor:[],
            libro:{
                accion : 'nuevo',
                mostrar_msg : false,
                msg : '',
                autor:{
                    id: '',
                    label: '',
                },
                idLibro : '',
                codigo: '',
                nombre: '',
                marca : '',
                precio: '',

            }
        }
    },
    methods:{
        buscandoLibro(){
            this.obtenerLibros(this.buscar);
        },
        eliminarLibro(libro){
            if( confirm(`Esta seguro de eliminar el libro ${libro.nombre}?`) ){
                this.libro.accion = 'eliminar';
                this.libro.idLibro = libro.idLibro;
                this.guardarLibro();
            }
            this.nuevoLibro();
        },
        modificarLibro(datos){
            this.libro = JSON.parse(JSON.stringify(datos));
            this.libro.accion = 'modificar';
        },
        guardarLibro(){
            this.obtenerLibros();
            let libros = JSON.parse(localStorage.getItem('libros')) || [];
            if(this.libro.accion=="nuevo"){
                this.libro.idLibro = generarIdUnicoFecha();
                libros.push(this.libro);
            } else if(this.libro.accion=="modificar"){
                let index = libros.findIndex(libro=>libro.idLibro==this.libro.idLibro);
                libros[index] = this.libro;
            } else if( this.libro.accion=="eliminar" ){
                let index = libros.findIndex(libro=>libro.idLibro==this.libro.idLibro);
                libros.splice(index,1);
            }
            localStorage.setItem('libros', JSON.stringify(libros));
            this.nuevoLibro();
            this.obtenerLibros();
            this.libro.msg = 'Libro procesado con exito';
        },
        obtenerLibros(valor=''){
            this.libros = [];
            let libros = JSON.parse(localStorage.getItem('libros')) || [];
            this.libros = libros.filter(libro=>libro.nombre.toLowerCase().indexOf(valor.toLowerCase())>-1);
       
            this.autor= [];
            let autor = JSON.parse(localStorage.getItem('autor')) || [];
            this.autor = autors.map(autor=>{
                return{
                    id: autor.idAutor,
                    label: autor.nombre,
                }
            });
        },
        nuevoLibro(){
            this.libro.accion = 'nuevo';
            this.libro.msg = '';
            this.libro.idLibro = '';
            this.libro.codigo = '';
            this.libro.nombre = '';
            this.libro.marca = '';
            this.libro.precio = '';
        }
    },
    created(){
        this.obtenerLibros();
    },
    template:`
        <div id="appCiente">
            <div class="card text-white" id="carLibro">
                <div class="card-header bg-primary">
                    Registro de Libros

                    <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carLibro" aria-label="Close"></button>
                </div>
                <div class="card-body text-dark">
                    <form method="post" @submit.prevent="guardarLibro" @reset="nuevoLibro">
                    <div class="row p-1">
                            <div class="col col-md-2">Codigo:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el codigo" v-model="libro.codigo" pattern="[0-9]{3,10}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Categoria:</div>
                            <div class="col col-md-2">
                                < v-select-autor v-model="libro.autor" :options="autors" pl">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Nombre:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el nombre" v-model="libro.nombre" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="text" class="form-control">
                            </div>
                            <div class="row p-1">
                            <div class="col col-md-2">Marca:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese la marca" v-model="libro.marca" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="text" class="form-control">
                            </div>
                            <div class="row p-1">
                            <div class="col col-md-2">Precio:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el precio" v-model="libro.precio" pattern="[0-9.]{1,10}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-5 text-center">
                                <div v-if="libro.mostrar_msg" class="alert alert-primary alert-dismissible fade show" role="alert">
                                    {{ libro.msg }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="row m-2">
                            <div class="col col-md-5 text-center">
                                <input class="btn btn-success" type="submit" value="Guardar">
                                <input class="btn btn-warning" type="reset" value="Nuevo">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card text-white" id="carBuscarLibro">
                <div class="card-header bg-primary">
                    Busqueda de Libros

                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarLibro" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    Buscar: <input @keyup="buscandoLibro" v-model="buscar" placeholder="buscar aqui" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                                <th>CODIGO</th>
                                <th>NOMBRE</th>
                                <th>MARCA</th>
                                <th>PRECIO</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in libros" @click='modificarLibro( item )' :key="item.idLibro">
                                <td>{{item.codigo}}</td>
                                <td>{{item.nombre}}</td>
                                <td>{{item.marca}}</td>
                                <td>{{item.precio}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="eliminarLibro(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});