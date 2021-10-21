<?php 
namespace App\Services;

use App\Models\Table;
use Carbon\Carbon;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class TableService{

  ///new refined code..... 

     const TABLE_PREFIX = 'TBL_';

      static function insert($tableId,$content){
        $tableFields = self::getTableFields($tableId);
        $data = [];
        $uniqueField = self::getUniqueField($tableId);

        foreach ($tableFields as $field){
          $data[$field] = $content[$field];
        }
        $record = Table::query()->find($tableId);
        $tableName = self::TABLE_PREFIX . $record->name;
        if (!empty($uniqueField)){
            $check = DB::table($tableName)->where($uniqueField,$data[$uniqueField]);
            if (!$check->exists()){
              if (!isset($data['created_at'])){
                $date = Carbon::now()->toDateString();
                $data['created_at'] = $date;
                $data['updated_at'] = $date;
              }      
              DB::table($tableName)->insert($data);
              return;
            }
            $date = Carbon::now()->toDateString();
            // $data['created_at'] = $date;
            $data['updated_at'] = $date;  
            $check->update($data);
            return;
        }
        if (!isset($data['created_at'])){
          $date = Carbon::now()->toDateString();
          $data['created_at'] = $date;
          $data['updated_at'] = $date;
        }
        DB::table($tableName)->insert($data);
      }

      static function getUniqueField($tableId){
         $uniqueField = '';
         self::eachField($tableId,function($field,$type,$mod) use (&$uniqueField){
           if ($mod == 'unique'){
             $uniqueField = $field;
           }
         }); 
        return $uniqueField;                
      }

      static function eachField($tableId,callable $callback){
        $record = Table::query()->find($tableId);
        $fields = $record->fields;
        $fields = self::decodeFields($fields);
        // $r = [];
        foreach ($fields as $field=>$item){
            //$r[] = $field;
            $field = $item['field'];
            $type = $item['type'];
            $mod = $item['mod'];
            $callback($field,$type,$mod);
        }
      }

      static function getTableFields($tableId){
          $r = [];
          self::eachField($tableId,function($field,$type,$mod) use (&$r){
             $r[] = $field;
          });
          return $r;
      }
 
      static function decodeFields($fields){
        //   print_r(['<' . $fields . '>']);
          $r = explode(',',$fields);
          $fieldConfig = [];
          foreach ($r as $k=>$item){
            //   print_r($item);
             $list = explode(':',$item);
             if (count($list) <= 2){
               $list[] = 'none';
             }
              list($field,$type,$mod) = $list; // explode(':',$item); 
              $fieldConfig[$field] = [
                  'field'=>$field,
                  'type'=>$type,
                  'mod'=>$mod
              ];
          }
          return $fieldConfig;
      }

      static function createTableOnDb($name,$fields){
          $fieldConfig = self::decodeFields($fields);
          Schema::create(self::TABLE_PREFIX . $name,function(Blueprint $table) use ($fieldConfig){
              $table->id();
              foreach ($fieldConfig as $k=>$item){
                 $field = $item['field'];
                 $type = $item['type']; 
                 $table->$type($field)->nullable();
              }
              $table->timestamps();  
          });
      }

      static function addTableFieldsOnDb($name,$fields){
        $fieldConfig = self::decodeFields($fields);
        Schema::table(self::TABLE_PREFIX . $name,function(Blueprint $table) use ($fieldConfig){
            // $table->id();
            foreach ($fieldConfig as $k=>$item){
               $field = $item['field'];
               $type = $item['type']; 
               $table->$type($field)->nullable();
            }
            // $table->timestamps();  
        });
      }

      static function deductFields($fields,$fieldsDeduct){
          $fields = self::decodeFields($fields);
          $fieldsDeduct = self::decodeFields($fieldsDeduct);
          $newFields = [];
          foreach ($fields as $field=>$item){
            if (!isset($fieldsDeduct[$field])){
              $newFields[$field] = $item;
            }
          }
        $r = [];  
        foreach ($newFields as $field=>$item){
            $r[] = $item['field'] . ':' . $item['type'] . ':' . $item['mod'];
        }  
        return implode(',',$r);
      }

      static function addFields($fields,$fieldsAdd){
        $fields = self::decodeFields($fields);
        $fieldsAdd = self::decodeFields($fieldsAdd);
        $newFields = [];
        foreach ($fieldsAdd as $field=>$item){
           $fields[$field] = $item; 
        }
        $r = [];  
        foreach ($fields as $field=>$item){
            $r[] = $item['field'] . ':' . $item['type'] . ':' . $item['mod'];
        }  
        return implode(',',$r);
      }

      static function fieldExists($fields,$fieldsAdd){
        $fields = self::decodeFields($fields);
        $fieldsAdd = self::decodeFields($fieldsAdd);
        $found = false;
        foreach ($fieldsAdd as $field=>$item){
          if (isset($fields[$field])){
            $found = true;
          }
        }
       return $found;
      }

      static function removeTableFieldsOnDb($name,$fields){
        $fieldConfig = self::decodeFields($fields);
        Schema::table(self::TABLE_PREFIX . $name,function(Blueprint $table) use ($fieldConfig){
            // $table->id();
            foreach ($fieldConfig as $k=>$item){
               $field = $item['field'];
               $type = $item['type']; 
               $table->dropColumn($field);
            }
            // $table->timestamps();  
        });
      }

      static function removeTable($name){
        Schema::dropIfExists(self::TABLE_PREFIX . $name);
      }

      
      static function getTableById($id){
        return Table::query()->find($id);
      }

      static function getLock($store){
        $r =  Storage::disk('public-stores')->get($store . '-lock.json');
        $r = json_decode($r,true);
        return $r;
      }

      static function locked($store){
         if (!self::lockExists($store)){
           self::unlock($store);
         }
        $r = self::getLock($store); 
        return $r['locked'] == 1;
      }

      static function lockExists($store){
        return Storage::disk('public-stores')->exists($store . '-lock.json');
      }

      static function lock($store){
        Storage::disk('public-stores')->put($store . '-lock.json',json_encode([
          'locked'=>1
        ]));
      }

      static function unlock($store){
        Storage::disk('public-stores')->put($store . '-lock.json',json_encode([
          'locked'=>0
        ]));
      }

      static function trackerExists($store){
        return Storage::disk('public-stores')->exists($store . '-tracker.json');
      }

      static function setTracker($store,$index){
        Storage::disk('public-stores')->put($store . '-tracker.json',json_encode([
          'index'=>$index
        ]));
      }

      static function getTracker($store){
        if (!self::trackerExists($store)){
          self::setTracker($store,0);
        }
        $r = Storage::disk('public-stores')->get($store . '-tracker.json');
        $r = json_decode($r,true);
        return $r['index'];
      }

      static function debug($store,$data){
        Storage::disk('public-stores')->put($store . '-debug.json',json_encode([
          'index'=>$data
        ]));
      }

      static function chunk($tableId,$chunk,$storeName,callable $callback){
        if (self::locked($storeName)){
          return;
        }
        self::lock($storeName);

        $startId = self::getTracker($storeName);
        self::debug($storeName,$startId);
        $table = self::getTableById($tableId);
        self::debug($storeName,$table);
        $tableName = self::TABLE_PREFIX . $table->name;
        // dd($tableName);
        self::debug($storeName,$tableName);
        DB::table($tableName)->where('id','>',$startId)->orderBy('id','asc')->chunkById($chunk,function($collection) use ($callback,$storeName){
           foreach ($collection as $record){
              // dd($record);
              self::debug($storeName,$record);
              $callback($record);
              self::setTracker($storeName,$record->id);
           }
        });

        self::unlock($storeName);
      }

      // static function storeRecord($id,$record){
      //     $table = self::getTableById($id);
      //     $name = $table->name;

      // }

      static function getTableRecords($tableId,$limit=10,$skip=0){
        $table = self::getTableById($tableId);
        $tableName = self::TABLE_PREFIX . $table->name;
        return DB::table($tableName)->skip($skip)->take($limit)->get();
      }

      static function getTableRecordCount($tableId){
        $table = self::getTableById($tableId);
        $tableName = self::TABLE_PREFIX . $table->name;
        return DB::table($tableName)->count();
      }

      static function getSchemaWithData($tableId,$limit=10,$skip=0){
        $fields = self::getTableFields($tableId);
        $records = self::getTableRecords($tableId,$limit,$skip);
        $count = self::getTableRecordCount($tableId);
        return [
          'fields'=>$fields,
          'records'=>$records,
          'count'=>$count
        ];
      }

}
