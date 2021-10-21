<?php 
namespace App\Services;

use Auth;

class UserService{
  

     static function login($username,$password){
         $check = Auth::attempt(['email' => $username, 'password' => $password]);
         $user = auth()->user();
         ApiAuthService::refreshTokenByUserId($user->id);
         $user = auth()->user();
         if ($check){
           return [
               'message'=>'Welcome:)',
               'error'=>false,
               'token'=>$user->access_token
           ];
         }
         return [
             'message'=>'Invalid login!',
             'error'=>true
         ];  
     }


}