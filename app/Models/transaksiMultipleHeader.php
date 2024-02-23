<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class transaksiMultipleHeader extends Model
{
    use HasFactory;

    protected $fillable = [
        "total",
        "status"
    ];

    public function details()
    {
        return $this->hasMany(transaksiMultipleDetail::class, 'idHeader', 'id');
    }
}
