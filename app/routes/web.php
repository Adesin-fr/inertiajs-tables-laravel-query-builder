<?php

use App\Http\TwoTablesEloquent;
use App\Http\TwoTablesSpatie;
use App\Http\UserTableView;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

$table = new UserTableView;

Route::get('/', fn() => $table(resource: false, paginateMethod: 'paginate'));

Route::get('/custom', function () {
    return Inertia::render('CustomTable', [
        'users' => User::query()->paginate(10),
    ]);
});

Route::get('/two-tables/eloquent', TwoTablesEloquent::class);
Route::get('/two-tables/spatie', TwoTablesSpatie::class);

Route::get('/users/eloquent', fn() => $table(resource: false, paginateMethod: 'paginate'));
Route::get('/users/resource', fn() => $table(resource: true, paginateMethod: 'paginate'));
Route::get('/users/eloquent/simple', fn() => $table(resource: false, paginateMethod: 'simplePaginate'));
Route::get('/users/resource/simple', fn() => $table(resource: true, paginateMethod: 'simplePaginate'));
Route::get('/users/eloquent/cursor', fn() => $table(resource: false, paginateMethod: 'cursorPaginate'));
Route::get('/users/resource/cursor', fn() => $table(resource: true, paginateMethod: 'cursorPaginate'));

// Routes pour les exemples d'export personnalisé
Route::get('/users/custom-export', function () {
    return (new App\Http\UserTableWithCustomExport)();
});

Route::get('/users/excel-export', function () {
    return (new App\Http\UserTableWithExcelExport)();
});

// Route for multiple tables example
Route::get('/dashboard', \App\Http\MultipleTablesView::class)->name('dashboard');
