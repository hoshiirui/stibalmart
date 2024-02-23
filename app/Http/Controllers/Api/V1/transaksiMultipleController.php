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

    public function getCurrentTransaction()
    {
        $currentTransaction = transaksiMultipleHeader::with('details', 'details.barang')
            ->where('status', 'unsaved')
            ->first();
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
            ]);
        } else {
            // Create a new detail
            transaksiMultipleDetail::create([
                'idHeader' => $request->idHeader,
                'idBarang' => $request->idBarang,
                'qty' => $request->qty,
                'catatan' => $request->catatan
            ]);

            return response()->json([
                'message' => 'Transaksi detail baru dibuat!',
            ]);
        }
    }

    public function editDetail(Request $request, string $id)
    {
        $adaDetail = transaksiMultipleDetail::where('id', $id)->first();

        if($adaDetail){
            $adaDetail->update([
                'qty' => $request->qty,
                'catatan' => $request->qty
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

}
