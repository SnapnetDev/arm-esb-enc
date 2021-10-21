<?php 
namespace App\Services;

use App\Models\Api;
use App\Models\Credential;

class CurlService{

  
     static function getResource($settings=[],$input=[]){
       
        $curl = curl_init();
        
        $url = $settings['url'];
        eval($url);
        
        $config = [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST=>$settings['method']
        ];


        if (!empty($settings['require_api_id'])){
          $apiId = $settings['require_api_id'];
        //   $apiObject = self::getApiById($apiId);
          $api = self::runApi($apiId,$input);
        //   if (!is_array($token)){
        //     $config[CURLOPT_HTTPHEADER][] = 'Authorization: Bearer ' . $token;
        //   }
        }

        //duplicate_check_expression
        if (isset($settings['duplicate_check_expression']) && !empty($settings['duplicate_check_expression'])){
            $duplicate_check_expression = $settings['duplicate_check_expression'];
            eval($duplicate_check_expression);
        }
        

        if (isset($settings['credential_id'])){
            $credentialId = $settings['credential_id'];
            $credentialObj = self::getCredentialById($credentialId);
            $headers = $credentialObj->headers;
            eval($headers);
            // $headers = explode(',',$headers); 
            $config[CURLOPT_HTTPHEADER] = $headers; // $settings['content_type']; 
         } 

        if (isset($settings['payload'])){
            $payload = $settings['payload'];
            eval($payload);
            $payload = json_encode($payload);  
            $config[CURLOPT_POSTFIELDS] = $payload; // $settings['payload']; //json_encoded
        }  

        curl_setopt_array($curl, $config);

        $response = '[]';
        if (!isset($skip)){
            $response = curl_exec($curl);
        }

        $raw_response = $response;

        curl_close($curl);

        if ($settings['response_type'] == 'json'){
            $response = json_decode($response,true);
        }

        // dd($response);
       if (!isset($skip)){
        if (!empty($settings['pivot_expression'])){ //evaluate pivot expression
            eval($settings['pivot_expression']);
        }
       }
        
        return [
            'raw_response'=>$raw_response,
            'response'=>$response
        ];
        
     }

     static function getPassportToken($str){
         $r = explode('Bearer',$str);
         return trim($r[1]);
     }


     static function getApiById($id){
         return Api::query()->find($id);
     }

     static function runApi($id,$input=[]){
         $obj = self::getApiById($id);
         return self::getResource($obj->toArray(),$input);
     }

     static function getCredentialById($id){
         return Credential::query()->find($id);
     }




}