<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;

class GroupController extends Controller
{
    public function index()
    {
        return Group::all();
    }


    public function show(string $uuid)
    {
        return Group::find($uuid);
    }
}
