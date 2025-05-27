<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class BatteryController extends Controller
{
    public function index()
    {
        $batteries = DB::table('batteries')->get();

        return response()->json($batteries);
    }

    public function store(Request $request)
    {
        // $validated = $request->validate([
        //     'name' => 'required|string|max:255',
        // ]);

        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock_quantity' => $request->stock_quantity,
            'category_id' => $request->category_id,
            'userID' => $request->userID,
            'created_at' => now(),
            'updated_at' => now(),
        ];

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $fileName = $fileName . '_' . date('His') . "." . $file->getClientOriginalExtension();
            $file->move(public_path('images/'), $fileName);

            $data['image'] = 'images/' . $fileName;

        }

        DB::table('batteries')->insert($data);

        return response()->json([
            'message' => 'Battery added successfully.',
            'latestAdd' => $data
        ], 201);
    }

    public function getBattery(Request $request,$id)
    {
        $batteries = DB::table('batteries')->where("id",$id)->first();

        return response()->json($batteries);
    }
}
