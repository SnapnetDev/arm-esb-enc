<?php


namespace App\Services;

use App\Models\User;
use Carbon\Carbon;

class ApiAuthService
{

    const MAX_EXPIRATION_IN_MINUTES = 60;
    //access_token  , access_token_last_updated
    static function refreshTokenByUserId($userId){
        $record = User::query()->find($userId);
        $record->access_token_last_updated = Carbon::now();
        if (empty($record->access_token)){
            $record->access_token = md5(uniqid());
        }
        $record->save();    
        return $record->access_token;
    }

    static function refreshToken($token){
        $record = User::query()->where('access_token',$token);
        if (!$record->exists()){
            return false;
        }
        $record = $record->first();
        $record->access_token_last_updated = Carbon::now();
        if (empty($record->access_token)){
            $record->access_token = md5(uniqid());
        }
        $record->save();    
        return $record->access_token;
    }

    static function tokenIsExpired($token){
        $record = User::query()->where('access_token',$token);
        if (!$record->exists()){
            return true;
        }
        $record = $record->first();
        if (empty($record->access_token_last_updated)){
          return true;
        }
        $lastUpdated = Carbon::createFromTimeString($record->access_token_last_updated);
        $now = Carbon::now();
        $diffMinutes = $lastUpdated->diffInMinutes($now);
        if ($diffMinutes >= self::MAX_EXPIRATION_IN_MINUTES){
          return true; 
        }
        return false;
    }

    static function getBearerToken(){
        return request()->bearerToken();
    }


}