<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Departament;

class DepartamentController extends Controller
{
    public function index()
    {
        return Departament::all();
    }
}
