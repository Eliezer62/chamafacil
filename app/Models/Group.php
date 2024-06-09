<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Group extends Model
{
    use SoftDeletes, HasUuids;

    protected $primaryKey = 'id';

    protected $table = 'groups';
    
    protected $fillable = [
        'nome',
        'descricao'
    ];


    public $timestamps = true;


    public function users()
    {
        return $this->hasMany(User::class, 'group_id', 'id');
    }
}
