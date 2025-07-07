<?php

namespace AdesinFr\LaravelQueryBuilderInertiaJs\Filters;

use AdesinFr\LaravelQueryBuilderInertiaJs\QueryBuilderFilters\FiltersNumberRange;
use Illuminate\Contracts\Support\Arrayable;
use Spatie\QueryBuilder\AllowedFilter;

class NumberRangeFilter implements Arrayable, Filterable
{
    protected const TYPE = 'number_range';

    public function __construct(
        public string $key,
        public string $label,
        public float $max,
        public float $min = 0,
        public string $prefix = '',
        public string $suffix = '',
        public float $step = 1,
        public ?array $value = null
    ) {
    }

    public function toArray(): array
    {
        return [
            'key'    => $this->key,
            'label'  => $this->label,
            'max'    => $this->max,
            'min'    => $this->min,
            'prefix' => $this->prefix,
            'suffix' => $this->suffix,
            'step'   => $this->step,
            'value'  => $this->value ?? [$this->min, $this->max],
            'type'   => self::TYPE,
        ];
    }

    public static function getQueryBuilderFilter($column)
    {
        return AllowedFilter::custom($column, new FiltersNumberRange);
    }
}
