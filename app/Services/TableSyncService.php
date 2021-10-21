<?php 
namespace App\Services;

use App\Models\TableSync;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\Storage;

class TableSyncService{
 
    static function eachValidSync(callable $callable){
      $records = TableSync::query()->where('status',1)->get();
      foreach ($records as $k=>$v){
          $callable($k,$v);
      }
    }

    static function getTableSyncById($id){
        return TableSync::query()->find($id);
    }

    static function debug($store,$data){
        Storage::disk('public-stores')->put($store . '-debug.json',json_encode([
          'index1'=>$data
        ]));
      }



    static function sync(Schedule $schedule){
       self::eachValidSync(function($key,$record) use ($schedule){
           
           $frequency = $record->frequency_time;
           
           $schedule->call(function() use ($record){

            $storeName = $record->tracker_name;
            $chunk = $record->chunk_size;
            self::debug('relay-debug.json',$chunk);

            TableService::chunk($record->table_id,$chunk,$storeName,function($tableRecord) use ($record){
                
                self::debug('relay-debug',$tableRecord);

                $tableRecord = json_encode($tableRecord);
                $tableRecord = json_decode($tableRecord,true);

                // self::debug('relay-debug.json',$tableRecord->toArray());
              
                ApiService::callApi($record->api_id,$tableRecord);

            });
 

           })->name($record->name)->$frequency()->withoutOverlapping();
           
       });
    }


}