<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\masterBarang;
use Illuminate\Http\Request;

class barangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $barang = masterBarang::all();

        return response()->json([
            'barang' => $barang
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
        $barangBaru = masterBarang::create([
            'nama' => $request->nama,
            'hargaModal' => $request->hargaModal,
            'hargaJual' => $request->hargaJual
        ]);

        return response()->json([
            'message' => 'Barang berhasil diinput!',
            'barang' => $barangBaru
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $barangCari = masterBarang::where('kode', $id)->first();

        if($barangCari){
            return response()->json([
                'message' => 'Barang ditemukan!',
                'barang' => $barangCari
            ]);
        }else{
            return response()->json([
                'message' => 'Data barang tidak ditemukan!'
            ], 404);
        }
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
        $barangCari = masterBarang::where('kode', $id)->first();
        
        if($barangCari){
            $barangCari->update([
                'nama' => $request->nama,
                'hargaModal' => $request->hargaModal,
                'hargaJual' => $request->hargaJual
            ]);

            return response()->json([
                'message' => 'Barang berhasil diupdate!',
                'barang' => $barangCari
            ]);
        }else{
            return response()->json([
                'message' => 'Barang tidak ditemukan!'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $barangCari = masterBarang::where('kode', $id)->first();
        
        if($barangCari){
            $barangCari->delete();

            return response()->json([
                'message' => 'Barang dihapus!',
            ]);
        }else{
            return response()->json([
                'message' => 'Barang tidak ditemukan!'
            ], 404);
        }
    }
}
