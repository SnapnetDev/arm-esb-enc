<?php 
namespace App\Services;

use App\Models\StoreSync;
use App\Models\Table;
use Illuminate\Console\Scheduling\Schedule;

class StoreSyncService{
   
   static function eachSync(callable $callback){
     $records = StoreSync::query()->where('status',1)->get();
     foreach ($records as $key=>$record){
         $callback($key,$record);
     }
   } 


  //  static function syncInFromStore(Schedule $schedule){
        
  //      self::eachSync(function($record) use ($schedule){

  //       $storeId = $record->store_id;
  //       $table_id = $record->table_id;
  //       $storeContent = StoreService::getStoreContentById($storeId);
  //       $method = $record->frequency_time;

  //       $schedule->call(function() use ($storeContent,$table_id){
  //         $storeContent = json_decode($storeContent,true);
  //         foreach ($storeContent as $content){
  //            TableService::insert($table_id,$content);
  //         }
  //       })->$method()->withoutOverlapping();

  //      });

  //  }


   static function sync(Schedule $schedule){
     self::eachSync(function($key,$item) use ($schedule){
        
       $frequency = $item->frequency_time;

       $schedule->call(function() use ($item){

        $store = StoreService::readFromStore($item->store_id);

        foreach ($store as $k=>$record){
           TableService::insert($item->table_id,$record);
        }

       })->name($item->name)->$frequency()->withoutOverlapping();

     });
   }

   


}