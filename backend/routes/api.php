<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    try {
        $version = DB::selectOne('select version() as v')->v;
        $connected = true;
    } catch (\Throwable $e) {
        $version = $e->getMessage();
        $connected = false;
    }

    return response()->json([
        'laravel' => app()->version(),
        'database' => [
            'connected' => $connected,
            'version' => $version,
        ],
    ]);
});
