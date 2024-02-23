<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\transaksiSingle;
use Illuminate\Http\Request;

class transaksiSingleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transaksiSingle = transaksiSingle::paginate(10);

        return response()->json([
            'transaksi' => $transaksiSingle
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $transaksiBaru = transaksiSingle::create([
            'idBarang' => $request->idBarang,
            'qty' => $request->qty,
            'catatan' => $request->catatan,
            'total' => $request->total
        ]);

        return response()->json([
            'message' => 'Transaksi berhasil!',
            'transaksi' => $transaksiBaru
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
