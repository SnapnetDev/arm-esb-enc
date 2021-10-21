<?php

namespace App\Http\Controllers;

use App\Models\TableSync;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TableSyncController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return $this->resource(TableSync::query()->get());
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
        // protected $fillable = ['name','table_id','api_id','tracker_name','tracker_default_value',
        // 'tracker_reset_value','chunk_size','frequency_time','status'];
        try {
            //code...
            $data = request()->validate([
                'name'=>'required',
                'table_id'=>'required',
                'api_id'=>'required',
                'tracker_name'=>'required',
                'tracker_reset_value'=>'required',
                'chunk_size'=>'required',
                'frequency_time'=>'required'
            ]);
    
            $data['status'] = 0;
    
            $new = new TableSync;
            $new = $new->create($data);
    
            return [
                'message'=>'New Table-Sync Added',
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
     * @param  \App\Models\TableSync  $tableSync
     * @return \Illuminate\Http\Response
     */
    public function show(TableSync $tableSync)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TableSync  $tableSync
     * @return \Illuminate\Http\Response
     */
    public function edit(TableSync $tableSync)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TableSync  $tableSync
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
                'api_id'=>'required',
                'tracker_name'=>'required',
                'tracker_reset_value'=>'required',
                'chunk_size'=>'required',
                'frequency_time'=>'required',
                'status'=>'required'
            ]);
    
            // $data['status'] = 0;
    
            $record = TableSync::query()->find($id);
            $record->update($data);
    
            return [
                'message'=>'Table-Sync Updated',
                'error'=>false
            ];     
        } catch (ValidationException $ex) {
            //throw $th;
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
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TableSync  $tableSync
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $record = TableSync::query()->find($id);
        $record->delete();
        return [
            'message'=>'Table-Sync Removed',
            'error'=>false,
            'data'=>$record
        ];
    }
}
