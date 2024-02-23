<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class transaksiSingle extends Model
{
    use HasFactory;

    protected $fillable = [
        'idBarang', 
        'qty', 
        'catatan', 
        'total'
    ];
}
