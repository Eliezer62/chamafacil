<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all(), 200);
    }


    public function show(string $uuid)
    {
        $user = User::find($uuid);
        if(is_null($user))
            return response("Não encontrado", 404);

        return response()->json($user, 200);
    }


    public function store(Request $request)
    {
        $validado = $request->validate([
            'name'=>'required|string|max:255',
            'email'=>'required|email|max:255',
            'password'=>'required|max:255|min:8',
            'departament_id'=>'',
            'group_id'=>''
        ]);

        $validado['password'] = Hash::make($validado['password']);

        $user = User::create($validado);

        return response()->json($user, 200);
    }


    public function update(Request $request, string $uuid)
    {
        $validado = $request->validate([
            'name'=>'string|max:255',
            'departament_id'=>'',
            'group_id'=>''
        ]);

        $user = User::find($uuid);
        if(is_null($user))
            return response('Não encontrado', 404);

        $user->update($validado);

        return response()->json($user, 200);
    }


    public function delete(string $uuid)
    {
        $user = User::find($uuid);
        if(!is_null($user))
            $user->delete();

        return response("Removido", 200);
    }


    public function alterarDepartamento(Request $request, string $uuid)
    {
        $user = User::find($uuid);
        if(is_null($user))
            return response("Não encontrado", 404);

        $validado = $request->validate(['departament_id'=>'required']);
        $user->update($validado);

        return response()->json($user, 200);
    }


    public function alterarGrupo(Request $request, string $uuid)
    {
        $user = User::find($uuid);
        if(is_null($user))
            return response("Não encontrado", 404);

        $validado = $request->validate(['group_id'=>'required']);
        $user->update($validado);

        return response()->json($user, 200);
    }
}
