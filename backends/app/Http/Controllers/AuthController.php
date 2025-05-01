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
    ]);

    DB::table('users')->insert([
        'name' => $validatedData['name'],
        'email' => $validatedData['email'],
        'password' => $validatedData['password'], // Always hash passwords
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    return response()->json(['message' => 'User registered successfully'], 201);
  }

  public function login(Request $request)
  {

    $user = DB::table('users')->where('email', $request->email)->first();

    if ($user && $request->password === $user->password) {
        return response()->json([
            'message' => 'Login Successfully',
        ], 200);
    }

    return response()->json(['message' => 'Invalid credentials'], 401);
  }

}
