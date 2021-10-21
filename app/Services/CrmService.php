<?php 

namespace App\Services;

class CrmService{

    private $tenantID = '';
    private $clientID = '';
    private $clientSecret = '';
    private $crmUsername = '';
    private $crmPassword = '';
    private $crmResource = '';
    private $token = '';
    private $entitylistData = [];
    private $input = [];
    private $entity = '';


    function withTenantID($tenantID){
      $this->tenantID = $tenantID;
      return $this;
    }

    function withEntity($entity){
        $this->entity = $entity;
        return $this;
    }
 
    function withClientID($clientID){
      $this->clientID = $clientID;
      return $this;
    }
 
    function withClientSecret($clientSecret){
      $this->clientSecret = $clientSecret;
      return $this;
    }
 
    function withCrmUsername($crmUsername){
      $this->crmUsername = $crmUsername;
      return $this;
    }
 
    function withCrmPassword($crmPassword){
      $this->crmPassword = $crmPassword;
      return $this;
    }
 
    function withCrmResource($crmResource){
      $this->crmResource = $crmResource;
      return $this;
    }
 
 
    function loadToken(){
        $curl = curl_init();
        $headers = ['Host: login.microsoftonline.com'];
        $headers[] = 'Content-Type: application/x-www-form-urlencoded';

        $headers[] = "Accept:application/json; charset=utf-8";
        $headers[] = "OData-MaxVersion:4.0";
        $headers[] = "OData-Version:4.0";

        $body = [            
            'client_id'=>$this->clientID,
            'client_secret'=>$this->clientSecret,
            'username'=>$this->crmUsername,
            'password'=>$this->crmPassword,
            'grant_type'=>'password',
            'resource'=>'https://' . $this->crmResource . '.crm4.dynamics.com/'
        ];

        // dd($body);


        $curlConfig = [];
        $curlConfig[CURLOPT_URL] = 'https://login.microsoftonline.com/' . $this->tenantID . '/oauth2/token';
        $curlConfig[CURLOPT_RETURNTRANSFER] = true;
        $curlConfig[CURLOPT_ENCODING] = '';
        $curlConfig[CURLOPT_MAXREDIRS] = 10;
        $curlConfig[CURLOPT_TIMEOUT] = 0;
        $curlConfig[CURLOPT_FOLLOWLOCATION] = true;
        $curlConfig[CURLOPT_HTTP_VERSION] = CURL_HTTP_VERSION_1_1;
        $curlConfig[CURLOPT_CUSTOMREQUEST] = 'POST';
        if (!empty($body)){
            foreach ($body as $k=>$v){
                $postFields[] = "$k=$v";
            }
            $postFields = implode('&', $postFields);

            $curlConfig[CURLOPT_POSTFIELDS] = $postFields;
        }
        $curlConfig[CURLOPT_HTTPHEADER] = $headers;

        curl_setopt_array($curl, $curlConfig);

        $response = curl_exec($curl);
        // dd($response);

        curl_close($curl);

        $response = json_decode($response,$assoc=true);
        // dd($response);
        $this->token = 'invalid_token';
        if (isset($response['access_token'])){
            $this->token = $response['access_token'];
            // return $response['access_token'];
        }
        // return 'invalid_token';
        return $this;
    }
    
    function getToken(){
      return $this->token;
    }

 
 
    function fetchEntity($filters='',$size=11){
        $entity = $this->entity;
        if (!empty($filters)){
            $filters = '?$filter=' . urlencode($filters);
          }
          $token = $this->token;
  
          $url = "https://" . $this->crmResource . ".crm4.dynamics.com/api/data/v9.1/$entity$filters";
          $url = trim($url);
          // $url = urlencode($url);
  
          // echo $url;
  
                  $curl = curl_init();
                  $headers[] = 'Content-Type: application/json; charset=utf-8';
  
                  $headers[] = "Accept:application/json";
                  $headers[] = "OData-MaxVersion:4.0";
                  $headers[] = "OData-Version:4.0";
                  $headers[] = "Authorization:Bearer " . $token;
                  // $headers[] = "OData-Version:4.0";
                  $headers[] = "Prefer:odata.include-annotations=\"*\",odata.maxpagesize=" . $size;
  
                  $curlConfig = [];
                  $curlConfig[CURLOPT_URL] = $url;
                  $curlConfig[CURLOPT_RETURNTRANSFER] = true;
                  $curlConfig[CURLOPT_ENCODING] = '';
                  $curlConfig[CURLOPT_MAXREDIRS] = 10;
                  $curlConfig[CURLOPT_TIMEOUT] = 0;
                  $curlConfig[CURLOPT_FOLLOWLOCATION] = true;
                  $curlConfig[CURLOPT_HTTP_VERSION] = CURL_HTTP_VERSION_1_1;
                  $curlConfig[CURLOPT_CUSTOMREQUEST] = 'GET';
                  $curlConfig[CURLOPT_HTTPHEADER] = $headers;
  
                  curl_setopt_array($curl, $curlConfig);
  
                  $response = curl_exec($curl);
  
                  // dd($response,$headers);
  
                  curl_close($curl);
  
                  $response = json_decode($response,$assoc=true);
  
                  // dd($response);

                  $this->entitylistData = $response['value'];
  
                //   return ["data"=>$response['value']];
                return $this;
    }
 
    function entityList(){
      return $this->entitylistData;
    }
 
    function withInputData($input=[]){
        $this->input = $input;
        return $this;
    }
 
    function store(){
        $entity = $this->entity;
        $body = $this->input;
        $url = "https://" . $this->crmResource . ".crm4.dynamics.com/api/data/v9.1/$entity";

        $curl = curl_init();
        $headers[] = 'Content-Type: application/json; charset=utf-8';

        $headers[] = "Accept:application/json; charset=utf-8";
        $headers[] = "OData-MaxVersion:4.0";
        $headers[] = "OData-Version:4.0";
        $headers[] = "Authorization:Bearer " . $this->token;

        $curlConfig = [];
        $curlConfig[CURLOPT_URL] = $url;
        $curlConfig[CURLOPT_RETURNTRANSFER] = true;
        $curlConfig[CURLOPT_ENCODING] = '';
        $curlConfig[CURLOPT_MAXREDIRS] = 10;
        $curlConfig[CURLOPT_TIMEOUT] = 0;
        $curlConfig[CURLOPT_FOLLOWLOCATION] = true;
        $curlConfig[CURLOPT_HTTP_VERSION] = CURL_HTTP_VERSION_1_1;
        $curlConfig[CURLOPT_CUSTOMREQUEST] = 'POST';
        if (!empty($body)){
            $postFields = json_encode($body); // implode('&', $postFields);
            $curlConfig[CURLOPT_POSTFIELDS] = $postFields;
            // echo $postFields;
        }
        $curlConfig[CURLOPT_HTTPHEADER] = $headers;


        curl_setopt_array($curl, $curlConfig);

        $response = curl_exec($curl);

        curl_close($curl);
//
    //    echo $response;
//        echo $response . ' For ' . $url . ' Marking the end.';

        $response = json_decode($response,$assoc=true);
        if ($response){
          return $response;
        }

        return [
            'message'=>'New entry created successfully',
            'error'=>false
        ];
    } 
 
 

}