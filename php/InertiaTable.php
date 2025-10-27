<?php

namespace AdesinFr\LaravelQueryBuilderInertiaJs;

use AdesinFr\LaravelQueryBuilderInertiaJs\Filters\Filter;
use AdesinFr\LaravelQueryBuilderInertiaJs\Filters\Filterable;
use AdesinFr\LaravelQueryBuilderInertiaJs\Filters\NumberRangeFilter;
use AdesinFr\LaravelQueryBuilderInertiaJs\Filters\ToggleFilter;
use AdesinFr\LaravelQueryBuilderInertiaJs\Filters\DateFilter;
use AdesinFr\LaravelQueryBuilderInertiaJs\Filters\NumberFilter;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Response;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class InertiaTable
{
    private string $name          = 'default';
    private string $pageName      = 'page';
    private array $perPageOptions = [15, 30, 50, 100];
    private Request $request;
    private Collection $columns;
    private Collection $searchInputs;
    private Collection $filters;
    private array $columnFilters = [];
    private string $defaultSort = '';

    private array $data = [];
    private bool $handleExport = true;
    private ?QueryBuilder $queryBuilder = null;
    private $queryBuilderCallback = null;
    private $exportCallback = null;
    private string $paginateMethod = 'paginate';
    private ?string $resourceClass = null;
    private string $resourceName = 'data';
    private bool $infiniteScrolling = false;

    private static bool|string $defaultGlobalSearch = false;
    private static array $defaultQueryBuilderConfig = [];

    /**
     * Create a new fluent InertiaTable instance.
     *
     * @param Request|null $request
     * @return self
     */
    public static function make(?Request $request = null): self
    {
        return new self($request ?: request());
    }

    /**
     * Create multiple InertiaTable instances for a single view.
     *
     * @param string $view
     * @param array $props
     * @param Request|null $request
     * @return InertiaTableCollection
     */
    public static function view(string $view, array $props = [], ?Request $request = null): InertiaTableCollection
    {
        return new InertiaTableCollection($view, $props, $request ?: request());
    }

    /**
     * Add data to the Inertia response.
     *
     * @param array $data
     * @return self
     */
    public function with(array $data): self
    {
        $this->data = array_merge($this->data, $data);

        return $this;
    }

    /**
     * Enable or disable automatic export handling.
     *
     * @param bool $handle
     * @return self
     */
    public function handleExport(bool $handle = true): self
    {
        $this->handleExport = $handle;

        return $this;
    }

    /**
     * Set the QueryBuilder for export purposes.
     *
     * @param \Spatie\QueryBuilder\QueryBuilder $queryBuilder
     * @return self
     */
    public function withQueryBuilder(QueryBuilder $queryBuilder): self
    {
        $this->queryBuilder = $queryBuilder;

        return $this;
    }

    /**
     * Set a callback to create the QueryBuilder when needed.
     * This is useful for multi-table setups where QueryBuilder parameters 
     * need to be configured before creating the QueryBuilder.
     *
     * @param callable $callback
     * @return self
     */
    public function withQueryBuilderCallback(callable $callback): self
    {
        $this->queryBuilderCallback = $callback;

        return $this;
    }

    /**
     * Set a callback to handle CSV export manually.
     * The callback will receive the QueryBuilder instance as parameter.
     *
     * @param callable $callback
     * @return self
     */
    public function withExportCallback(callable $callback): self
    {
        $this->exportCallback = $callback;

        return $this;
    }

    /**
     * Set the pagination method.
     *
     * @param string $method
     * @return self
     */
    public function paginateMethod(string $method): self
    {
        $this->paginateMethod = $method;

        return $this;
    }

    /**
     * Set the resource class for data transformation.
     *
     * @param string|null $resourceClass
     * @return self
     */
    public function withResource(?string $resourceClass): self
    {
        $this->resourceClass = $resourceClass;

        return $this;
    }

    /**
     * Set the resource name for the data property in the response.
     *
     * @param string $resourceName
     * @return self
     */
    public function resourceName(string $resourceName): self
    {
        $this->resourceName = $resourceName;

        return $this;
    }

    /**
     * Enable infinite scrolling for this table.
     *
     * @return self
     */
    public function withInfiniteScrolling(): self
    {
        $this->infiniteScrolling = true;

        return $this;
    }

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
        if ($name === 'default') {
            // Pour la table par défaut, utiliser les noms de paramètres standards
            config(['query-builder.parameters.filter' => 'filter']);
            config(['query-builder.parameters.sort' => 'sort']);
            config(['query-builder.parameters.fields' => 'fields']);
            config(['query-builder.parameters.append' => 'append']);
            config(['query-builder.parameters.include' => 'include']);
        } else {
            // Pour les tables nommées, préfixer les paramètres
            config(['query-builder.parameters.filter' => $name . '_filter']);
            config(['query-builder.parameters.sort' => $name . '_sort']);
            config(['query-builder.parameters.fields' => $name . '_fields']);
            config(['query-builder.parameters.append' => $name . '_append']);
            config(['query-builder.parameters.include' => $name . '_include']);
        }

        // Log pour debug
        Log::debug('QueryBuilder parameters updated', [
            'table_name' => $name,
            'filter_param' => config('query-builder.parameters.filter'),
            'sort_param' => config('query-builder.parameters.sort'),
        ]);
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

        // Automatically set a unique pageName for this table to avoid conflicts
        // when multiple tables are used on the same page
        if ($name !== 'default') {
            $this->pageName = $name . 'Page';
        }

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

            'cursor'            => $this->query('cursor'),
            'sort'              => $this->query('sort', $this->defaultSort) ?: null,
            'defaultSort'       => $this->defaultSort,
            'page'              => Paginator::resolveCurrentPage($this->pageName),
            'pageName'          => $this->pageName,
            'perPageOptions'    => $this->perPageOptions,
            'infiniteScrolling' => $this->infiniteScrolling,
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
                } elseif ($filter instanceof NumberFilter) {
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
                // Only assign string values to SearchInput, skip arrays (like NumberFilter)
                if (is_string($filters[$searchInput->key]) || is_null($filters[$searchInput->key])) {
                    $searchInput->value = $filters[$searchInput->key];
                }
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
     * @param string $key
     * @param string|null $label
     * @param array|null $defaultValue
     * @param string $prefix
     * @param string $suffix
     * @param float $step
     * @return self
     */
    public function numberFilter(string $key, string $label = null, array $defaultValue = null, string $prefix = '', string $suffix = '', float $step = 1): self
    {
        $this->filters = $this->filters->reject(function (Filterable $filter) use ($key) {
            return $filter->key === $key;
        })->push(new NumberFilter(
            key: $key,
            label: $label ?: Str::headline($key),
            value: $defaultValue,
            prefix: $prefix,
            suffix: $suffix,
            step: $step
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

    /**
     * Generate the final Inertia response with export handling.
     *
     * @param string $view
     * @param array $props
     * @return \Inertia\Response|\Symfony\Component\HttpFoundation\Response|\Illuminate\Http\JsonResponse
     */
    public function render(string $view, array $props = [])
    {
        // Get the QueryBuilder (creating it if needed)
        $queryBuilder = $this->getQueryBuilder();


        // If we have a QueryBuilder, handle pagination internally
        if ($queryBuilder) {
            // Check if this is an export request BEFORE applying pagination
            if ($this->handleExport && $this->request->get('do_export') === '1') {
                return $this->handleCsvExport();
            }

            $paginatedData = $queryBuilder
                ->{$this->paginateMethod}(
                    $this->request->query('perPage', 15),
                    ['*'],
                    $this->pageName
                )
                ->withQueryString();

            // Handle resource transformation if requested
            if ($this->resourceClass) {
                $props[$this->resourceName] = $this->resourceClass::collection($paginatedData);
            } elseif (isset($props['resource']) && $props['resource'] === true) {
                // Fallback for backward compatibility
                $resourceClass = '\\App\\Http\\Resources\\UserResource';
                if (class_exists($resourceClass)) {
                    $props[$this->resourceName] = $resourceClass::collection($paginatedData);
                } else {
                    $props[$this->resourceName] = $paginatedData;
                }
                unset($props['resource']);
            } else {
                $props[$this->resourceName] = $paginatedData;
            }

            // If infinite scrolling is enabled and this is a JSON request, return JSON
            if ($this->infiniteScrolling && $this->request->wantsJson()) {
                return response()->json($paginatedData);
            }
        } else {
            // Check if this is an export request
            if ($this->handleExport && $this->request->get('do_export') === '1') {
                return $this->handleCsvExport();
            }
        }


        $this->data = array_merge($this->data, $props);

        // Create the standard Inertia response
        $response = Inertia::render($view, $this->data);

        return $this->applyTo($response);
    }

    /**
     * Check if this table should handle export based on request parameters.
     *
     * @param string $tableName
     * @return bool
     */
    public function shouldHandleExport(string $tableName): bool
    {
        return $this->handleExport &&
            $this->request->get('do_export') === '1' &&
            $this->request->get('table') === $tableName;
    }

    /**
     * Get the QueryBuilder, creating it from callback if necessary.
     *
     * @return \Spatie\QueryBuilder\QueryBuilder|null
     */
    private function getQueryBuilder(): ?QueryBuilder
    {
        // Always update query builder parameters based on table name
        static::updateQueryBuilderParameters($this->name);

        if ($this->queryBuilder) {
            return $this->queryBuilder;
        }

        if ($this->queryBuilderCallback) {
            $this->queryBuilder = call_user_func($this->queryBuilderCallback);
            return $this->queryBuilder;
        }

        return null;
    }

    /**
     * Get table data for rendering.
     *
     * @return array
     */
    public function getTableData(): array
    {
        $queryBuilder = $this->getQueryBuilder();

        if ($queryBuilder) {
            $paginatedData = $queryBuilder
                ->{$this->paginateMethod}(
                    $this->request->query('perPage', 15),
                    ['*'],
                    $this->pageName
                )
                ->withQueryString();

            // Handle resource transformation if requested
            if ($this->resourceClass) {
                return [$this->resourceName => $this->resourceClass::collection($paginatedData)];
            } else {
                return [$this->resourceName => $paginatedData];
            }
        }

        return [];
    }

    /**
     * Make handleCsvExport public for InertiaTableCollection.
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handleCsvExport()
    {
        $queryBuilder = $this->getQueryBuilder();

        if (!$queryBuilder) {
            return response('No query builder available for export', 400);
        }

        // If a custom export callback is defined, use it instead of the default export logic
        if ($this->exportCallback) {
            return call_user_func($this->exportCallback, $queryBuilder);
        }

        // Default export logic
        // Create a fresh query builder with the same base query but apply current request filters
        $exportQueryBuilder = clone $queryBuilder;

        // The QueryBuilder should automatically apply filters from the current request
        // But we need to make sure it's using the current request parameters
        $data = collect($exportQueryBuilder->get());

        if ($data->isEmpty()) {
            return response('No data to export', 204);
        }

        // Generate CSV
        $csv = $this->generateCsv($data);
        $filename = $this->name . '-export-' . now()->format('Y-m-d-H-i-s') . '.csv';

        return response($csv)
            ->header('Content-Type', 'text/csv; charset=utf-8')
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->header('Cache-Control', 'no-cache, no-store, must-revalidate')
            ->header('Pragma', 'no-cache')
            ->header('Expires', '0');
    }

    /**
     * Generate CSV content from data collection.
     *
     * @param \Illuminate\Support\Collection $data
     * @return string
     */
    protected function generateCsv(Collection $data): string
    {
        if ($data->isEmpty()) {
            return '';
        }

        $csv = "\xEF\xBB\xBF"; // UTF-8 BOM

        // Get headers from visible columns or first data item
        $visibleColumns = $this->columns->reject->hidden;

        if ($visibleColumns->isNotEmpty()) {
            $headers = $visibleColumns->map(function ($column) {
                return $column->label ?: Str::headline($column->key);
            });
        } else {
            // Fallback to first item keys
            $firstItem = $data->first();
            if (is_array($firstItem)) {
                $headers = collect(array_keys($firstItem));
            } elseif (is_object($firstItem)) {
                $headers = collect(array_keys((array) $firstItem));
            } else {
                $headers = collect(['Value']);
            }
        }

        // Add headers
        $csv .= $headers->map(function ($header) {
            return '"' . str_replace('"', '""', $header) . '"';
        })->join(',') . "\n";

        // Add data rows
        foreach ($data as $item) {
            $row = [];

            if ($visibleColumns->isNotEmpty()) {
                foreach ($visibleColumns as $column) {
                    $value = $this->getColumnValue($item, $column->key);
                    $row[] = '"' . str_replace('"', '""', $this->formatCsvValue($value)) . '"';
                }
            } else {
                // Fallback to all values
                $itemArray = is_array($item) ? $item : (array) $item;
                foreach ($itemArray as $value) {
                    $row[] = '"' . str_replace('"', '""', $this->formatCsvValue($value)) . '"';
                }
            }

            $csv .= implode(',', $row) . "\n";
        }

        return $csv;
    }

    /**
     * Get column value from item with dot notation support.
     *
     * @param mixed $item
     * @param string $key
     * @return mixed
     */
    protected function getColumnValue($item, string $key)
    {
        if (is_array($item)) {
            return data_get($item, $key);
        }

        if (is_object($item)) {
            // Try property access first, then array access
            if (isset($item->$key)) {
                return $item->$key;
            }

            return data_get($item, $key);
        }

        return $item;
    }

    /**
     * Format value for CSV output.
     *
     * @param mixed $value
     * @return string
     */
    protected function formatCsvValue($value): string
    {
        if ($value === null) {
            return '';
        }

        if (is_bool($value)) {
            return $value ? 'Yes' : 'No';
        }

        if ($value instanceof \DateTime) {
            return $value->format('Y-m-d H:i:s');
        }

        if (is_string($value) && (strtotime($value) !== false) && preg_match('/^\d{4}-\d{2}-\d{2}/', $value)) {
            return date('Y-m-d H:i:s', strtotime($value));
        }

        return (string) $value;
    }
}
