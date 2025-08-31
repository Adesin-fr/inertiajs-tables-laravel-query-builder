<?php

namespace App\Http;

use AdesinFr\LaravelQueryBuilderInertiaJs\InertiaTable;
use AdesinFr\LaravelQueryBuilderInertiaJs\QueryBuilderFilters\FiltersDate;
use AdesinFr\LaravelQueryBuilderInertiaJs\Filters\NumberRangeFilter;
use AdesinFr\LaravelQueryBuilderInertiaJs\Filters\NumberFilter;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class UserTableView
{
    public function __invoke($resource = false, $paginateMethod)
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
            ->allowedSorts(['name', 'email', 'language_code', 'created_at', 'score'])
            ->allowedFilters([
                'name',
                'email',
                'language_code',
                $globalSearch,
                AllowedFilter::custom('created_at', new FiltersDate()),
                //NumberRangeFilter::getQueryBuilderFilter('score'),
                NumberFilter::getQueryBuilderFilter('score')
            ]);

        return InertiaTable::make()
            ->name('users-table')
            ->resourceName('users')
            ->withQueryBuilder($queryBuilder)
            ->paginateMethod($paginateMethod)
            ->withResource($resource ? UserResource::class : null)
            ->withGlobalSearch()
            ->defaultSort('name')
            ->column(key: 'name', searchable: true, sortable: true, canBeHidden: false)
            ->column(key: 'email', searchable: true, sortable: true, headerClass: 'hidden md:table-cell', bodyClass: 'hidden md:table-cell')
            ->column(key: 'score', searchable: true, sortable: true, headerClass: 'hidden md:table-cell', bodyClass: 'hidden md:table-cell')
            ->column(key: 'language_code', label: 'Language')
            ->column(key: 'created_at', sortable: true, label: 'Created at')
            ->column(label: 'Actions')
            ->dateFilter(key: 'created_at', label: 'Date de création', format: 'Y-m-d')
            ->selectFilter(key: 'language_code', options: [
                'en' => 'English',
                'nl' => 'Dutch',
            ], label: 'Language')
            ->numberFilter(key: 'score', label: 'Filtrer le score')
            ->render('Users');
    }
}
