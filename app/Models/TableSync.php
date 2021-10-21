<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TableSync extends Model
{
    use HasFactory;

    protected $fillable = ['name','table_id','api_id','tracker_name',
    'tracker_reset_value','chunk_size','frequency_time','status'];

    protected $with = ['api','tableObject'];

    function api(){
        return $this->belongsTo(Api::class,'api_id');
    }

    function tableObject(){
        return $this->belongsTo(Table::class,'table_id');
    }

}
