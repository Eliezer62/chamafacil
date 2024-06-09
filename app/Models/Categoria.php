<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Categoria extends Model
{
    use softDeletes;

    protected $primaryKey = 'id';
    protected $table = 'categorias';
    public $timestamps = true;

    protected $fillable = [
        'nome'
    ];


    public function chamados()
    {
        return $this->hasMany(Chamado::class, 'id', 'categoria_id');
    }
}
