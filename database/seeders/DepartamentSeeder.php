<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Departament;

class DepartamentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Departament::create([
            'nome'=>'Microinformática',
            'descricao'=>'Suporte em microinformática'
        ]);
        
        Departament::create([
            'nome'=>'Redes',
            'descricao'=>'Suporte em Redes, infraestrutura'
        ]);

        Departament::create([
            'nome'=>'Sistemas',
            'descricao'=>'Suporte em Sistemas de informação'
        ]);
    }
}
