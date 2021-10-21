<?php 
namespace App\Services;

use App\Models\Store;
use Illuminate\Support\Facades\Storage;

class StoreService{
  
    const API_STORE_SYNC_KEY = 'api-store-sync-key';
    const TABLE_STORE_SYNC_KEY = 'table-store-sync-key';

     
    static function saveToStore($storeKey,$contents){
         $contents = json_encode($contents);
         Storage::disk('public-stores')->put(self::API_STORE_SYNC_KEY . $storeKey,$contents);
    }

    static function getFromStore($storeKey){
        return Storage::disk('public-stores')->get(self::API_STORE_SYNC_KEY . $storeKey);
    }

    static function getStoreContentById($id){
        $record = Store::query()->find($id);
        return self::getFromStore($record->name);
    }

    static function saveToStoreById($storeId,$contents){
        $storeRecord = Store::query()->find($storeId);
        $name = $storeRecord->name;
        self::saveToStore($name,$contents);
    }

    ////////Refined code///////

    static function getDisk(){
       return Storage::disk('public-stores'); 
    }

    static function getById($id){
        return Store::query()->find($id);
    }

    static function writeToStore($id,$content){
        $name = self::getById($id)->name;
        self::getDisk()->put($name . '-store',$content);
    }

    static function readFromStore($id){
      $name = self::getById($id)->name;
    //   dd($name);
      return json_decode(self::getDisk()->get($name . '-store'),true); 
    }


}