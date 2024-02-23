<?php

use App\Http\Controllers\Api\V1\barangController;
use App\Http\Controllers\Api\V1\transaksiMultipleController;
use App\Http\Controllers\Api\V1\transaksiSingleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('v1/barang', barangController::class);

Route::apiResource('v1/transaksi-single', transaksiSingleController::class);

//transaksi multiple controller
Route::get('v1/transaksi',  [transaksiMultipleController::class, 'index']); //tampilin semua

Route::post('v1/transaksi/new', [transaksiMultipleController::class, 'newTransaction']); //baru bikin transaksi

Route::get('v1/transaksi/current', [transaksiMultipleController::class, 'getCurrentTransaction']);

Route::post('v1/transaksi/newItem', [transaksiMultipleController::class, 'newTransactionDetail']);
