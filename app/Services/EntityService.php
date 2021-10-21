<?php 
namespace App\Services;

use App\Models\Table;

class EntityService{
  
     
    static function getTableConfig($tableId){
        $record = Table::query()->find($tableId);
        $fields = $record->fields;
        $name = $record->name;
        $cls = '\\App\\Models\\' . $name;
        $obj = new $cls;
        $fields = explode('',$fields);
        return [
            'fields'=>$fields,
            'obj'=>$obj
        ];
    }


    static function syncStoreToTable(){
        
    }


}