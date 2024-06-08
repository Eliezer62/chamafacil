<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DepartamentController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('/departament')
    ->group(function(){
        Route::get('/', [DepartamentController::class, 'index']);
    })
    ->name('departament');
