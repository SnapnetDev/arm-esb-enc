<?php

namespace App\Http\Controllers;

use App\Services\CrmService;
use Illuminate\Http\Request;

class InsuranceApiController extends Controller
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

    //    TENANT_ID=0d208db3-39f6-4f17-b3f4-89883d314820
    //    CLIENT_ID=67e220a1-53ac-4f0d-9936-184d960bf126
    //    ORG_URL=https://coronationsinsurance.crm4.dynamics.com/
    //    CLIENT_SECRET=NA18vZw-LRP_4wG7r_k0~7YhoW.0yGxl3a
    //    CRM_USERNAME=snapnet@coronationinsurance.com.ng
    //    CRM_PASSWORD="P@ssword55"
    //    CRM_RESOURCE="https://coronationsinsurance.crm4.dynamics.com/"
       

        $this->crmService = new CrmService;
        $this->crmService->withClientID('67e220a1-53ac-4f0d-9936-184d960bf126')
        ->withClientSecret('NA18vZw-LRP_4wG7r_k0~7YhoW.0yGxl3a')
        ->withCrmPassword('P@ssword55')
        ->withCrmUsername('snapnet@coronationinsurance.com.ng')
        ->withCrmResource('coronationsinsurance')
        ->withEntity('new_enquiries')
        ->withTenantID('0d208db3-39f6-4f17-b3f4-89883d314820')
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
