<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoreSyncsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('store_syncs', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->integer('table_id')->nullable();
            $table->integer('store_id')->nullable();
            
            // $table->integer('tracker_name')->nullable();
            // $table->integer('tracker_default_value')->nullable();
            // $table->string('tracker_reset_value')->nullable();

            // $table->integer('chunk_size')->default(500);
            // $table->string('direction')->nullable();
            // $table->longText('field_map')->nullable();
            $table->string('frequency_time')->nullable();
            $table->integer('status')->nullable();
            $table->string('error')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('store_syncs');
    }
}
