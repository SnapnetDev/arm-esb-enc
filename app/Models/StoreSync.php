<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoreSync extends Model
{
    use HasFactory;
    protected $fillable = ['name','table_id','store_id',
    'frequency_time','status'];

    protected $with = ['store','tableObject'];

    function tableObject(){
        return $this->belongsTo(Table::class,'table_id');
    }

    function store(){
        return $this->belongsTo(Store::class,'store_id');
    }

    // $table->string('name')->nullable();
    // $table->integer('table_id')->nullable();
    // $table->integer('store_id')->nullable();
    // $table->integer('chunk_size')->default(500);
    // $table->string('direction')->nullable();
    // $table->longText('field_map')->nullable();
    // $table->integer('frequency_time')->nullable();
    // $table->integer('status')->nullable();
    // $table->integer('recurring')->nullable();
    // $table->string('start_date_time')->nullable();

}
