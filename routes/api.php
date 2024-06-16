<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Rotas para departamento
Route::prefix('/departament')
    ->group(function(){
        Route::get('/', [DepartamentController::class, 'index'])
            ->name('index');

        Route::post('/', [DepartamentController::class, 'store'])
            ->middleware('auth:api')
            ->name('store');

        Route::get('/{uuid}', [DepartamentController::class, 'show'])
            ->middleware('auth:api')
            ->name('show');

        Route::put('/{uuid}', [DepartamentController::class, 'update'])
            ->middleware('auth:api')
            ->name('update');
            
        Route::delete('/{uuid}', [DepartamentController::class, 'delete'])
            ->middleware('auth:api')
            ->name('delete');

        Route::get('/{uuid}', [DepartamentController::class, 'getUsers'])
            ->middleware('auth:api')
            ->name('users');
    })
    ->name('departament.');


//Rotas para grupos
Route::prefix('/group')
    ->group(function(){
        Route::get('/', [GroupController::class, 'index'])
            ->middleware('auth:api')
            ->name('index');

        Route::get('/{uuid}', [GroupController::class, 'show'])
            ->middleware('auth:api')
            ->name('show');

        Route::get('/{uuid}/users', [GroupController::class, 'getUsers'])
            ->middleware('auth:api')
            ->name('users');

    })->name('group.');


Route::prefix('/chamado')
    ->group(function(){
        Route::get('/', [ChamadoController::class, 'index'])
            ->middleware('auth:api')
            ->name('index');
        
        Route::get('/{uuid}', [ChamadoController::class, 'show'])
            ->middleware('auth:api')
            ->name('show');
        
        Route::post('/', [ChamadoController::class, 'store'])
            ->name('store');

        Route::put('/{uuid}', [ChamadoController::class, 'update'])
            ->middleware('auth:api')
            ->name('update');

        Route::delete('/{uuid}', [ChamadoController::class, 'delete'])
            ->middleware('auth:api')
            ->name('delete');

        //Para o chamado atender um suporte
        Route::post('/{uuid}/atender', [ChamadoController::class, 'atenderChamado'])
            ->middleware('auth:api')
            ->name('atender');

        /**
         * Rotas para alterar dados do chamado
         * que não podem ser alterados via campo
         */
        Route::prefix('/{uuid}/alterar')
            ->group(function(){
                //Altera o departamento do chamado
                Route::post('/departament', [ChamadoController::class, 'alterarDepartamento'])
                    ->middleware('auth:api')
                    ->name('departamento');
            })->name('alterar.');
    })->name('chamado.');


//Rotas para login

Route::prefix('/auth')
    ->group(function(){
        Route::post('/login', [AuthController::class, 'login'])
            ->name('login');

        Route::post('/register', [AuthController::class, 'register'])
            ->name('register');

        Route::post('/logout', [AuthController::class, 'logout'])
            ->middleware('auth:api')
            ->name('logout');

        Route::post('/refresh', [AuthController::class, 'refresh'])
            ->middleware('auth:api')
            ->name('refresh');

        Route::get('/check', [AuthController::class, 'check'])
            ->name('check');
    })
    ->name('auth.');

//Rotas para user

Route::prefix('/user')
    ->middleware(['auth:api'])
    ->group(function(){
        Route::get('/', [UserController::class,'index'])
        ->name('index');

        Route::get('/{uuid}', [UserController::class, 'show'])
        ->name('show');

        Route::post('/', [UserController::class, 'store'])
        ->name('store');

        Route::put('/{uuid}', [UserController::class, 'update'])
        ->name('update');

        Route::delete('/{uuid}', [UserController::class, 'delete'])
        ->name('delete');

        Route::prefix('/{uuid}/alterar')
            ->group(function(){
                Route::post('/departament', [UserController::class, 'alterarDepartamento'])
                    ->name('departament');

                Route::post('/group/', [UserController::class, 'alterarGrupo'])
                    ->name('gropo');
            })->name('alterar.');
    })->name('user.');


//Obtem as categorias do chamado
Route::prefix('/categoria')
    ->group(function(){
        Route::get('/', [CategoriaController::class, 'index'])
            ->name('index');
    })
    ->name('categoria');