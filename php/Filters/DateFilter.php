<?php

namespace AdesinFr\LaravelQueryBuilderInertiaJs\Filters;

use AdesinFr\LaravelQueryBuilderInertiaJs\QueryBuilderFilters\FiltersDate;
use Illuminate\Contracts\Support\Arrayable;
use Spatie\QueryBuilder\AllowedFilter;

class DateFilter implements Arrayable, Filterable
{
    protected const TYPE = 'date';

    public function __construct(
        public string $key,
        public string $label,
        public ?array $value = null,
        public string $format = 'Y-m-d'
    ) {}

    public function toArray(): array
    {
        return [
            'key'    => $this->key,
            'label'  => $this->label,
            'value'  => $this->value,
            'format' => $this->format,
            'type'   => self::TYPE,
        ];
    }

    public static function getQueryBuilderFilter($column)
    {
        return AllowedFilter::custom($column, new FiltersDate);
    }
}
