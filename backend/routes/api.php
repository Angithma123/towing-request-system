<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TowingRequestController;




Route::get('/requests', [TowingRequestController::class, 'index']);


Route::patch('/requests/{id}/accept', [TowingRequestController::class, 'accept']);


Route::post('/requests', [TowingRequestController::class, 'store']);