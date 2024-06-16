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
            'group_id'=>'9c4c2699-4530-4a9f-ab57-4ca24d002f99',
            'departament_id'=>'9c4c265c-5217-4613-8883-a9eca5119c0d',
            'password'=>Hash::make('administrador')
        ]);
    }
}
