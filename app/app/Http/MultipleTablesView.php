<?php

namespace App\Http;

use AdesinFr\LaravelQueryBuilderInertiaJs\InertiaTable;
use AdesinFr\LaravelQueryBuilderInertiaJs\QueryBuilderFilters\FiltersDate;
use AdesinFr\LaravelQueryBuilderInertiaJs\Filters\NumberFilter;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class MultipleTablesView
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

        return InertiaTable::view('Dashboard', [
            'title' => 'Multi-Tables Dashboard'
        ])
            ->table('users', function ($table) use ($globalSearch) {
                $table
                    ->withQueryBuilderCallback(function () use ($globalSearch) {
                        return QueryBuilder::for(User::query())
                            ->defaultSort('name')
                            ->allowedSorts(['name', 'email', 'created_at', 'score'])
                            ->allowedFilters([
                                'name',
                                'email',
                                $globalSearch,
                                AllowedFilter::custom('created_at', new FiltersDate()),
                                NumberFilter::getQueryBuilderFilter('score')
                            ]);
                    })
                    ->paginateMethod('paginate')
                    ->withResource(UserResource::class)
                    ->withGlobalSearch()
                    ->defaultSort('name')
                    ->column(key: 'name', searchable: true, sortable: true, canBeHidden: false)
                    ->column(key: 'email', searchable: true, sortable: true)
                    ->column(key: 'score', searchable: true, sortable: true)
                    ->column(key: 'created_at', sortable: true, label: 'Created at')
                    ->dateFilter(key: 'created_at', label: 'Date de création', format: 'Y-m-d')
                    ->numberFilter(key: 'score', label: 'Filtrer le score');
            })
            ->table('admins', function ($table) use ($globalSearch) {
                $table
                    ->withQueryBuilderCallback(function () use ($globalSearch) {
                        return QueryBuilder::for(User::query()->where('is_admin', true))
                            ->defaultSort('name')
                            ->allowedSorts(['name', 'email', 'created_at'])
                            ->allowedFilters([
                                'name',
                                'email',
                                $globalSearch,
                                AllowedFilter::custom('created_at', new FiltersDate())
                            ]);
                    })
                    ->paginateMethod('paginate')
                    ->withGlobalSearch()
                    ->defaultSort('name')
                    ->column(key: 'name', searchable: true, sortable: true, canBeHidden: false)
                    ->column(key: 'email', searchable: true, sortable: true)
                    ->column(key: 'created_at', sortable: true, label: 'Created at')
                    ->dateFilter(key: 'created_at', label: 'Date de création', format: 'Y-m-d');
            })
            ->render();
    }
}
