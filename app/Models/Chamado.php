<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

use App\Models\User;
use App\Models\Categoria;

class Chamado extends Model
{
    use softDeletes, HasUuids;

    protected $primaryKey = 'id';
    protected $table = 'chamados';
    public $timestamps = true;

    protected $fillable = [
        'nome_solicitante',
        'email_solicitante',
        'telefone_solicitante',
        'assunto',
        'categoria_id',
        'prioridade',
        'descricao',
        'local',
        'horario_atendimento',
        'suporte_id',
        'departament_id'
    ];


    public function atendente()
    {
        return $this->belongsTo(User::class, 'suporte_id', 'id');
    }


    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'categoria_id', 'id');
    }
}
