<?php

namespace App\Http\Controllers;

use App\Models\ApiSync;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ApiSyncController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return $this->resource(ApiSync::query()->get());
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
    //     ['api_id','store_id','chunk_size','pivot','direction','field_map',
    // 'frequency_time','status','recurring','start_date_time']

    try {
        $data = request()->validate([
            'name'=>'required',
            'api_id'=>'required',
            'store_id'=>'required',
            'pivot'=>'required',
            'frequency_time'=>'required'
        ]);
        $data['status'] = 0;
    
        $new = new ApiSync;
    
        $new->create($data);
        return [
                'message'=>'Api-Sync Registerred',
                'error'=>false,
                'data'=>$new
        ];    
    } catch (ValidationException $ex) {
        return $this->validationErrors($ex);
        // return [
        //     'message'=>'Validation Errors',
        //     'error'=>true,
        //     'data'=>request()->all(),
        //     'errors'=>$ex->errors()
        // ];    
    }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ApiSync  $apiSync
     * @return \Illuminate\Http\Response
     */
    public function show(ApiSync $apiSync)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ApiSync  $apiSync
     * @return \Illuminate\Http\Response
     */
    public function edit(ApiSync $apiSync)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ApiSync  $apiSync
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        try {
            $data = request()->validate([
                'name'=>'required',
                'api_id'=>'required',
                'store_id'=>'required',
                'pivot'=>'required',
                'frequency_time'=>'required',
                'status'=>'required'
            ]);
    
            $record = ApiSync::query()->find($id);
    
            $record->update($data);
    
            return [
                'message'=>'Api-Sync Updated',
                'error'=>false,
                'data'=>$record
            ];                
        } catch (ValidationException $ex) {
            //throw $th;
            return $this->validationErrors($ex);
            // return [
            //     'message'=>'Validation Error',
            //     'error'=>true,
            //     'errors'=>$ex->errors(),
            //     'data'=>request()->all()
            // ];                
        }        

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ApiSync  $apiSync
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
       $record = ApiSync::query()->find($id);
       $record->delete();
       
       return [
           'message'=>'ApiSync Removed',
           'error'=>false,
           'data'=>$record
       ]; 

    }
}
