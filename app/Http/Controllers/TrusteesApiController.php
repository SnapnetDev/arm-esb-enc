<?php

namespace App\Http\Controllers;

use App\Services\CrmService;
use Illuminate\Http\Request;

class TrusteesApiController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    private $crmService = null;

    function __construct()
    {

       // const TENANT_ID = 'ba130eca-3030-48e1-9089-c979293aeb70';
       // //085bc1c2-a423-43f6-b2d6-9599615606dc
       // const CLIENT_ID = '085bc1c2-a423-43f6-b2d6-9599615606dc';
       // //171b6b0b-3da3-4c7f-a6be-7a026c0fffbe
       // const CLIENT_SECRET = 'T7NS.dN6w7-GG~65MVvOeMt658_FNsc6M-';
       // //582667ed-f719-4a0e-8316-e35e3e0492df
       // const CRM_USERNAME = 'avd@snapnet.com.ng';// 'toheeb@snapnet.com.ng';
       // const CRM_PASSWORD = '@Credentials1'; // '1nf0rmation@12345';
       // const CRM_RESOURCE = 'https://snapnet.crm4.dynamics.com/';
   
       //  $this->crmService = new CrmService;
       //  $this->crmService->withClientID('085bc1c2-a423-43f6-b2d6-9599615606dc')
       //  ->withClientSecret('T7NS.dN6w7-GG~65MVvOeMt658_FNsc6M-')
       //  ->withCrmPassword('@Credentials1')
       //  ->withCrmUsername('avd@snapnet.com.ng')
       //  ->withCrmResource('snapnet')
       //  ->withTenantID('ba130eca-3030-48e1-9089-c979293aeb70');



        $this->crmService = new CrmService;
        $this->crmService->withClientID('dae35686-70ac-4db1-a882-3f66b083e78f')
        ->withClientSecret('Ray7Q~ApqKbF~U31hf0CbKqHvOgpWp5YCNd3z')
        ->withCrmPassword('New@2020')
        ->withCrmUsername('salescrmtest@coronationam.com')
        ->withCrmResource('coronationtrustees')
        ->withEntity('new_enquiryfromcontactuses')
        ->withTenantID('d84a9014-710d-4a9d-8901-c26a4d2f2467')
        ->loadToken();


    }


   public function index()
   {
       //
       $size = 11;
       $filters = '';
       if (request()->filled('size')){
          $size = request('size');   
       }
       if (request()->filled('filters')){
           $filters = request('filters');
       }
       return $this->crmService->fetchEntity($filters,$size)->entityList();
   }

   /**
    * Show the form for creating a new resource.
    *
    * @return \Illuminate\Http\Response
    */
   public function create()
   {
       //
   }

   /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
   public function store(Request $request)
   {
       //
       $this->crmService->withInputData($request->all())->loadToken();
       return $this->crmService->store();
   }

   /**
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
   public function show($id)
   {
       //
    //    $this->crmService->withEntity($id)->loadToken();
    //    return $this->crmService->fetchEntity()->entityList();
   }

   /**
    * Show the form for editing the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
   public function edit($id)
   {
       //
   }

   /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
   public function update(Request $request, $id)
   {
       //
    //    $this->crmService->withEntity($id)->withInputData($request->all())->loadToken();
       
    //    return $this->crmService->store();
   }

   /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
   public function destroy($id)
   {
       //
   }




}
