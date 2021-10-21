<?php

namespace App\Http\Controllers;

use App\Models\StoreSync;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class StoreSyncController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return $this->resource(StoreSync::query()->get());
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
        try {
            $data = request()->validate([
                'name'=>'required',
                'table_id'=>'required',
                'store_id'=>'required',
                'frequency_time'=>'required'
            ]);
            $data['status'] = 0;
    
            $new  = new StoreSync;
            $new->create($data);

            return [
            'message'=>'New Store-Sync Registerred',
            'error'=>false,
            'data'=>$new
            ];
            
        } catch (ValidationException $ex) {
             return $this->validationErrors($ex);
            //  return [
            //     'message'=>'Validation Errors',
            //     'error'=>true,
            //     'data'=>request()->all(),
            //     'errors'=>$ex->errors()
            //  ];                
        }
     
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StoreSync  $storeSync
     * @return \Illuminate\Http\Response
     */
    public function show(StoreSync $storeSync)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StoreSync  $storeSync
     * @return \Illuminate\Http\Response
     */
    public function edit(StoreSync $storeSync)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\StoreSync  $storeSync
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        try {
            //code...
            $data = request()->validate([
                'name'=>'required',
                'table_id'=>'required',
                'store_id'=>'required',
                'frequency_time'=>'required',
                'status'=>'required'
            ]);
            $record  = StoreSync::query()->find($id);
            $record->update($data);
      
            return [
                'message'=>'Store-Sync Updated',
                'error'=>false,
                'data'=>$record
            ];    
        } catch (ValidationException $ex) {
            //throw $th;
            return $this->validationErrors($ex);
            // return [
            //     'message'=>'Validation Errors',
            //     'error'=>true,
            //     'errors'=>$ex->errors(),
            //     'data'=>request()->all()
            // ];
                
        }
  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StoreSync  $storeSync
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $record = StoreSync::query()->find($id);
        $record->delete();
        return [
            'message'=>'Store Sync Removed',
            'error'=>false,
            'data'=>$record
        ];
    }
}
