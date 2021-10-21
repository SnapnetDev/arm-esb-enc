<?php

namespace App\Console;

use App\Services\ApiSyncService;
use App\Services\StoreSyncService;
use App\Services\TableService;
use App\Services\TableSyncService;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
        //handle IN Syncing... 
        // ApiSyncService::syncApiFacadeIn($schedule);

        ApiSyncService::sync($schedule);

        StoreSyncService::sync($schedule);

        TableSyncService::sync($schedule);

        // StoreSyncService::syncInFromStore($schedule);

    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
