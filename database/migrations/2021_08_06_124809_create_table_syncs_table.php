<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableSyncsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('table_syncs', function (Blueprint $table) {
            $table->id();

            $table->string('name')->nullable();
            $table->integer('table_id')->nullable();
            $table->integer('api_id')->nullable();

            $table->string('tracker_name')->nullable();
            // $table->string('tracker_default_value')->nullable();
            $table->string('tracker_reset_value')->nullable();

            $table->integer('chunk_size')->default(500);
            $table->string('frequency_time')->nullable();
            $table->integer('status')->nullable();

            $table->string('error')->nullable();

            $table->timestamps();

        });
    }

    /**
     * 
     * getTracker
     * 
     **/

    /**
     * Reverse the migrations.
     *
     * @return void
     **/

    public function down()
    {
        Schema::dropIfExists('table_syncs');
    }
}
