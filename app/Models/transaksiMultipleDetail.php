<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class transaksiMultipleDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        "idHeader",
        "idBarang",
        "qty",
        "catatan"
    ];
}
