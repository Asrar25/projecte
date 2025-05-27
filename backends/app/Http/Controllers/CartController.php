<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class CartController extends Controller
{
     public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric',
        ]);

        DB::table('cart')->insert([
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'userID' => $request->userID,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Added to cart successfully']);
    }

    public function get(Request $request,$id)
    {
        $cartData = DB::table('cart')->where('userID', $id)->get();

        return response()->json([
            'data' => $cartData,
        ], 201);
    }
}
