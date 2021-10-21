<?php

namespace App\Http\Middleware;

use App\Services\ApiAuthService;
use Closure;

class ApiGuardMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     * 
     * 
     */


    // $day1 = Carbon::now();
    // $oldTime = "2021-06-28 20:58:50";
    // $dateCalc = Carbon::createFromTimeString($oldTime);
    // $diff = $dateCalc->diffInMinutes($day1);
    // dd($day1->toDateTimeString(),$oldTime,$diff);
    //fields: access_token  , access_token_last_updated


    public function handle($request, Closure $next)
    {
        $token = ApiAuthService::getBearerToken();
        if (ApiAuthService::tokenIsExpired($token)){
           return response()->json([
               'message'=>'Token has expired!',
               'error'=>true
           ]);
        }
        ApiAuthService::refreshToken($token);
        
        return $next($request);
    }



    

}