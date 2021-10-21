<?php 
namespace App\Services;

use App\Models\ApiSync;
use App\Models\Store;
use Illuminate\Console\Scheduling\Schedule;

class ApiSyncService{


    static function eachSyncIn(callable $callback){
       $collection = ApiSync::query()->where('status','1')->where('direction','in')->get();
       foreach ($collection as $k=>$item){
           $callback($item);
       }
    }

    static function eachSyncOut(callable $callback){
        $collection = ApiSync::query()->where('status','1')->where('direction','out')->get();
        foreach ($collection as $k=>$item){
            $callback($item);
        }
     }
 

    static function syncApiFacadeIn(Schedule $schedule){

        self::eachSyncIn(function($item) use ($schedule){

            $apiId = $item->api_id;
            $storeId = $item->store_id;
            $frequency = $item->frequency_time;
            $response = CurlService::runApi($apiId);
            $response = $response['response'];
            
            $schedule->call(function() use ($storeId,$response){
              StoreService::saveToStoreById($storeId,$response);
            })->$frequency()->withoutOverlapping();  
  
        });

    }




    static function syncApiFacadeOut(Schedule $schedule){

        self::eachSyncOut(function($item) use ($schedule){

            $apiId = $item->api_id;
            $storeId = $item->store_id;
            $frequency = $item->frequency_time;
            
            $schedule->call(function() use ($storeId,$apiId){

                $storeContent = StoreService::getStoreContentById($storeId);
                $storeContent = json_decode($storeContent,true);
                foreach ($storeContent as $input){
                  $response = CurlService::runApi($apiId,$input);
                }
              
            })->$frequency();  
  
        });

    }


    ///new refined codebase//////

    static function eachValidSyncRecords(callable $callback){
        $collection = ApiSync::query()->where('status','1')->get();
        foreach ($collection as $k=>$item){
            $callback($k,$item);
        }
    }

    static function sync(Schedule $schedule){
       
       self::eachValidSyncRecords(function($key,$item) use ($schedule){
        $frequency = $item->frequency_time;           
        $schedule->call(function() use ($item){
          
          $api = ApiService::callApi($item->api_id);
          $pivot = $item->pivot;
          $response = $api['response'];
          if ($pivot != 'root'){
            $response = $response[$pivot];
          }
          StoreService::writeToStore($item->store_id,json_encode($response));
              
        })->name($item->name)->$frequency()->withoutOverlapping();

       });

    }

}