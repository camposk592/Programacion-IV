Vue.component('v-select-matricula',VueSelect.VueSelect);
Vue.component('inscripcion',{
    data:()=>{
        return {
            buscar:'',
            inscripcions:[],
            matriculas:[],
            inscripcion:{
                accion : 'nuevo',
                mostrar_msg : false,
                msg : '',
                matricula: {
                    id: '',
                    label: '',
                },
                idInscripcion : '',
                codigo: '',
                materia_1: '',
                materia_2: '',
                materia_3: '',
                materia_4: '',
                materia_5: '',
                fecha : '',
            }
        }
    },
    methods:{
        buscandoInscripcion(){
            this.obtenerInscripcions(this.buscar);
        },
        eliminarInscripcion(inscripcion){
            if( confirm(`Esta seguro de eliminar el inscripcion ${inscripcion.nombre}?`) ){
                this.inscripcion.accion = 'eliminar';
                this.inscripcion.idInscripcion = inscripcion.idInscripcion;
                this.guardarInscripcion();
            }
            this.nuevoInscripcion();
        },
        modificarInscripcion(datos){
            this.inscripcion = JSON.parse(JSON.stringify(datos));
            this.inscripcion.accion = 'modificar';
        },
        guardarInscripcion(){
            this.obtenerInscripcions();
            let inscripcions = JSON.parse(localStorage.getItem('inscripcions')) || [];
            if(this.inscripcion.accion=="nuevo"){
                this.inscripcion.idInscripcion = generarIdUnicoFecha();
                inscripcions.push(this.inscripcion);
            } else if(this.inscripcion.accion=="modificar"){
                let index = inscripcions.findIndex(inscripcion=>inscripcion.idInscripcion==this.inscripcion.idInscripcion);
                inscripcions[index] = this.inscripcion;
            } else if( this.inscripcion.accion=="eliminar" ){
                let index = inscripcions.findIndex(inscripcion=>inscripcion.idInscripcion==this.inscripcion.idInscripcion);
                inscripcions.splice(index,1);
            }
            localStorage.setItem('inscripcions', JSON.stringify(inscripcions));
            this.nuevoInscripcion();
            this.obtenerInscripcions();
            this.inscripcion.msg = 'Inscripcion procesado con exito';
        },
        //Mostrar datos 
        obtenerInscripcions(valor=''){
            this.inscripcions = [];
            let inscripcions = JSON.parse(localStorage.getItem('inscripcions')) || [];
            this.inscripcions = inscripcions.filter(inscripcion=>inscripcion.codigo.toLowerCase().indexOf(valor.toLowerCase())>-1);
             
            //aqui vemos las matriculas  
            this.matriculas = [];
            let matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
            this.matriculas = matriculas.map(matricula=>{
                return {
                    id: matricula.idMatricula,
                    label: matricula.ciclo,
                }
            });
        },
        nuevoInscripcion(){
            this.inscripcion.accion = 'nuevo';
            this.inscripcion.msg = '';
            this.inscripcion.idInscripcion = '';
            this.inscripcion.codigo = '';
            this.inscripcion.materia_1 = '';
            this.inscripcion.materia_2 = '';
            this.inscripcion.materia_3 = '';
            this.inscripcion.materia_4 = '';
            this.inscripcion.materia_5 = '';
            this.inscripcion.fecha = '';
            this.inscripcion.matricula ='';
        }
    },
    created(){
        this.obtenerInscripcions();
    },
    template:`
        <div id="appCiente">
            <div class="card text-white" id="carInscripcion">
                <div class="card-header bg-primary">
                    Registro de Inscripcions
                    <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carInscripcion" aria-label="Close"></button>
                </div>
                <div class="card-body text-dark">
                    <form method="post" @submit.prevent="guardarInscripcion" @reset="nuevoInscripcion">
                        
                        <div class="row p-1">
                            <div class="col col-md-2">Codigo:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el codigo" v-model="inscripcion.codigo" pattern="[0-9]{3,10}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">
                                Ciclo:
                            </div>
                            <div class="col col-md-3">
                                <v-select-matricula v-model="inscripcion.matricula" 
                                    :options="matriculas" placeholder="Seleccione una matricula"/>
                            </div>
                        </div>
                        
                        <div class="row p-1">
                            <div class="col col-md-2">Materia 1:</div>
                            <div class="col col-md-3">
                                <input list="materia_1"v-model="inscripcion.materia_1">
                                <datalist id="materia_1">
                                    <option value="Programacion II">
                                    <option value="Programacion VI">
                                    <option value="Matematicas III">
                                    <option value="Matematicas I">
                                    <option value="Ingenieria de Software">
                                    <option value="Infraestructura Tecnologica">
                                    <option value="Principios de Electronica">
                                    <option value="Admon de Bases de Datos II">
                                    <option value="Formacion Transversal">
                                    <option value="Sistemas Operativos">
                                    <option value="Informatica y Sociedad">
                                </datalist>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Materia 2:</div>
                            <div class="col col-md-3">
                                <input list="materia_2"v-model="inscripcion.materia_2">
                                <datalist id="materia_2">
                                    <option value="Programacion II">
                                    <option value="Programacion VI">
                                    <option value="Matematicas III">
                                    <option value="Matematicas I">
                                    <option value="Ingenieria de Software">
                                    <option value="Infraestructura Tecnologica">
                                    <option value="Principios de Electronica">
                                    <option value="Admon de Bases de Datos II">
                                    <option value="Formacion Transversal">
                                    <option value="Sistemas Operativos">
                                    <option value="Informatica y Sociedad">
                                </datalist>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Materia 2:</div>
                            <div class="col col-md-3">
                                <input list="materia_3" v-model="inscripcion.materia_3">
                                <datalist id="materia_3">
                                    <option value="Programacion II">
                                    <option value="Programacion VI">
                                    <option value="Matematicas III">
                                    <option value="Matematicas I">
                                    <option value="Ingenieria de Software">
                                    <option value="Infraestructura Tecnologica">
                                    <option value="Principios de Electronica">
                                    <option value="Admon de Bases de Datos II">
                                    <option value="Formacion Transversal">
                                    <option value="Sistemas Operativos">
                                    <option value="Informatica y Sociedad">
                                </datalist>
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col col-md-2">Materia 4:</div>
                            <div class="col col-md-3">
                                <input list="materia_4" v-model="inscripcion.materia_4">
                                <datalist id="materia_4">
                                    <option value="Programacion II">
                                    <option value="Programacion VI">
                                    <option value="Matematicas III">
                                    <option value="Matematicas I">
                                    <option value="Ingenieria de Software">
                                    <option value="Infraestructura Tecnologica">
                                    <option value="Principios de Electronica">
                                    <option value="Admon de Bases de Datos II">
                                    <option value="Formacion Transversal">
                                    <option value="Sistemas Operativos">
                                    <option value="Informatica y Sociedad">
                                </datalist>
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col col-md-2">Materia 5:</div>
                            <div class="col col-md-3">
                                <input list="materia_5"v-model="inscripcion.materia_5">
                                <datalist id="materia_5">
                                    <option value="Programacion II">
                                    <option value="Programacion VI">
                                    <option value="Matematicas III">
                                    <option value="Matematicas I">
                                    <option value="Ingenieria de Software">
                                    <option value="Infraestructura Tecnologica">
                                    <option value="Principios de Electronica">
                                    <option value="Admon de Bases de Datos II">
                                    <option value="Formacion Transversal">
                                    <option value="Sistemas Operativos">
                                    <option value="Informatica y Sociedad">
                                </datalist>
                            </div>
                        </div>
                    
                        <div class="row p-1">
                            <div class="col col-md-2">Fecha de Inscripcion:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese la fecha" v-model="inscripcion.fecha" pattern="{0000-00-00}" required type="date" class="form-control form-control-sm">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-5 text-center">
                                <div v-if="inscripcion.mostrar_msg" class="alert alert-primary alert-dismissible fade show" role="alert">
                                    {{ inscripcion.msg }}
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
            <div class="card text-white" id="carBuscarInscripcion">
                <div class="card-header bg-primary">
                    Busqueda de Inscripcions
                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarInscripcion" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    Buscar: <input @keyup="buscandoInscripcion" v-model="buscar" placeholder="buscar aqui" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                                <th>CODIGO</th>
                                <th>MATERIA 1</th>
                                <th>MATERIA 2</th>
                                <th>MATERIA 3</th>
                                <th>MATERIA 4</th>
                                <th>MATERIA 5</th>
                                <th>FECHA</th>
                                <th>CICLO</th>
    
                                
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in inscripcions" @click='modificarInscripcion( item )' :key="item.idInscripcion">
                                <td>{{item.codigo}}</td>
                                <td>{{item.materia_1}}</td>
                                <td>{{item.materia_2}}</td>
                                <td>{{item.materia_3}}</td>
                                <td>{{item.materia_4}}</td>
                                <td>{{item.materia_5}}</td>
                                <td>{{item.fecha}}</td>
                                <td>{{item.matricula.label}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="eliminarInscripcion(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});