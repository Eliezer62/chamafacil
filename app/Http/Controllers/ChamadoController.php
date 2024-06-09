<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chamado;

class ChamadoController extends Controller
{
    public function index()
    {
        return Chamado::all();
    }


    public function show(string $uuid)
    {
        $chamado = Chamado::find($uuid);
        return $chamado;
    }


    public function store(Request $request)
    {
        $validado = $request->validate([
            'nome_solicitante'=>'required|max:255',
            'email_solicitante'=>'required|max:255|email',
            'telefone_solicitante'=>'required|max:15',
            'assunto'=>'required|max:255',
            'categoria_id'=>'required',
            'prioridade'=>'required',
            'descricao'=>'required',
            'local'=>'',
            'horario_atendimento'=>'',
            'suporte_id'=>'',
            'departament_id'=>'required'
        ]);

        $chamado = Chamado::create($validado);
        return $chamado;
    }


    public function atenderChamado(Request $request, string $uuid)
    {
        $chamado = Chamado::find($uuid);
        $chamado->update([
            'suporte_id'=>$request->input('suporte_id')
        ]);

        return $chamado;
    }


    public function alterarDepartamento(Request $request, string $uuid)
    {
        $chamado = Chamado::find($uuid);
        $chamado->update([
            'departament_id'=>$request->input('departament_id')
        ]);

        return $chamado;
    }
}
