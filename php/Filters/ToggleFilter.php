<?php

namespace AdesinFr\LaravelQueryBuilderInertiaJs\Filters;

use Illuminate\Contracts\Support\Arrayable;

class ToggleFilter implements Arrayable, Filterable
{
    protected const TYPE = 'toggle';

    public function __construct(
        public string $key, 
        public string $label, 
        public ?bool $value = null
    ) {
    }

    public function toArray(): array
    {
        return [
            'key'   => $this->key,
            'label' => $this->label,
            'value' => $this->value,
            'type'  => self::TYPE,
        ];
    }
}
