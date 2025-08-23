<?php

namespace App\Http;

use AdesinFr\LaravelQueryBuilderInertiaJs\InertiaTable;
use App\Models\User;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class UserTableWithExcelExport
{
    public function __invoke()
    {
        $globalSearch = AllowedFilter::callback('global', function ($query, $value) {
            $query->where(function ($query) use ($value) {
                Collection::wrap($value)->each(function ($value) use ($query) {
                    $query
                        ->orWhere('name', 'LIKE', "%{$value}%")
                        ->orWhere('email', 'LIKE', "%{$value}%");
                });
            });
        });

        $queryBuilder = QueryBuilder::for(User::query())
            ->defaultSort('name')
            ->allowedSorts(['name', 'email', 'created_at'])
            ->allowedFilters([
                'name',
                'email',
                $globalSearch,
            ]);

        return InertiaTable::make()
            ->withQueryBuilder($queryBuilder)
            ->withGlobalSearch()
            ->defaultSort('name')
            ->column(key: 'name', searchable: true, sortable: true)
            ->column(key: 'email', searchable: true, sortable: true)
            ->column(key: 'created_at', sortable: true, label: 'Created at')
            ->column(label: 'Actions')
            // Exemple d'export Excel personnalisé (nécessite maatwebsite/excel)
            ->withExportCallback(function ($queryBuilder) {
                // Si vous utilisez Laravel Excel (maatwebsite/excel)
                // return Excel::download(new UsersExport($queryBuilder), 'users-export.xlsx');

                // Exemple simple d'export JSON personnalisé
                $data = $queryBuilder->get();

                // Vous pourriez aussi appeler un service d'export personnalisé
                $exportService = app(UserExportService::class);
                return $exportService->exportToJson($data);

                // Ou retourner les données dans un format différent
                $exportData = [
                    'metadata' => [
                        'exported_at' => now()->toISOString(),
                        'total_records' => $data->count(),
                        'filters_applied' => request()->get('filter', []),
                    ],
                    'data' => $data->map(function ($user) {
                        return [
                            'id' => $user->id,
                            'name' => $user->name,
                            'email' => $user->email,
                            'created_at' => $user->created_at->toISOString(),
                            'profile_url' => route('users.show', $user->id),
                        ];
                    }),
                ];

                return response()->json($exportData)
                    ->header('Content-Disposition', 'attachment; filename="users-export-' . now()->format('Y-m-d-H-i-s') . '.json"');
            })
            ->render('Users/Index');
    }
}

// Service d'export exemple (optionnel)
class UserExportService
{
    public function exportToJson($data)
    {
        $processedData = $data->map(function ($user) {
            return [
                'user_id' => $user->id,
                'full_name' => $user->name,
                'email_address' => $user->email,
                'registration_date' => $user->created_at->format('Y-m-d'),
                'is_verified' => !is_null($user->email_verified_at),
            ];
        });

        return response()->json([
            'export_info' => [
                'format' => 'json',
                'exported_at' => now()->toISOString(),
                'record_count' => $processedData->count(),
            ],
            'users' => $processedData,
        ])->header('Content-Disposition', 'attachment; filename="users-export-' . now()->format('Y-m-d-H-i-s') . '.json"');
    }
}
