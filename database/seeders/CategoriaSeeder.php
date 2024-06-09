<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categoria::create([
            'nome'=>'Problema',
        ]);

        Categoria::create([
            'nome'=>'Sugestão'
        ]);

        Categoria::create([
            'nome'=>'Solicitação'
        ]);

        Categoria::create([
            'nome'=>'Sugestão'
        ]);
    }
}
