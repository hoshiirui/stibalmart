<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class masterBarang extends Model
{
    use HasFactory;

    protected $primaryKey = 'kode'; 
    protected $fillable = [
        'nama', 
        'hargaModal',
        'hargaJual'
    ];

     public function details()
    {
        return $this->hasMany(transaksiMultipleDetail::class, 'idBarang', 'kode');
    }
}
