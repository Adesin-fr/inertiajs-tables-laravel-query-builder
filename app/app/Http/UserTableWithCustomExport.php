<?php

namespace App\Http;

use AdesinFr\LaravelQueryBuilderInertiaJs\InertiaTable;
use App\Models\User;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class UserTableWithCustomExport
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
            // Exemple d'export personnalisé
            ->withExportCallback(function ($queryBuilder) {
                // Le callback recoit le QueryBuilder avec tous les filtres appliqués
                $data = $queryBuilder->get();

                // Traitement personnalisé des données
                $processedData = $data->map(function ($user) {
                    return [
                        'ID' => $user->id,
                        'Nom complet' => strtoupper($user->name),
                        'Email' => $user->email,
                        'Date de création' => $user->created_at->format('d/m/Y'),
                        'Status' => $user->email_verified_at ? 'Vérifié' : 'Non vérifié',
                    ];
                });

                // Génération du CSV personnalisé
                $csv = "\xEF\xBB\xBF"; // UTF-8 BOM

                // En-têtes
                if ($processedData->isNotEmpty()) {
                    $headers = array_keys($processedData->first());
                    $csv .= implode(';', array_map(function ($header) {
                        return '"' . str_replace('"', '""', $header) . '"';
                    }, $headers)) . "\n";

                    // Données
                    foreach ($processedData as $row) {
                        $csvRow = array_map(function ($value) {
                            return '"' . str_replace('"', '""', $value) . '"';
                        }, array_values($row));
                        $csv .= implode(';', $csvRow) . "\n";
                    }
                }

                $filename = 'users-export-custom-' . now()->format('Y-m-d-H-i-s') . '.csv';

                return response($csv)
                    ->header('Content-Type', 'text/csv; charset=utf-8')
                    ->header('Content-Disposition', 'attachment; filename="' . $filename . '"')
                    ->header('Cache-Control', 'no-cache, no-store, must-revalidate')
                    ->header('Pragma', 'no-cache')
                    ->header('Expires', '0');
            })
            ->render('Users/Index');
    }
}
