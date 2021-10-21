<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApiSyncsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
//         Api_id
// Store_id
// Chunk_size (defaults to 500) out
// Pivot (defaults to root)
// Direction (in or out)
// Field_map (applies to out)
// Frequency_time (in seconds : minute (60), hour(60 * 60) or nightly (60 * 60 * 24))
// Status (0: off , 1: on)
// Recurring (0: false , 1: true)
// start_date_time

        Schema::create('api_syncs', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->integer('api_id')->nullable();
            $table->integer('store_id')->nullable();
            // $table->integer('chunk_size')->default(500);
            $table->string('pivot')->nullable();
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
        Schema::dropIfExists('api_syncs');
    }
}
