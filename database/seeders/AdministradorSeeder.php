<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class AdministradorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name'=>'administrador',
            'email'=>'administrador@email.com',
            'group_id'=>'9c3f26c8-d4aa-460a-b626-5eafb552c080',
            'departament_id'=>'9c3f2715-eb4e-429a-aac5-1b9bc3cdaf4a',
            'password'=>Hash::make('administrador')
        ]);
    }
}
