<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\transaksiMultipleDetail;
use App\Models\transaksiMultipleHeader;
use Illuminate\Http\Request;

class transaksiMultipleController extends Controller
{
    // 
    public function index()
    {
        $headers = transaksiMultipleHeader::with('details')->paginate(10);

        return response()->json([
            'transaksi' => $headers
        ]);
    }

    public function newTransaction()
    {
        //if there is saved transaction, load it first 
        $currentTransaction = transaksiMultipleHeader::where('status', 'unsaved')->first();


        if($currentTransaction){
            return response()->json([
                'message' => 'Ada transaksi belum selesai!'
            ]);
        }else{
            $transaksiBaru = transaksiMultipleHeader::create([
                'total' => 0,
                'status' => 'unsaved'
            ]);

            return response()->json([
                'message' => 'Transaksi baru berhasil dibuat!'
            ]);
        }
       
    }

    public function saveTransaction(){
        $currentTransaction = transaksiMultipleHeader::where('status', 'unsaved')->first();

        if($currentTransaction){
            $currentTransaction->update([
                'status' => 'saved'
            ]);
            return response()->json([
                'message' => 'Transaksi berhasil disimpan!'
            ]);
        }else{
            return response()->json([
                'message' => 'Transaksi gagal disimpan!'
            ]);
        }
    }

    public function getCurrentTransaction()
    {
        $currentTransaction = transaksiMultipleHeader::with('details', 'details.barang')
            ->where('status', 'unsaved')
            ->first();
        
        if(!$currentTransaction){
            $currentTransaction = transaksiMultipleHeader::create([
                'total' => 0,
                'status' => 'unsaved'
            ]);
        }
        return response()->json([
            'transaksi' => $currentTransaction
        ]);
    }
    
    //new item to the transaction
    public function newTransactionDetail(Request $request)
    {
        $adaDetail = transaksiMultipleDetail::where('idBarang', $request->idBarang)->where('idHeader', $request->idHeader)->first();

        if ($adaDetail) {
            // Update the existing detail
            $adaDetail->update([
                'qty' => $adaDetail->qty + $request->qty
            ]);

            return response()->json([
                'message' => 'Jumlah barang diupdate!',
                'data' => $adaDetail
            ]);
        } else {
            // Create a new detail
            $tambah = transaksiMultipleDetail::create([
                'idHeader' => $request->idHeader,
                'idBarang' => $request->idBarang,
                'qty' => $request->qty,
                'catatan' => $request->catatan
            ]);

            return response()->json([
                'message' => 'Transaksi detail baru dibuat!',
                'data' => $tambah
            ]);
        }
    }

    public function editDetail(Request $request, string $id)
    {
        $adaDetail = transaksiMultipleDetail::where('id', $id)->first();

        if($adaDetail){
            $adaDetail->update([
                'qty' => $request->qty,
                'catatan' => $request->catatan
            ]);

            return response()->json([
                'message' => 'Barang berhasil diupdate!',
                'transaksi' => $adaDetail
            ]);
        }else{
            return response()->json([
                'message' => 'Data tidak ditemukan!'
            ], 404);
        }
    }

    public function deleteItem(string $id){
        $detail = transaksiMultipleDetail::find($id);

        if ($detail) {
            $detail->delete();
            
            return response()->json([
                'message' => 'Item deleted successfully!',
            ]);
        } else {
            return response()->json([
                'message' => 'Item not found!',
            ], 404);
        }
    }

}
