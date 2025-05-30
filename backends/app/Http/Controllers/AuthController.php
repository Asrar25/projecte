<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'address' => 'required|string|max:255',
        ]);
        DB::table('users')->insert([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => $validatedData['password'], // Always hash passwords
            'mobileNo' => $request->mobileNo, // Always hash passwords
            'address' => $validatedData['address'], // Always hash passwords
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        return response()->json(['message' => 'User registered successfully'], 201);
    }

    public function login(Request $request)
    {

        $user = DB::table('users')->where('email', $request->email)->first();
        $product = DB::table('batteries')->get();


        if ($user && $request->password === $user->password) {
            return response()->json([
                "status" => "success",
                'message' => 'Login Successfully',
                "userData" => $user,
                "products" => $product,
            ], 200);
        }
        return response()->json(['status' => 'error', 'message' => 'Invalid credentials'], 401);
    }

    public function update(Request $request, $id)
    {
        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'mobileNo' => $request->mobileNo,
            'address' => $request->address,
            'updated_at' => now(),
        ];

        $updated = DB::table('users')->where('id', $id)->update($data);

        if ($updated) {
            $updatedUser = DB::table('users')->where('id', $id)->first(); // Get updated user
            return response()->json([
                'status' => 'success',
                'data' => $updatedUser
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User not updated or no changes made'
            ], 400);
        }
    }

}
