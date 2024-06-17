<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chamado;

class ChamadoController extends Controller
{
    public function index()
    {
        return Chamado::with('categoria')
            ->with('departament')
            ->with('atendente')
            ->orderBy('created_at', 'DESC')
            ->get();
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


    public function update(Request $request, string $uuid)
    {
        $chamado = Chamado::find($uuid);
        if(is_null($chamado))
            return response('', 404);

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

        $chamado->update($validado);

        return response()->json($chamado, 200);
    }


    public function delete(string $uuid)
    {
        $chamado = Chamado::find($uuid);
        if(!is_null($chamado))
            $chamado->delete();

        return response('', 200);
    }


    public function atenderChamado(Request $request, string $uuid)
    {
        $chamado = Chamado::find($uuid);
        $chamado->update([
            'suporte_id'=>$request->input('suporte_id'),
            'status'=>'andamento'
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


    public function fecharChamado(string $uuid)
    {
        $chamado = Chamado::find($uuid);
        $chamado->update([
            'status'=>'fechado'
        ]);

        return response()->json('', 200);
    }
}
