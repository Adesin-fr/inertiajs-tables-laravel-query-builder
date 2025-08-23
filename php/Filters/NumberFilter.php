<?php

namespace AdesinFr\LaravelQueryBuilderInertiaJs\Filters;

use AdesinFr\LaravelQueryBuilderInertiaJs\QueryBuilderFilters\FiltersNumber;
use Illuminate\Contracts\Support\Arrayable;
use Spatie\QueryBuilder\AllowedFilter;

class NumberFilter implements Arrayable, Filterable
{
    protected const TYPE = 'number';

    public function __construct(
        public string $key,
        public string $label,
        public ?array $value = null,
        public string $prefix = '',
        public string $suffix = '',
        public float $step = 1
    ) {}

    public function toArray(): array
    {
        return [
            'key'    => $this->key,
            'label'  => $this->label,
            'value'  => $this->value,
            'prefix' => $this->prefix,
            'suffix' => $this->suffix,
            'step'   => $this->step,
            'type'   => self::TYPE,
        ];
    }

    public static function getQueryBuilderFilter($column)
    {
        return AllowedFilter::custom($column, new FiltersNumber);
    }
}
