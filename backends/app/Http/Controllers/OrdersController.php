<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class OrdersController extends Controller
{
    public function store(Request $request)
    {
        $data = [
            'product_id' => $request->productID,
            'price' => $request->price,
            'source' => $request->source,
            'destination' => $request->destination
        ];

        DB::table('orders')->insert($data);

        return response()->json([
            'message' => 'Order placed successfully',
        ], 200);
    }

    public function get(Request $request,$id)
    {
        $suppliedOrders = DB::table('orders')->where('source', $id)->get();

        $destinationOrders = DB::table('orders')->where('destination', $id)->get();

        return response()->json([
            'suppliedOrders' => $suppliedOrders,
            'destinationOrders' => $destinationOrders,
        ], 201);
    }

}
