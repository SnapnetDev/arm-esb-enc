<?php

namespace App\Http\Controllers;

use App\Models\Credential;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CredentialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return $this->resource(Credential::query()->get());
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
                'headers'=>'required'
            ]);
            $new  = new Credential;
            $new->create($data);
            return $this->success('New credential Created');    
        } catch (ValidationException $ex) {
            return $this->validationErrors($ex);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Credential  $credential
     * @return \Illuminate\Http\Response
     */
    public function show(Credential $credential)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Credential  $credential
     * @return \Illuminate\Http\Response
     */
    public function edit(Credential $credential)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Credential  $credential
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        try {
            //code...
            $record = Credential::query()->find($id);

            $data = request()->validate([
                'name'=>'required',
                'headers'=>'required'
            ]);
    
    
            $record->update($data);

            return $this->success('Credential Saved Successfully.');
    
        } catch (ValidationException $ex) {
            //throw $th;
            return $this->validationErrors($ex);
        }

    }

    public function destroy($id)
    {
        $record = Credential::query()->find($id);
        $record->delete();
        return $this->success('Credential removed Successfully');
    }
}
