<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return $this->resource(Store::query()->get());
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
            //code...
            $data = request()->validate([
                'name'=>'required'
            ]);
            
            $new = new Store;
            
            $check = Store::query()->where('name',$data['name']);
            if ($check->exists()){
              return [
                  'message'=>'Store exists!',
                  'error'=>true
              ]; 
            }
    
            $new->create($data);
            return [
                'message'=>'New store created',
                'error'=>false
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
     * Display the specified resource.
     *
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Http\Response
     */
    public function show(Store $store)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Http\Response
     */
    public function edit(Store $store)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        try {
            //code...
            $data = request()->validate([
                'name'=>'required'
            ]);
    
            
            $record = Store::query()->find($id);
            $record->update($data);
            return [
                'message'=>'Store updated',
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
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $record = Store::query()->find($id);
        $record->delete();
        return [
            'message'=>'Store removed',
            'error'=>false,
            'data'=>$record
        ];
    }
}
