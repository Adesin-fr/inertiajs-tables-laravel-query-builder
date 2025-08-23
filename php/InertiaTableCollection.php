<?php

namespace AdesinFr\LaravelQueryBuilderInertiaJs;

use Illuminate\Http\Request;
use Inertia\Inertia;

class InertiaTableCollection
{
    private string $view;
    private array $props;
    private Request $request;
    private array $tables = [];

    public function __construct(string $view, array $props, Request $request)
    {
        $this->view = $view;
        $this->props = $props;
        $this->request = $request;
    }

    /**
     * Add a table to the collection.
     *
     * @param string $name
     * @param callable $callback
     * @return self
     */
    public function table(string $name, callable $callback): self
    {
        $table = new InertiaTable($this->request);
        $table->name($name);

        $callback($table);

        $this->tables[$name] = $table;

        return $this;
    }

    /**
     * Render the view with all tables.
     *
     * @return \Inertia\Response|\Symfony\Component\HttpFoundation\Response
     */
    public function render()
    {
        // Save current QueryBuilder parameters
        $originalConfig = config('query-builder.parameters');

        // Check if any table should handle export
        foreach ($this->tables as $name => $table) {
            if ($table->shouldHandleExport($name)) {
                // Set the correct parameters for this table
                InertiaTable::updateQueryBuilderParameters($name);
                $result = $table->handleCsvExport();
                // Restore original parameters
                config(['query-builder.parameters' => $originalConfig]);
                return $result;
            }
        }

        // Render normal view with all tables data
        $tablesData = [];
        foreach ($this->tables as $name => $table) {
            // Set the correct parameters for this table
            InertiaTable::updateQueryBuilderParameters($name);
            $tablesData[$name] = $table->getTableData();
        }

        // Restore original parameters
        config(['query-builder.parameters' => $originalConfig]);

        $response = Inertia::render($this->view, array_merge($this->props, $tablesData));

        // Apply query builder props for all tables
        foreach ($this->tables as $table) {
            $response = $table->applyTo($response);
        }

        return $response;
    }
}
