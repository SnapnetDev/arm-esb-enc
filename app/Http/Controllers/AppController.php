<?php

namespace App\Http\Controllers;

use Facade\FlareClient\View;
use Illuminate\Http\Request;

class AppController extends Controller
{
    //
    function index()
    {
        return view('index');
    }
}
