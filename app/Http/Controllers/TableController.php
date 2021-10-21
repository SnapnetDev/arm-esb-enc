<?php

namespace App\Http\Controllers;

use App\Models\Table;
use App\Services\TableService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TableController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return $this->resource(Table::query()->get());
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
                'alias'=>'required',
                'fields'=>'required'
            ]);
            $new = new Table;
            $new->create($data);
            
            TableService::createTableOnDb(request('name'),request('fields'));
    
            return [
                'message'=>'New entity added.',
                'error'=>false,
                'data'=>$new
            ];                

        } catch (ValidationException $ex) {
            //throw $th;
            return $this->validationErrors($ex);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Table  $table
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // return ['cool'=>90];
        //
        $limit = 11;
        $skip = 0;
        if (request()->filled('limit')){
           $limit = request('limit');
        }
        if (request()->filled('skip')){
            $skip = request('skip');
        } 
        $data = TableService::getSchemaWithData($id,$limit,$skip);
        return [
          'list'=>$data['records'],
          'rec_count'=>$data['count']
        ];
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Table  $table
     * @return \Illuminate\Http\Response
     */
    public function edit(Table $table)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Table  $table
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //handle adding/removal of fields


        try {
            
            $data = request()->validate([
                'name'=>'required',
                'alias'=>'required',
                'fields'=>'required'
            ]);


            $fields = request('fields');
            $name = request('name');
    
            if (request()->filled('fields_add') && request('fields_add') !== 'null' && !empty(request('fields_add'))){
                 $fields_add = request('fields_add');
                 $fields = request('fields');
                 if (TableService::fieldExists($fields,$fields_add)){
                    return [
                        'message'=>'Duplicate field found, please check again!',
                        'error'=>true,
                        'errors'=>[
                            'err1'=>'Duplicate field found, please check again!'
                        ]
 
                    ];
                }
                $fields = TableService::addFields($fields,$fields_add);
                TableService::addTableFieldsOnDb($name,$fields_add);
            }
    
            if (request()->filled('fields_remove') && request('fields_remove') !== 'null' && !empty(request('fields_remove'))){
                $fields_remove = request('fields_remove');
                $fields = request('fields');
                if (!TableService::fieldExists($fields,$fields_remove)){
                   return [
                       'message'=>'Field to remove, not found!',
                       'error'=>true,
                       'errors'=>[
                           'err1'=>'Field to remove, not found'
                       ]
                   ];
                }
                $fields = TableService::deductFields($fields,$fields_remove);
                TableService::removeTableFieldsOnDb($name,$fields_remove);
            }
            //
            $record = Table::query()->find($id);
    
            $record->update([
                'name'=>request('name'),
                'alias'=>request('alias'),
                'fields'=>$fields
            ]);
    
            return [
                'message'=>'Entity updated',
                'error'=>false,
                'data'=>TableService::decodeFields(request('fields'))
            ];    

        } catch (ValidationException $ex) {
            return $this->validationErrors($ex);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Table  $table
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $record = Table::query()->find($id);
        TableService::removeTable($record->name);
        $record->delete();
        return [
            'message'=>'Entity removed.',
            'error'=>false,
            'data'=>$record
        ];

    }
}
