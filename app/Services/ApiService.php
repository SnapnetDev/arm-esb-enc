<?php 
namespace App\Services;

use App\Models\Api;

class ApiService{


    static function getApiById($id){
        return Api::query()->find($id);
    }

    static function callApi($id,$input=[]){
        
        $api = self::getApiById($id)->toArray();


        $settings = $api;

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
          $api = self::callApi($apiId,$input);  
        //   if (!is_array($token)){
        //     $config[CURLOPT_HTTPHEADER][] = 'Authorization: Bearer ' . $token;
        //   }
        }

        //duplicate_check_expression
        // if (isset($settings['duplicate_check_expression']) && !empty($settings['duplicate_check_expression'])){
        //     $duplicate_check_expression = $settings['duplicate_check_expression'];
        //     eval($duplicate_check_expression);
        // }
        
        $toForm = function($body){
            foreach ($body as $k=>$v){
                $postFields[] = "$k=$v";
            }
            $postFields = implode('&', $postFields);
            return $postFields;
        };

        if (isset($settings['credential_id']) && !empty($settings['credential_id'])){
            
            // dd($settings['credential_id']);
            $credentialId = $settings['credential_id'];
            $credentialObj = CredentialService::getCredentialById($credentialId);  //self::getCredentialById($credentialId);
            $headers = $credentialObj->headers;
   
            eval($headers);

            // dd($headers);
            // $headers = explode(',',$headers); 
            $config[CURLOPT_HTTPHEADER] = $headers; // $settings['content_type']; 
        }

        $toJson = function() use ($curl){
            $response = curl_exec($curl);
            return json_decode($response,true); 
        };

        $toText = function() use ($curl){
            return curl_exec($curl);
            // return json_decode($response,true); 
        };

        $json = function($text){
           return json_encode($text);
        };

        if (isset($settings['payload'])){
            $payload = $settings['payload'];
            eval($payload);
            // $payload = json_encode($payload);  
            $config[CURLOPT_POSTFIELDS] = $payload; // $settings['payload']; //json_encoded
        }  

        curl_setopt_array($curl, $config);
    
        $response = [];

        if (isset($settings['expression'])){
          eval($settings['expression']);
        }

        // $response = '[]';
        // if (!isset($skip)){
        //     $response = curl_exec($curl);
        // }
        // $raw_response = $response;
        curl_close($curl);

        // if ($settings['response_type'] == 'json'){
        //     $response = json_decode($response,true);
        // }

        // dd($response);
    //    if (!isset($skip)){
    //     if (!empty($settings['pivot_expression'])){ //evaluate pivot expression
    //         eval($settings['pivot_expression']);
    //     }
    //    }        
        return [
            // 'raw_response'=>$raw_response,
            
            'response'=>$response
        ];


    }

    static function execApi($curl){
//expression
       
    }

    static function toForm($body){
        foreach ($body as $k=>$v){
            $postFields[] = "$k=$v";
        }
        $postFields = implode('&', $postFields);
        return $postFields;
    }

    static function toJson($body){
        return json_encode($body);
    }

    static function getPassportToken($str){
        $r = explode('Bearer',$str);
        return trim($r[1]);
    }


}