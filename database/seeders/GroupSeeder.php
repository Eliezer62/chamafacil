<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Group;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Group::create([
            'nome'=>'administrador',
            'descricao'=>'Administrador do Sistema'
        ]);


        Group::create([
            'nome'=>'suporte',
            'descricao'=>'Suporte'
        ]);


        Group::create([
            'nome'=>'operador',
            'descricao'=>'Operador de sistemas'
        ]);
    }
}
