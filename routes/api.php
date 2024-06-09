<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//Rotas para departamento
Route::prefix('/departament')
    ->group(function(){
        Route::get('/', [DepartamentController::class, 'index'])
            ->name('index');

        Route::get('/{uuid}', [DepartamentController::class, 'show'])
            ->name('show');

        Route::put('/{uuid}', [DepartamentController::class, 'update'])
            ->name('update');

        Route::get('/{uuid}', [DepartamentController::class, 'getUsers'])
            ->name('users');
    })
    ->name('departament.');


//Rotas para grupos
Route::prefix('/group')
    ->group(function(){
        Route::get('/', [GroupController::class, 'index'])
            ->name('index');

        Route::get('/{uuid}', [GroupController::class, 'show'])
            ->name('show');

        Route::get('/{uuid}/users', [GroupController::class, 'getUsers'])
            ->name('users');

    })->name('group.');


Route::prefix('/chamado')
    ->group(function(){
        Route::get('/', [ChamadoController::class, 'index'])
            ->name('index');
        
        Route::get('/{uuid}', [ChamadoController::class, 'show'])
            ->name('show');
        
        Route::post('/', [ChamadoController::class, 'store'])
            ->name('store');

        //Para o chamado atender um suporte
        Route::post('/{uuid}/atender', [ChamadoController::class, 'atenderChamado'])
            ->name('atender');

        /**
         * Rotas para alterar dados do chamado
         * que não podem ser alterados via campo
         */
        Route::prefix('/{uuid}/alterar')
            ->group(function(){
                //Altera o departamento do chamado
                Route::post('/departament', [ChamadoController::class, 'alterarDepartamento'])
                    ->name('departamento');
            })->name('alterar.');
    })->name('chamado.');