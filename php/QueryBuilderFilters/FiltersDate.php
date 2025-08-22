<?php

namespace AdesinFr\LaravelQueryBuilderInertiaJs\QueryBuilderFilters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;
use Carbon\Carbon;

class FiltersDate implements Filter
{
    public function __invoke(Builder $query, $value, string $property): void
    {
        if (!is_array($value) || !isset($value['type'])) {
            return;
        }

        $type = $value['type'];
        $date = $value['date'] ?? null;
        $startDate = $value['start_date'] ?? null;
        $endDate = $value['end_date'] ?? null;

        switch ($type) {
            case 'exact':
                if ($date) {
                    $query->whereDate($property, Carbon::parse($date));
                }
                break;

            case 'before':
                if ($date) {
                    $query->whereDate($property, '<', Carbon::parse($date));
                }
                break;

            case 'after':
                if ($date) {
                    $query->whereDate($property, '>', Carbon::parse($date));
                }
                break;

            case 'between':
                if ($startDate && $endDate) {
                    $query->whereBetween($property, [
                        Carbon::parse($startDate)->startOfDay(),
                        Carbon::parse($endDate)->endOfDay()
                    ]);
                }
                break;
        }
    }
}
