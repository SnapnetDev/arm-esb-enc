<?php

namespace App\Console\Commands;

use App\Services\CrmService;
use Illuminate\Console\Command;

class LabCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lab:run';
    private $crmService = null;

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->crmService = new CrmService;
        $this->crmService->withClientID('d84a9014-710d-4a9d-8901-c26a4d2f2467')
        ->withClientSecret('Ray7Q~ApqKbF~U31hf0CbKqHvOgpWp5YCNd3z')
        ->withCrmPassword('New@2020')
        ->withCrmUsername('salescrmtest@coronationam.com')
        ->withCrmResource('coronation')
        ->withTenantID('d84a9014-710d-4a9d-8901-c26a4d2f2467');
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->crmService->loadToken();
        $this->info($this->crmService->getToken());

        return 0;
    }
}
