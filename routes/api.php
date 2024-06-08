<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DepartamentController;

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
    })
    ->name('departament.');


//Rotas para grupos
Route::prefix('/group')
    ->group(function(){
        Route::get('/');

    })->name('group.');