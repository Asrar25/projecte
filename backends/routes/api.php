<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BatteryController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EmailController;




/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::get('/batteries/get', [BatteryController::class, 'index']);

Route::get('/batteries/get/{id}', [BatteryController::class, 'getBattery']);

Route::post('/batteries', [BatteryController::class, 'store']);

Route::post('/categories', [CategoryController::class, 'store']);

Route::get('/categories/get', [CategoryController::class, 'get']);

Route::post('/send-email', [EmailController::class, 'sendEmail']);


