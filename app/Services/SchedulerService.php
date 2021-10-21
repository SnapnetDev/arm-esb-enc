<?php 
namespace App\Services;

use Carbon\Carbon;

class SchedulerService{

   
    // $table->string('frequency_time')->nullable();
    // $table->integer('status')->nullable();
    // $table->integer('recurring')->nullable();
    // $table->string('start_date_time')->nullable();
    //frequency_shift

    public static function runSchedule($class,callable $callback){
      $records = $class::query()->where('status',1)->get();
      foreach ($records as $record){
          $frequency_time = $record->frequency_time;
          $recurring = $record->recurring;
          $start_date_time = $record->start_date_time;
          $frequency_shift = $record->frequency_shift;
          $now = Carbon::now();
          $then = Carbon::createFromTimeString($start_date_time);
          $secondsUsed = $then->diffInSeconds($now);
          $totalSecondsRequired = $frequency_time * $frequency_shift;
          if ($secondsUsed >= $totalSecondsRequired){
             $callback();
             if ($recurring == 1){
                $record->start_date_time = Carbon::now()->toDateString();
                $record->save();
             }
             if ($recurring == 0){
                $record->start_date_time = Carbon::now()->toDateString();
                $record->status = 0; //deactivate after running once
                $record->save();
             }
          }

      }
    }
     

}