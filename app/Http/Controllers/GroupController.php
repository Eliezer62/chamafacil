<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;
use App\Models\User;

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


    public function getUsers(string $uuid)
    {
        return User::where('group_id', $uuid)->get();
    }
}
