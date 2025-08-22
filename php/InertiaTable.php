<?php

namespace AdesinFr\LaravelQueryBuilderInertiaJs;

use AdesinFr\LaravelQueryBuilderInertiaJs\Filters\Filter;
use AdesinFr\LaravelQueryBuilderInertiaJs\Filters\Filterable;
use AdesinFr\LaravelQueryBuilderInertiaJs\Filters\NumberRangeFilter;
use AdesinFr\LaravelQueryBuilderInertiaJs\Filters\ToggleFilter;
use AdesinFr\LaravelQueryBuilderInertiaJs\Filters\DateFilter;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Inertia\Response;

class InertiaTable
{
    private string $name          = 'default';
    private string $pageName      = 'page';
    private array $perPageOptions = [15, 30, 50, 100];
    private Request $request;
    private Collection $columns;
    private Collection $searchInputs;
    private Collection $filters;
    private array $columnFilters = []; // Nouveau : Association colonne -> filtres
    private string $defaultSort = '';

    private static bool|string $defaultGlobalSearch = false;
    private static array $defaultQueryBuilderConfig = [];

    public function __construct(Request $request)
    {
        $this->request      = $request;
        $this->columns      = new Collection;
        $this->searchInputs = new Collection;
        $this->filters      = new Collection;

        if (static::$defaultGlobalSearch !== false) {
            $this->withGlobalSearch(static::$defaultGlobalSearch);
        }
    }

    /**
     * Set a default for global search.
     *
     * @param bool|string $label
     * @return void
     */
    public static function defaultGlobalSearch(bool|string $label = 'Search...')
    {
        static::$defaultGlobalSearch = $label !== false ? __($label) : false;
    }

    /**
     * Retrieve a query string item from the request.
     *
     * @param string $key
     * @param mixed|null $default
     * @return mixed
     */
    private function query(string $key, $default = null)
    {
        return $this->request->query(
            $this->name === 'default' ? $key : "{$this->name}_{$key}",
            $default
        );
    }

    /**
     * Helper method to update the Spatie Query Builder parameter config.
     *
     * @param string $name
     * @return void
     */
    public static function updateQueryBuilderParameters(string $name)
    {
        if (empty(static::$defaultQueryBuilderConfig)) {
            static::$defaultQueryBuilderConfig = config('query-builder.parameters');
        }

        $newConfig = collect(static::$defaultQueryBuilderConfig)->map(function ($value) use ($name) {
            return "{$name}_{$value}";
        })->all();

        config(['query-builder.parameters' => $newConfig]);
    }

    /**
     * Name for this table.
     *
     * @param string $name
     * @return self
     */
    public function name(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Page name for this table.
     *
     * @param string $pageName
     * @return self
     */
    public function pageName(string $pageName): self
    {
        $this->pageName = $pageName;

        return $this;
    }

    /**
     * Per Page options for this table.
     *
     * @param array $pageName
     * @return self
     */
    public function perPageOptions(array $perPageOptions): self
    {
        $this->perPageOptions = $perPageOptions;

        return $this;
    }

    /**
     * Default sort for this table.
     *
     * @param string $defaultSort
     * @return self
     */
    public function defaultSort(string $defaultSort): self
    {
        $this->defaultSort = $defaultSort;

        return $this;
    }

    /**
     * Collects all properties and sets the default
     * values from the request query.
     *
     * @return array
     */
    protected function getQueryBuilderProps(): array
    {
        return [
            'defaultVisibleToggleableColumns' => $this->columns->reject->hidden->map->key->sort()->values(),
            'columns'                         => $this->transformColumns(),
            'hasHiddenColumns'                => $this->columns->filter->hidden->isNotEmpty(),
            'hasToggleableColumns'            => $this->columns->filter->canBeHidden->isNotEmpty(),

            'filters'           => $this->transformFilters(),
            'hasFilters'        => $this->filters->isNotEmpty(),
            'hasEnabledFilters' => $this->filters->whereNotNull('value')->isNotEmpty(),

            'searchInputs'                => $searchInputs              = $this->transformSearchInputs(),
            'searchInputsWithoutGlobal'   => $searchInputsWithoutGlobal = $searchInputs->where('key', '!=', 'global'),
            'hasSearchInputs'             => $searchInputsWithoutGlobal->isNotEmpty(),
            'hasSearchInputsWithValue'    => $searchInputsWithoutGlobal->whereNotNull('value')->isNotEmpty(),
            'hasSearchInputsWithoutValue' => $searchInputsWithoutGlobal->whereNull('value')->isNotEmpty(),

            'globalSearch' => $this->searchInputs->firstWhere('key', 'global'),

            'cursor'         => $this->query('cursor'),
            'sort'           => $this->query('sort', $this->defaultSort) ?: null,
            'defaultSort'    => $this->defaultSort,
            'page'           => Paginator::resolveCurrentPage($this->pageName),
            'pageName'       => $this->pageName,
            'perPageOptions' => $this->perPageOptions,
        ];
    }

    /**
     * Transform the columns collection so it can be used in the Inertia front-end.
     *
     * @return \Illuminate\Support\Collection
     */
    protected function transformColumns(): Collection
    {
        $columns = $this->query('columns', []);

        $sort = $this->query('sort', $this->defaultSort);

        return $this->columns->map(function (Column $column) use ($columns, $sort) {
            $key = $column->key;

            if (!empty($columns)) {
                $column->hidden = !in_array($key, $columns);
            }

            if ($sort === $key) {
                $column->sorted = 'asc';
            } elseif ($sort === "-{$key}") {
                $column->sorted = 'desc';
            }

            return $column;
        });
    }

    /**
     * Transform the search collection so it can be used in the Inertia front-end.
     *
     * @return \Illuminate\Support\Collection
     */
    protected function transformFilters(): Collection
    {
        $filters = $this->filters;

        $queryFilters = $this->query('filter', []);

        if (empty($queryFilters)) {
            return $filters;
        }

        return $filters->map(function (Filterable $filter) use ($queryFilters) {
            if (array_key_exists($filter->key, $queryFilters)) {
                if ($filter instanceof NumberRangeFilter) {
                    $filter->value = [
                        $queryFilters[$filter->key][0] ?? $filter->min,
                        $queryFilters[$filter->key][1] ?? $filter->max,
                    ];
                } elseif ($filter instanceof DateFilter) {
                    $filter->value = $queryFilters[$filter->key];
                } else {
                    $filter->value = $queryFilters[$filter->key];
                }
            }

            return $filter;
        });
    }

    /**
     * Transform the filters collection so it can be used in the Inertia front-end.
     *
     * @return \Illuminate\Support\Collection
     */
    protected function transformSearchInputs(): Collection
    {
        $filters = $this->query('filter', []);

        if (empty($filters)) {
            return $this->searchInputs;
        }

        return $this->searchInputs->map(function (SearchInput $searchInput) use ($filters) {
            if (array_key_exists($searchInput->key, $filters)) {
                $searchInput->value = $filters[$searchInput->key];
            }

            return $searchInput;
        });
    }

    /**
     * Add a column to the query builder.
     *
     * @param string|null $key
     * @param string|null $label
     * @param bool $canBeHidden
     * @param bool $hidden
     * @param bool $sortable
     * @param bool $searchable
     * @return self
     */
    public function column(string $key = null, string $label = null, bool $canBeHidden = true, bool $hidden = false, bool $sortable = false, bool $searchable = false, string $headerClass = '', string $bodyClass = ''): self
    {
        $key   = $key ?: Str::kebab($label);
        $label = $label ?: Str::headline($key);

        $this->columns = $this->columns->reject(function (Column $column) use ($key) {
            return $column->key === $key;
        })->push($column = new Column(
            key: $key,
            label: $label,
            canBeHidden: $canBeHidden,
            hidden: $hidden,
            sortable: $sortable,
            sorted: false,
            headerClass: $headerClass,
            bodyClass: $bodyClass
        ))->values();

        if ($searchable) {
            $this->searchInput($column->key, $column->label);
        }

        return $this;
    }

    /**
     * Helper method to add a global search input.
     *
     * @param string|null $label
     * @return self
     */
    public function withGlobalSearch(string $label = null): self
    {
        return $this->searchInput('global', $label ?: __('Search...'));
    }

    /**
     * Add a search input to query builder.
     *
     * @param string $key
     * @param string|null $label
     * @param string|null $defaultValue
     * @return self
     */
    public function searchInput(string $key, string $label = null, string $defaultValue = null): self
    {
        $this->searchInputs = $this->searchInputs->reject(function (SearchInput $searchInput) use ($key) {
            return $searchInput->key === $key;
        })->push(new SearchInput(
            key: $key,
            label: $label ?: Str::headline($key),
            value: $defaultValue
        ))->values();

        return $this;
    }

    /**
     * Add a select filter to the query builder.
     *
     * @param string $key
     * @param array $options
     * @param string|null $label
     * @param string|null $defaultValue
     * @param bool $noFilterOption
     * @param string|null $noFilterOptionLabel
     * @param string|null $column_key
     * @return self
     */
    public function selectFilter(string $key, array $options, string $label = null, string $defaultValue = null, bool $noFilterOption = true, string $noFilterOptionLabel = null): self
    {
        $this->filters = $this->filters->reject(function (Filterable $filter) use ($key) {
            return $filter->key === $key;
        })->push(new Filter(
            key: $key,
            label: $label ?: Str::headline($key),
            options: $options,
            value: $defaultValue,
            noFilterOption: $noFilterOption,
            noFilterOptionLabel: $noFilterOptionLabel ?: '-',
            type: 'select'
        ))->values();

        return $this;
    }

    /**
     * Add a toggle filter to the query builder.
     *
     * @param string $key
     * @param string|null $label
     * @param bool|null $defaultValue
     * @param string|null $column_key
     * @return self
     */
    public function toggleFilter(string $key, string $label = null, bool $defaultValue = null): self
    {
        $this->filters = $this->filters->reject(function (Filterable $filter) use ($key) {
            return $filter->key === $key;
        })->push(new ToggleFilter(
            key: $key,
            label: $label ?: Str::headline($key),
            value: $defaultValue
        ))->values();

        return $this;
    }

    /**
     * Add a number range filter to the query builder.
     *
     * @param string $key
     * @param float $max
     * @param float $min
     * @param string $prefix
     * @param string $suffix
     * @param float $step
     * @param string|null $label
     * @param array|null $defaultValue
     * @param string|null $column_key
     * @return self
     */
    public function numberRangeFilter(string $key, float $max, float $min = 0, string $prefix = '', string $suffix = '', float $step = 1, string $label = null, array $defaultValue = null): self
    {
        $this->filters = $this->filters->reject(function (Filterable $filter) use ($key) {
            //return $filter->key === $key;
        })->push(new NumberRangeFilter(
            key: $key,
            label: $label ?: Str::headline($key),
            max: $max,
            min: $min,
            prefix: $prefix,
            suffix: $suffix,
            step: $step,
            value: $defaultValue
        ))->values();

        return $this;
    }

    /**
     * Add a date filter to the query builder.
     *
     * @param string $key
     * @param string|null $label
     * @param array|null $defaultValue
     * @param string $format
     * @return self
     */
    public function dateFilter(string $key, string $label = null, array $defaultValue = null, string $format = 'Y-m-d'): self
    {
        $this->filters = $this->filters->reject(function (Filterable $filter) use ($key) {
            return $filter->key === $key;
        })->push(new DateFilter(
            key: $key,
            label: $label ?: Str::headline($key),
            value: $defaultValue,
            format: $format
        ))->values();

        return $this;
    }

    /**
     * Associate an existing filter with a column.
     *
     * @param string $columnKey
     * @param string $filterKey
     * @return self
     */
    public function addFilterToColumn(string $columnKey, string $filterKey): self
    {
        if (!isset($this->columnFilters[$columnKey])) {
            $this->columnFilters[$columnKey] = [];
        }

        $this->columnFilters[$columnKey][] = $filterKey;

        return $this;
    }

    /**
     * Give the query builder props to the given Inertia response.
     *
     * @param \Inertia\Response $response
     * @return \Inertia\Response
     */
    public function applyTo(Response $response): Response
    {
        $props = array_merge($response->getQueryBuilderProps(), [
            $this->name => $this->getQueryBuilderProps(),
        ]);

        return $response->with('queryBuilderProps', $props);
    }
}
