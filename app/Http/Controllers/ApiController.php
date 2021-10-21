<?php

namespace App\Http\Controllers;

use App\Models\Api;
use App\Models\Category;
use App\Services\ApiService;
use App\Services\CurlService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (request()->filled('category_id') && request('category_id')){
          return $this->resource(Api::query()->where('category_id',request('category_id'))->get());
        }
        return $this->resource(Api::query()->get());
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

        try {

            $data = request()->validate([
                'name'=>'required',
                'credential_id'=>'required',
                'require_api_id'=>'required',
                'url'=>'required',
                'method'=>'required',
                'payload'=>'required',
                'request'=>'required',
                'response'=>'required',
                // 'pivot_expression'=>'required',
                'response_type'=>'required',
                'url_preview'=>'required',
                // 'duplicate_check_expression'=>'required',
                'expression'=>'required'
            ]);
    
            $category_id = request('category_id');
            if (request()->filled('category_name')){
              $categoryName = request('category_name');
              $query = Category::query()->where('name',$categoryName);
              if (!$query->exists()){
                $newCat = new Category;
                $newCat = $newCat->create([
                    'name'=>$categoryName
                ]);  
                $category_id = $query->first()->id;
              }             
            }
    
            $data['category_id'] = $category_id;
    
            
            $new = new Api;
            $new->create($data);

            return $this->success('Api Added Successfully');    
            // return [
            //     'message'=>'Api Added Successfully',
            //     'error'=>false
            // ];
        } catch (ValidationException $ex) {

            return $this->validationErrors($ex);
            // return [
            //     'message'=>'Validation errors',
            //     'error'=>true,
            //     'errors'=>$ex->errors(),
            //     'data'=>request()->all()
            // ];

        }


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Api  $api
     * @return \Illuminate\Http\Response
     */
    public function show(Api $api)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Api  $api
     * @return \Illuminate\Http\Response
     */
    public function edit(Api $api)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Api  $api
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $data = request()->validate([
                'name'=>'required',
                'credential_id'=>'required',
                'require_api_id'=>'required',
                'url'=>'required',
                'method'=>'required',
                'payload'=>'required',
                'request'=>'required',
                'response'=>'required',
                // 'pivot_expression'=>'required',
                'response_type'=>'required',
                'url_preview'=>'required',
                // 'duplicate_check_expression'=>'required',
                'category_id'=>'required',
                'expression'=>'required'
            ]);
    
            //
            $record = Api::query()->find($id);
    
            $record->update($data);

            return $this->success('API Saved');    
            // return [
            //     'message'=>'Api Saved.',
            //     'error'=>false
            // ];
                
        } catch (ValidationException $ex) {
            return $this->validationErrors($ex);

            // return [
            //     'message'=>'Validation errors',
            //     'error'=>true,
            //     'errors'=>$ex->errors(),
            //     'data'=>request()->all()
            // ];
            
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Api  $api
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $record = Api::query()->find($id);
        $record->delete();
        return [
            'message'=>'Api Removed Successfully',
            'error'=>false
        ];

    }

    function runApi($id){
        // $r = CurlService::runApi($id);
        $r = ApiService::callApi($id,[]);
        // dd($r);
        // print_r($r);
        // return $r;
        $rr = [];
        foreach ($r as $k=>$v){
            $rr[] = [
                'key'=>$k,
                'value'=>json_encode($v)
            ];
        }
        return $rr;
    }
}
