<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
//         Id
// Credential_id
// token_api_id
// Url
// Method
// Payload

        Schema::create('apis', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->integer('category_id')->nullable();
            $table->text('description')->nullable();
            $table->integer('credential_id')->nullable();
            $table->integer('require_api_id')->nullable();
            // $table->integer('duplicate_check_api_id')->nullable();
            $table->string('duplicate_check_expression')->nullable();
            $table->string('url')->nullable();
            $table->string('url_preview')->nullable();

            $table->string('method')->nullable();
            $table->longText('payload')->nullable();
            $table->text('request')->nullable();
            $table->text('response')->nullable();
            $table->text('pivot_expression')->nullable();
            $table->text('response_type')->nullable(); ///json or text
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
        Schema::dropIfExists('apis');
    }
}
