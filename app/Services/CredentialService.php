<?php 
namespace App\Services;

use App\Models\Credential;

class CredentialService{

  
    static function getCredentialById($id){
        return Credential::query()->find($id);
    }


}