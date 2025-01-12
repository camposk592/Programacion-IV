<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::apiResources([
        'alumno'=>Alumnos::class,
        'docente'=>Docentes::class,
        'materia'=>Materias::class,
        'matricula'=>Matriculas::class,
        'inscripcion'=>Inscripciones::class,
        'nota'=>Notas::class,
]);


Route::get('/', function () {
    return view('welcome');
});
