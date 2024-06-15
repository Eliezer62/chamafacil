<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Departament;
use App\Models\User;

class DepartamentController extends Controller
{
    public function index()
    {
        return Departament::all();
    }


    public function show(string $uuid)
    {
        return Departament::find($uuid);
    }


    public function update(Request $request, string $uuid)
    {
        $validado = $request->validate(
            [
                'nome'=>'string|max:255',
                'descricao'=>'string|max:255'
            ]
            );
        $departamento = Departament::find($uuid);
        $departamento->update($validado);
        return $departamento;
    }


    public function getUsers(Departament $uuid)
    {
        return $uuid->users()->get();
    }


    public function store(Request $request)
    {
        $validado = $request->validate(
            [
                'nome'=>'string|max:255',
                'descricao'=>'string|max:255'
            ]
            );

        $departamento = Departament::create($validado);
        return $departamento;
    }


    public function delete(string $uuid)
    {
        $departamento = Departament::find($uuid);
        if(!is_null($departamento))
            $departamento->delete();
        return response('',200);
    }
}
