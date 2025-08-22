<?php

namespace AdesinFr\LaravelQueryBuilderInertiaJs\Filters;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Arr;

class Filter implements Arrayable, Filterable
{
    public function __construct(
        public string $key,
        public string $label,
        public array $options,
        public ?string $value = null,
        public bool $noFilterOption = true,
        public string $noFilterOptionLabel = '-',
        public string $type = 'select'
    ) {}

    public function toArray()
    {
        $options = $this->options;

        if ($this->noFilterOption) {
            $options = Arr::prepend($options, $this->noFilterOptionLabel, '');
        }

        return [
            'key'     => $this->key,
            'label'   => $this->label,
            'options' => $options,
            'value'   => $this->value,
            'type'    => $this->type,
        ];
    }
}
