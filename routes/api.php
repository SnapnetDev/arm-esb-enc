<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\ApiSyncController;
use App\Http\Controllers\AssetManagementApiController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CredentialController;
use App\Http\Controllers\InsuranceApiController;
use App\Http\Controllers\PutEntityController;
use App\Http\Controllers\SecuritiesApiController;
// use App\Http\Controllers\CrmCredentialController;
// use App\Http\Controllers\EndpointController;
// use App\Http\Controllers\EntityController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\StoreSyncController;
// use App\Http\Controllers\SyncController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\TableSyncController;
use App\Http\Controllers\TrusteesApiController;
use App\Http\Controllers\UserController;
// use App\Models\ApiSync;
// use App\Models\CrmEntity;
// use App\Models\CrmSync;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


///Api Collections
Route::resource('user', UserController::class);
Route::resource('credential', CredentialController::class);
// Route::resource('crm-credential', CrmCredentialController::class);
// Route::resource('crm-entity', CrmEntity::class);
// Route::resource('crm-sync', CrmSync::class);
Route::resource('api', ApiController::class);
Route::resource('api-sync', ApiSyncController::class);
Route::resource('store-sync', StoreSyncController::class);
Route::resource('table-sync', TableSyncController::class);
// Route::resource('entity', EntityController::class);
Route::resource('store', StoreController::class);
// Route::resource('sync', SyncController::class);
Route::post('login',[UserController::class,'login']);
Route::resource('category', CategoryController::class);
Route::resource('table', TableController::class);

Route::get('api-run/{id}',[ApiController::class,'runApi']);

Route::resource('put-entity', PutEntityController::class);

Route::resource('asset-management', AssetManagementApiController::class);
Route::resource('trustees', TrusteesApiController::class);
Route::resource('securities', SecuritiesApiController::class);
Route::resource('insurance', InsuranceApiController::class);

//TrusteesApiController

//AssetManagementApiController

