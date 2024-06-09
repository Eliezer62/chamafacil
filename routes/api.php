<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Rotas para departamento
Route::prefix('/departament')
    ->group(function(){
        Route::get('/', [DepartamentController::class, 'index'])
            ->middleware('auth:api')
            ->name('index');

        Route::get('/{uuid}', [DepartamentController::class, 'show'])
            ->middleware('auth:api')
            ->name('show');

        Route::put('/{uuid}', [DepartamentController::class, 'update'])
            ->middleware('auth:api')
            ->name('update');

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
            ->middleware('auth:api')
            ->name('store');

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
            ->middleware('api:auth')
            ->name('logout');

        Route::post('/refresh', [AuthController::class, 'refresh'])
            ->middleware('api:auth')
            ->name('refresh');
    })
    ->name('auth.');

//Rotas para user

Route::group(
    [
    'prefix'=>'/user',
    'middleware'=>'api:auth'
    ], function(){
    Route::get('/')
    ->name('index');

    Route::get('/{uuid}')
    ->name('show');

    Route::post('/')
    ->name('store');

    Route::put('/{uuid}')
    ->name('edit');

    Route::delete('/{uuid}')
    ->name('delete');
})->name('user.');