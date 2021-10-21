<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Validation\ValidationException;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    function validationErrors(ValidationException $ex){
        return [
            'message'=>'Validation Errors',
            'error'=>true,
            'errors'=>$ex->errors()
        ];
    }

    function resource($data){
        return [
            'message'=>'',
            'data'=>$data,
            'error'=>false
        ];
    }

    function success($message,$data=[]){
        return [
            'message'=>$message,
            'error'=>false,
            'data'=>$data
        ];
    }


    function error($message,$data=[]){
        return [
            'message'=>$message,
            'error'=>true,
            'data'=>$data
        ];
    }
    


}
