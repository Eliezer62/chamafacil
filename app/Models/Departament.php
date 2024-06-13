<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Departament extends Model
{
    use softDeletes, HasUuids;

    protected $primaryKey = 'id';
    protected $table = 'departaments';
    public $timestamps = true;

    protected $fillable = [
        'nome',
        'descricao'
    ];


    protected $hidden = [
        'created_at', 
        'updated_at',
        'deleted_at'
    ];


    public function users()
    {
        return $this->hasMany(User::class, 'departament_id', 'id');
    }
}
