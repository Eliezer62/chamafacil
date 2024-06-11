<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;

//Para que o laravel não trate rotas WEB, apenas o React
Route::get( '/{path?}', function(){
    return view( 'app' );
} )->where('path', '.*');