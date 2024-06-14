<?php

namespace AdesinFr\LaravelQueryBuilderInertiaJs\QueryBuilderFilters;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class FiltersNumberRange implements Filter
{
    public function __invoke(Builder $query, $value, string $property): void
    {
        if (count($value) < 2) {
            $value = [
                0,
                ...$value,
            ];
        }
        $query->whereBetween($property, $value);
    }
}
