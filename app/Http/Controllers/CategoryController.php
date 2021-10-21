<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use PhpParser\Node\Stmt\TryCatch;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return $this->resource(Category::query()->get());
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
        try{
            $data = request()->validate([
                'name'=>'required'
            ]);
            $new = new Category;
            $new = $new->create($data);
            return [
                'message'=>'New Category Added',
                'error'=>false,
                'data'=>$new
            ];    
        }catch(ValidationException $ex){
            // dd($ex->getMessage());
            return $this->validationErrors($ex);
        }
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        try {
            $record = Category::query()->find($id);
            $data = request()->validate([
                'name'=>'required'
            ]);
    
            $record->update($data);
            return [
                'message'=>'Category Saved',
                'error'=>false,
                'data'=>$record
            ];    
            //code...
        } catch (ValidationException $ex) {
            //throw $th;
            return $this->validationErrors($ex);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $record = Category::query()->find($id);
        $record->delete();
        return [
            'message'=>'Category removed',
            'error'=>false,
            'data'=>$record
        ];
    }
}
