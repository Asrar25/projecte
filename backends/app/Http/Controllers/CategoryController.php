<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        DB::table('categories')->insert([
            'name' => $validated['name'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'message' => 'Category added successfully.',
        ], 201);
    }

    public function get(Request $request)
    {

        $category = DB::table('categories')->get();

        return response()->json([
            'data' => $category
        ], 201);
    }
}
