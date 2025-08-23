<?php

namespace AdesinFr\LaravelQueryBuilderInertiaJs\QueryBuilderFilters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class FiltersNumber implements Filter
{
    public function __invoke(Builder $query, $value, string $property): void
    {
        if (!is_array($value) || !isset($value['type'])) {
            return;
        }

        $type = $value['type'];
        $number = $value['number'] ?? null;
        $startNumber = $value['start_number'] ?? null;
        $endNumber = $value['end_number'] ?? null;

        switch ($type) {
            case 'exact':
                if ($number !== null && $number !== '') {
                    $query->where($property, '=', (float) $number);
                }
                break;

            case 'less_than':
                if ($number !== null && $number !== '') {
                    $query->where($property, '<', (float) $number);
                }
                break;

            case 'greater_than':
                if ($number !== null && $number !== '') {
                    $query->where($property, '>', (float) $number);
                }
                break;

            case 'less_than_or_equal':
                if ($number !== null && $number !== '') {
                    $query->where($property, '<=', (float) $number);
                }
                break;

            case 'greater_than_or_equal':
                if ($number !== null && $number !== '') {
                    $query->where($property, '>=', (float) $number);
                }
                break;

            case 'between':
                if ($startNumber !== null && $startNumber !== '' && $endNumber !== null && $endNumber !== '') {
                    $query->whereBetween($property, [(float) $startNumber, (float) $endNumber]);
                }
                break;
        }
    }
}
