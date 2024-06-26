<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Categoria extends Model
{

    protected $primaryKey = 'id';
    protected $table = 'categorias';
    public $timestamps = true;

    protected $fillable = [
        'nome'
    ];


    protected $hidden = [
        'created_at', 
        'updated_at',
        'deleted_at'
    ];


    public function chamados()
    {
        return $this->hasMany(Chamado::class, 'id', 'categoria_id');
    }
}
