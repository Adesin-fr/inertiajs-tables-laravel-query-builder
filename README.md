# Inertia.js Tables for Laravel Query Builder

[![Latest Version on NPM](https://img.shields.io/npm/v/@adesin-fr/inertiajs-tables-laravel-query-builder.svg?style=flat-square)](https://npmjs.com/package/@adesin-fr/inertiajs-tables-laravel-query-builder)
[![npm](https://img.shields.io/npm/dt/@adesin-fr/inertiajs-tables-laravel-query-builder.svg?style=flat-square)](https://www.npmjs.com/package/@adesin-fr/inertiajs-tables-laravel-query-builder)
[![Latest Version on Packagist](https://img.shields.io/packagist/v/adesin-fr/inertiajs-tables-laravel-query-builder.svg?style=flat-square)](https://packagist.org/packages/adesin-fr/inertiajs-tables-laravel-query-builder)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)

This package provides a _DataTables-like_ experience for [Inertia.js](https://inertiajs.com/) with support for searching, filtering, sorting, toggling columns, and pagination. It generates URLs that can be consumed by Spatie's excellent [Laravel Query Builder](https://github.com/spatie/laravel-query-builder) package, with no additional logic needed. The components are styled with [Tailwind CSS 3.0](https://tailwindcss.com/), but it's fully customizable with slots. The data refresh logic is based on Inertia's [Ping CRM demo](https://github.com/inertiajs/pingcrm).

This package is a fork of [protonemedia/inertiajs-tables-laravel-query-builder], Since it has been abandonned in favor of a commercial project.

![Inertia.js Table for Laravel Query Builder](https://user-images.githubusercontent.com/8403149/177773377-86c32d69-8f86-47e4-8063-ea227e480d10.mp4)

## Features

-   **Fluent API**: New intuitive API for single and multiple tables ✅ **NEW!**
-   **CSV Export**: Automatic CSV export with all filtered data ✅ **NEW!**
-   **Number Filters**: Advanced number filtering with multiple comparison operators ✅ **NEW!**
-   **Multiple Tables**: Support for multiple independent tables in a single view ✅ **NEW!**
-   Auto-fill: auto generates `thead` and `tbody` with support for custom cells
-   Global Search
-   Search per field
-   Select filters
-   **Column Filters**: Add filter icons directly in column headers for intuitive filtering
-   Toggle columns
-   Sort columns
-   Pagination (support for Eloquent/API Resource/Simple/Cursor)
-   Automatically updates the query string (by using [Inertia's replace](https://inertiajs.com/manual-visits#browser-history) feature)
-   Customizable header and body cells classes
-   **Custom row styling**: Apply conditional CSS classes to table rows based on data
-   Resizeable columns ✅

## Compatibility

-   [Vue 3](https://v3.vuejs.org/guide/installation.html)
-   [Laravel 11](https://laravel.com/)
-   [Inertia.js](https://inertiajs.com/)
-   [Tailwind CSS v3](https://tailwindcss.com/) + [Forms plugin](https://github.com/tailwindlabs/tailwindcss-forms)
-   PHP 8.2+

## Installation

You need to install both the server-side package and the client-side package. Note that this package is only compatible with Laravel 10, Vue 3.0, and requires the Tailwind Forms plugin.

### Server-side installation (Laravel)

You can install the package via composer:

```bash
composer require adesin-fr/inertiajs-tables-laravel-query-builder
```

## Fluent API ✨ **NEW!**

The package now provides a modern fluent API that makes table configuration more intuitive and powerful.

### Single Table

For single table views, use the `InertiaTable::make()` method with a fluent syntax:

```php
use AdesinFr\LaravelQueryBuilderInertiaJs\InertiaTable;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

// Method 1: Direct QueryBuilder with callback
return InertiaTable::make()
    ->withQueryBuilder(
        QueryBuilder::for(User::class)
            ->allowedFilters([
                AllowedFilter::partial('name'),
                AllowedFilter::exact('status'),
                NumberFilter::getQueryBuilderFilter('age'),
            ])
            ->allowedSorts(['name', 'email', 'created_at'])
            ->defaultSort('name')
    )
    ->column('name', 'Name', sortable: true, searchable: true)
    ->column('email', 'Email', sortable: true, searchable: true)
    ->column('status', 'Status')
    ->column('age', 'Age', sortable: true)
    ->withGlobalSearch()
    ->selectFilter('status', [
        'active' => 'Active',
        'inactive' => 'Inactive',
    ])
    ->numberFilter('age', 'Age')
    ->render('Users/Index');

// Method 2: QueryBuilder callback (useful for multi-table setups)
return InertiaTable::make()
    ->withQueryBuilderCallback(function () {
        return QueryBuilder::for(User::class)
            ->allowedFilters([
                AllowedFilter::partial('name'),
                AllowedFilter::exact('status'),
                NumberFilter::getQueryBuilderFilter('age'),
            ])
            ->allowedSorts(['name', 'email', 'created_at'])
            ->defaultSort('name');
    })
    ->column('name', 'Name', sortable: true, searchable: true)
    ->column('email', 'Email', sortable: true, searchable: true)
    ->withResource(\App\Http\Resources\UserResource::class) // Optional resource transformation
    ->render('Users/Index');
```

### Multiple Tables

For views with multiple tables, use the `InertiaTable::view()` method:

```php
use AdesinFr\LaravelQueryBuilderInertiaJs\InertiaTable;

return InertiaTable::view('Dashboard/Index')
    ->table('users', function (InertiaTable $table) {
        $table->withQueryBuilderCallback(function () {
            // Configure query parameters for this table
            InertiaTable::updateQueryBuilderParameters('users');

            return QueryBuilder::for(User::class)
                ->allowedFilters([AllowedFilter::partial('name')])
                ->allowedSorts(['name', 'email'])
                ->defaultSort('name');
        })
        ->column('name', 'Name', sortable: true, searchable: true)
        ->column('email', 'Email', sortable: true)
        ->withGlobalSearch()
        ->paginateMethod('paginate');
    })
    ->table('products', function (InertiaTable $table) {
        $table->withQueryBuilderCallback(function () {
            // Configure query parameters for this table
            InertiaTable::updateQueryBuilderParameters('products');

            return QueryBuilder::for(Product::class)
                ->allowedFilters([
                    AllowedFilter::partial('title'),
                    NumberFilter::getQueryBuilderFilter('price')
                ])
                ->allowedSorts(['title', 'price'])
                ->defaultSort('title');
        })
        ->column('title', 'Title', sortable: true, searchable: true)
        ->column('price', 'Price', sortable: true)
        ->numberFilter('price', 'Price')
        ->paginateMethod('simplePaginate');
    })
    ->with(['customData' => 'Additional data for the view'])
    ->render();
```

### Additional Fluent API Methods

The fluent API provides many configuration options:

```php
return InertiaTable::make()
    ->name('custom-table')              // Table name for multi-table setups
    ->pageName('customPage')            // Custom pagination parameter name
    ->perPageOptions([10, 25, 50])     // Available per-page options
    ->defaultSort('created_at')         // Default sorting column
    ->handleExport(true)                // Enable/disable CSV export (default: true)
    ->paginateMethod('simplePaginate')  // Pagination method
    ->withResource(\App\Http\Resources\UserResource::class) // Resource transformation
    ->with(['additional' => 'data'])    // Additional data for the view
    ->render('Users/Index');
```

## Traditional API (Legacy)

You can still use the traditional callback-based API if needed:

```php
return Inertia::render('Users/Index')->table(function (InertiaTable $table) {
    $table->searchInput('name');
    $table->selectFilter('status', ['active' => 'Active']);
});
```

## Configuration

The package will automatically register the Service Provider which provides a `table` method you can use on an Interia Response.

### Getting started with Traditional API

By default, the package will search for the `routes/web.php` file and check for a route with the "search" name. If you have different setup, you can define the route in your configuration file.

As described above, the package will detect if you use [Spatie's Query Builder](https://github.com/spatie/laravel-query-builder). This usually means the root you're using looks somewhat like this:

```php
$users = QueryBuilder::for(User::class)->paginate($request->perPage ?: 10);

return Inertia::render('Users/Index', [
    'users' => $users
]);
```

#### Search fields

With the `searchInput` method, you can specify which attributes are searchable. Search queries are passed to the URL query as a `filter`. This integrates seamlessly with the [filtering feature](https://spatie.be/docs/laravel-query-builder/v5/features/filtering) of the Laravel Query Builder package.

Though it's enough to pass in the column key, you may specify a custom label and default value.

```php
use AdesinFr\LaravelQueryBuilderInertiaJs\InertiaTable;

Inertia::render('Page/Index')->table(function (InertiaTable $table) {
	$table->searchInput('name');

	$table->searchInput(
		key: 'framework',
		label: 'Find your framework',
		defaultValue: 'Laravel'
	);
});
```

#### Select Filters

Select Filters are similar to search fields but use a `select` element instead of an `input` element. This way, you can present the user a predefined set of options. Under the hood, this uses the same filtering feature of the Laravel Query Builder package.

The `selectFilter` method requires two arguments: the key, and a key-value array with the options.

```php
Inertia::render('Page/Index')->table(function (InertiaTable $table) {
	$table->selectFilter('language_code', [
		'en' => 'Engels',
		'nl' => 'Nederlands',
	]);
});
```

The `selectFilter` will, by default, add a _no filter_ option to the array. You may disable this or specify a custom label for it.

```php
Inertia::render('Page/Index')->table(function (InertiaTable $table) {
	$table->selectFilter(
		key: 'language_code',
		options: $languages,
		label: 'Language',
		defaultValue: 'nl',
		noFilterOption: true,
		noFilterOptionLabel: 'All languages'
	);
});
```

#### Boolean Filters

This way, you can present the user a toggle. Under the hood, this uses the same filtering feature of the Laravel Query Builder package.

The `toggleFilter` method requires one argument: the key.

```php
Inertia::render('Page/Index')->table(function (InertiaTable $table) {
	$table->toggleFilter('is_verified');
});
```

You can specify a custom label for it and a default value.

```php
Inertia::render('Page/Index')->table(function (InertiaTable $table) {
	$table->toggleFilter(
		key: 'is_verified',
		label: 'Is email verified',
		defaultValue: true,
	);
});
```

#### Number range Filters

This way, you can present the user a toggle. Under the hood, this uses the same filtering feature of the Laravel Query Builder package.

The `numberRangeFilter` method requires two arguments: the key and the max value.

```php
Inertia::render('Page/Index')->table(function (InertiaTable $table) {
	$table->numberRangeFilter('invoice_recall_count', 5);
});
```

You can specify a some other params.

```php
Inertia::render('Page/Index')->table(function (InertiaTable $table) {
	$table->numberRangeFilter(
		key: 'invoice_recall_count',
		max: 5,
		min: 0,
		prefix: '',
		suffix: '',
		step: 1,
		label: 'Invoice recall count',
		defaultValue: [1,4],
	);
});
```

You need to use a custom allowed filter for this filter.

```php
$users = QueryBuilder::for(/*...*/)
			->allowedFilters([NumberRangeFilter::getQueryBuilderFilter('invoice_recall_count')]);
```

#### Number Filters ✨ **NEW!**

The `numberFilter` provides advanced comparison operations similar to date filters. You can filter by exact match, greater than, less than, between ranges, and more.

```php
Inertia::render('Page/Index')->table(function (InertiaTable $table) {
	$table->numberFilter('age');
});
```

The Number Filter supports 6 different comparison operations:

-   **Exact**: Find records with exact value
-   **Greater than**: Find records greater than specified value
-   **Greater than or equal**: Find records greater than or equal to specified value
-   **Less than**: Find records less than specified value
-   **Less than or equal**: Find records less than or equal to specified value
-   **Between**: Find records within a specified range

You can customize the filter with additional parameters:

```php
Inertia::render('Page/Index')->table(function (InertiaTable $table) {
	$table->numberFilter(
		key: 'age',
		label: 'Filter by age',
		defaultOperation: 'greater_than',
		defaultValue: 18,
		column_key: 'age' // Associate with a specific column
	);
});
```

You need to use the custom NumberFilter for this filter:

```php
use AdesinFr\LaravelQueryBuilderInertiaJs\Filters\NumberFilter;

$users = QueryBuilder::for(User::class)
		->allowedFilters([
			NumberFilter::getQueryBuilderFilter('age')
		]);
```

```php
$users = QueryBuilder::for(/*...*/)
			->allowedFilters([NumberRangeFilter::getQueryBuilderFilter('invoice_recall_count')]);
```

#### Column Filters ✨ **NEW!**

You can now place filter icons directly in column headers for a more intuitive user experience. Each filter can be associated with a specific column using the `column_key` parameter.

```php
Inertia::render('Page/Index')->table(function (InertiaTable $table) {
	$table->column('name', 'Name')
		  ->column('status', 'Status')
		  ->column('email', 'Email')
		  ->column('created_at', 'Created');

	// Associate a select filter with the 'status' column
	$table->selectFilter(
		key: 'status',
		options: [
			'active' => 'Active',
			'inactive' => 'Inactive',
			'pending' => 'Pending'
		],
		label: 'Status',
		column_key: 'status' // 🎯 Associates the filter with the status column
	);

	// Associate a toggle filter with the 'email' column
	$table->toggleFilter(
		key: 'email_verified',
		label: 'Email Verified',
		column_key: 'email'
	);

	// Associate a number range filter with the 'created_at' column
	$table->numberRangeFilter(
		key: 'days_since_creation',
		max: 365,
		min: 0,
		label: 'Days Since Creation',
		column_key: 'created_at'
	);
});
```

**Features:**

-   🎯 **Visual Association**: Filter icons appear directly in column headers
-   🎨 **Active State Indicator**: Icons change color when filters are applied
-   📱 **Responsive Dropdown**: Clean dropdown interface for filter options
-   🔄 **Backward Compatible**: Existing filters without `column_key` still work in the global filter bar

**Benefits:**

-   More intuitive user experience
-   Better visual organization
-   Space-efficient interface
-   Clear association between filters and data columns

For detailed examples and usage, see [COLUMN_FILTERS.md](COLUMN_FILTERS.md).

#### Columns

With the `column` method, you can specify which columns you want to be toggleable, sortable, and searchable. You must pass in at least a key or label for each column.

```php
Inertia::render('Page/Index')->table(function (InertiaTable $table) {
	$table->column('name', 'User Name');

	$table->column(
		key: 'name',
		label: 'User Name',
		canBeHidden: true,
		hidden: false,
		sortable: true,
		searchable: true
		headerClass: 'hidden md:table-cell', // This cell will be hidden on small screens
		bodyClass: 'hidden md:table-cell', // This cell will be hidden on small screens
	);
});
```

The `searchable` option is a shortcut to the `searchInput` method. The example below will essentially call `$table->searchInput('name', 'User Name')`.

#### Global Search

You may enable Global Search with the `withGlobalSearch` method, and optionally specify a placeholder.

```php
Inertia::render('Page/Index')->table(function (InertiaTable $table) {
	$table->withGlobalSearch();

	$table->withGlobalSearch('Search through the data...');
});
```

If you want to enable Global Search for every table by default, you may use the static `defaultGlobalSearch` method, for example, in the `AppServiceProvider` class:

```php
InertiaTable::defaultGlobalSearch();
InertiaTable::defaultGlobalSearch('Default custom placeholder');
InertiaTable::defaultGlobalSearch(false); // disable
```

#### Example controller

Here are examples using both the new fluent API and the traditional API:

#### Fluent API Example (Recommended)

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Resources\UserResource;
use AdesinFr\LaravelQueryBuilderInertiaJs\InertiaTable;
use AdesinFr\LaravelQueryBuilderInertiaJs\Filters\NumberFilter;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class UserIndexController
{
    public function __invoke()
    {
        $globalSearch = AllowedFilter::callback('global', function ($query, $value) {
            $query->where(function ($query) use ($value) {
                Collection::wrap($value)->each(function ($value) use ($query) {
                    $query
                        ->orWhere('name', 'LIKE', "%{$value}%")
                        ->orWhere('email', 'LIKE', "%{$value}%");
                });
            });
        });

        return InertiaTable::make()
            ->withQueryBuilder(
                QueryBuilder::for(User::class)
                    ->defaultSort('name')
                    ->allowedSorts(['name', 'email', 'created_at'])
                    ->allowedFilters([
                        'name',
                        'email',
                        'status',
                        NumberFilter::getQueryBuilderFilter('age'),
                        $globalSearch
                    ])
            )
            ->withGlobalSearch()
            ->defaultSort('name')
            ->column('name', 'User Name', canBeHidden: false, sortable: true, searchable: true)
            ->column('email', 'Email Address', sortable: true, searchable: true)
            ->column('status', 'Status')
            ->column('age', 'Age', sortable: true)
            ->column('created_at', 'Created', sortable: true)
            ->column('actions', 'Actions', canBeHidden: false, sortable: false)
            ->selectFilter('status', [
                'active' => 'Active',
                'inactive' => 'Inactive',
                'pending' => 'Pending'
            ])
            ->numberFilter('age', 'Filter by Age')
            ->withResource(UserResource::class)
            ->handleExport(true)
            ->render('Users/Index');
    }
}
```

#### Traditional API Example (Legacy)

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use AdesinFr\LaravelQueryBuilderInertiaJs\InertiaTable;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class UserIndexController
{
	public function __invoke()
	{
		$globalSearch = AllowedFilter::callback('global', function ($query, $value) {
			$query->where(function ($query) use ($value) {
				Collection::wrap($value)->each(function ($value) use ($query) {
					$query
						->orWhere('name', 'LIKE', "%{$value}%")
						->orWhere('email', 'LIKE', "%{$value}%");
				});
			});
		});

		$users = QueryBuilder::for(User::class)
			->defaultSort('name')
			->allowedSorts(['name', 'email', 'language_code'])
			->allowedFilters(['name', 'email', 'language_code', $globalSearch])
			->paginate()
			->withQueryString();

		return Inertia::render('Users/Index', [
			'users' => $users,
		])->table(function (InertiaTable $table) {
			$table
			  ->withGlobalSearch()
			  ->defaultSort('name')
			  ->column(key: 'name', searchable: true, sortable: true, canBeHidden: false)
			  ->column(key: 'email', searchable: true, sortable: true)
			  ->column(key: 'language_code', label: 'Language')
			  ->column(label: 'Actions')
			  ->selectFilter(key: 'language_code', label: 'Language', options: [
				  'en' => 'English',
				  'nl' => 'Dutch',
			  ]);
		});
	}
}
```

### Client-side installation (Inertia)

You can install the package via either `npm` or `yarn`:

```bash
npm install @adesin-fr/inertiajs-tables-laravel-query-builder --save

yarn add @adesin-fr/inertiajs-tables-laravel-query-builder
```

Add the repository path to the `content` array of your [Tailwind configuration file](https://tailwindcss.com/docs/content-configuration). This ensures that the styling also works on production builds.

```js
module.exports = {
    content: [
        "./node_modules/@adesin-fr/inertiajs-tables-laravel-query-builder/**/*.{js,vue}",
    ],
};
```

#### Table component

To use the `Table` component and all its related features, you must import the `Table` component and pass the `users` data to the component.

```vue
<script setup>
import { Table } from "@adesin-fr/inertiajs-tables-laravel-query-builder";

defineProps(["users"]);
</script>

<template>
    <Table :resource="users" />
</template>
```

The `resource` property automatically detects the data and additional pagination meta data. You may also pass this manually to the component with the `data` and `meta` properties:

```vue
<template>
    <Table :data="users.data" :meta="users.meta" />
</template>
```

If you want to manually render the table, like in v1 of this package, you may use the `head` and `body` slot. Additionally, you can still use the `meta` property to render the paginator.

```vue
<template>
    <Table :meta="users">
        <template #head>
            <tr>
                <th>User</th>
            </tr>
        </template>

        <template #body>
            <tr v-for="(user, key) in users.data" :key="key">
                <td>{{ user.name }}</td>
            </tr>
        </template>
    </Table>
</template>
```

The `Table` has some additional properties to tweak its front-end behaviour.

```vue
<template>
    <Table
        :striped="true"
        :prevent-overlapping-requests="false"
        :input-debounce-ms="1000"
        :preserve-scroll="true"
    />
</template>
```

| Property                   | Description                                                                                                                                                                                               | Default |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| striped                    | Adds a _striped_ layout to the table.                                                                                                                                                                     | `false` |
| preventOverlappingRequests | Cancels a previous visit on new user input to prevent an inconsistent state.                                                                                                                              | `true`  |
| inputDebounceMs            | Number of ms to wait before refreshing the table on user input.                                                                                                                                           | 350     |
| preserveScroll             | Configures the [Scroll preservation](https://inertiajs.com/scroll-management#scroll-preservation) behavior. You may also pass `table-top` to this property to scroll to the top of the table on new data. | false   |
| rowClass                   | A function that receives the row item as parameter and returns a CSS class string to apply to the table row. Useful for conditional row styling.                                                          | `null`  |
| paginationClickCallback    | A function that receives the pagination URL as parameter and handles custom pagination logic instead of the default Inertia navigation.                                                                   | `null`  |

#### Custom Pagination Callback ✨ **NEW!**

You can now provide a custom callback function to handle pagination clicks instead of the default Inertia navigation. This is useful when you want to implement custom data loading logic, API calls, or state management for pagination.

```vue
<template>
    <Table
        :resource="users"
        :pagination-click-callback="handleCustomPagination"
    />
</template>

<script setup>
import { ref } from "vue";

const users = ref(props.users);
const isLoading = ref(false);

const handleCustomPagination = async (url) => {
    console.log("Custom pagination triggered for:", url);

    isLoading.value = true;

    try {
        // Custom logic for fetching data
        const response = await fetch(url, {
            headers: {
                Accept: "application/json",
                "X-Inertia": "true",
            },
        });

        const data = await response.json();

        // Update your component's data
        users.value = data.users;

        // You can also update other parts of your application state
        // emit events, update stores, etc.
    } catch (error) {
        console.error("Pagination error:", error);
        // Handle error (show notification, fallback, etc.)
    } finally {
        isLoading.value = false;
    }
};
</script>
```

**Key Features:**

-   **Full Control**: Complete control over pagination behavior
-   **Async Support**: Handle async operations like API calls
-   **Error Handling**: Implement custom error handling and loading states
-   **State Management**: Integrate with your preferred state management solution
-   **Backward Compatible**: When not provided, falls back to default Inertia navigation
-   **URL Preservation**: Receives the complete pagination URL with all filters and parameters

**Use Cases:**

-   **SPA Behavior**: Implement single-page application pagination without page reloads
-   **API Integration**: Fetch data from external APIs instead of server-side rendering
-   **Custom Loading States**: Show custom loading indicators and animations
-   **State Persistence**: Maintain complex application state during pagination
-   **Analytics Tracking**: Track pagination interactions for analytics
-   **Performance Optimization**: Implement custom caching or data optimization strategies

For a complete example, see [examples/PaginationCallbackExample.vue](examples/PaginationCallbackExample.vue).

The `Table` has some events that you can use

-   rowClicked: this event is fired when the user click on the row. The event give you this informations: event, item, key. Be careful if you use this event with a clickable element inside the row like an action button. Don't forget to use `event.stopPropagation()` for all other clickable elements

#### Custom row styling

You can apply custom CSS classes to table rows based on the row data using the `rowClass` property. This function receives the row item as a parameter and should return a CSS class string.

```vue
<template>
    <Table :resource="users" :row-class="getRowClass"> </Table>
</template>

<script setup>
import { defineProps } from "vue";

defineProps(["users"]);

const getRowClass = (user) => {
    if (user.status === "inactive") {
        return "opacity-50 bg-red-50";
    }
    if (user.role === "admin") {
        return "bg-blue-50 border-l-4 border-blue-500";
    }
    if (
        user.created_at &&
        new Date(user.created_at) >
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ) {
        return "bg-green-50";
    }
    return null; // No custom class
};
</script>
```

For more advanced examples of custom row styling, see [examples/RowClassExamples.vue](examples/RowClassExamples.vue).

#### Custom column cells

When using _auto-fill_, you may want to transform the presented data for a specific column while leaving the other columns untouched. For this, you may use a cell template. This example is taken from the [Example Controller](#example-controller) above.

```vue
<template>
    <Table :resource="users">
        <template #cell(actions)="{ item: user }">
            <a :href="`/users/${user.id}/edit`"> Edit </a>
        </template>
    </Table>
</template>
```

#### Custom header cells

When using _auto-fill_, you may want to transform the presented data for a specific header while leaving the other columns untouched. For this, you may use a header template. This example is taken from the [Example Controller](#example-controller) above.

```vue
<template>
    <Table :resource="users">
        <template #header(email)="{ label: label, column: column }">
            <span class="lowercase">{{ label }}</span>
        </template>
    </Table>
</template>
```

#### Multiple tables per page

You may want to use more than one table component per page. The new fluent API makes this much easier with the `InertiaTable::view()` method.

#### Using the New Fluent API (Recommended)

```php
use AdesinFr\LaravelQueryBuilderInertiaJs\InertiaTable;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

return InertiaTable::view('TwoTables')
    ->table('companies', function (InertiaTable $table) {
        $table->withQueryBuilderCallback(function () {
            // Update query parameters for this table
            InertiaTable::updateQueryBuilderParameters('companies');

            return QueryBuilder::for(Company::class)
                ->defaultSort('name')
                ->allowedSorts(['name', 'email'])
                ->allowedFilters(['name', 'email']);
        })
        ->pageName('companiesPage')
        ->column('name', 'Company Name', searchable: true, sortable: true)
        ->column('email', 'Contact Email', searchable: true, sortable: true)
        ->column('address', 'Address', searchable: true)
        ->withGlobalSearch()
        ->defaultSort('name');
    })
    ->table('users', function (InertiaTable $table) {
        $table->withQueryBuilderCallback(function () {
            // Update query parameters for this table
            InertiaTable::updateQueryBuilderParameters('users');

            return QueryBuilder::for(User::class)
                ->defaultSort('name')
                ->allowedSorts(['name', 'email'])
                ->allowedFilters(['name', 'email']);
        })
        ->pageName('usersPage')
        ->column('name', 'User Name', searchable: true, sortable: true)
        ->column('email', 'User Email', searchable: true, sortable: true)
        ->withGlobalSearch()
        ->defaultSort('name');
    })
    ->render();
```

#### Using the Traditional API (Legacy)

You may want to use more than one table component per page. Displaying the data is easy, but using features like filtering, sorting, and pagination requires a slightly different setup. For example, by default, the `page` query key is used for paginating the data set, but now you want two different keys for each table. Luckily, this package takes care of that and even provides a helper method to support Spatie's query package. To get this to work, you need to _name_ your tables.

Let's take a look at Spatie's `QueryBuilder`. In this example, there's a table for the companies and a table for the users. We name the tables accordingly. So first, call the static `updateQueryBuilderParameters` method to tell the package to use a different set of query parameters. Now, `filter` becomes `companies_filter`, `column` becomes `companies_column`, and so forth. Secondly, change the `pageName` of the database paginator.

```php
InertiaTable::updateQueryBuilderParameters('companies');

$companies = QueryBuilder::for(Company::query())
	->defaultSort('name')
	->allowedSorts(['name', 'email'])
	->allowedFilters(['name', 'email'])
	->paginate(pageName: 'companiesPage')
	->withQueryString();

InertiaTable::updateQueryBuilderParameters('users');

$users = QueryBuilder::for(User::query())
	->defaultSort('name')
	->allowedSorts(['name', 'email'])
	->allowedFilters(['name', 'email'])
	->paginate(pageName: 'usersPage')
	->withQueryString();
```

Then, we need to apply these two changes to the `InertiaTable` class. There's a `name` and `pageName` method to do so.

```php
return Inertia::render('TwoTables', [
	'companies' => $companies,
	'users'     => $users,
])->table(function (InertiaTable $inertiaTable) {
	$inertiaTable
		->name('users')
		->pageName('usersPage')
		->defaultSort('name')
		->column(key: 'name', searchable: true)
		->column(key: 'email', searchable: true);
})->table(function (InertiaTable $inertiaTable) {
	$inertiaTable
		->name('companies')
		->pageName('companiesPage')
		->defaultSort('name')
		->column(key: 'name', searchable: true)
		->column(key: 'address', searchable: true);
});
```

Lastly, pass the correct `name` property to each table in the Vue template. Optionally, you may set the `preserve-scroll` property to `table-top`. This makes sure to scroll to the top of the table on new data. For example, when changing the page of the _second_ table, you want to scroll to the top of the table, instead of the top of the page.

```vue
<script setup>
import { Table } from "@adesin-fr/inertiajs-tables-laravel-query-builder";

defineProps(["companies", "users"]);
</script>

<template>
    <Table :resource="companies" name="companies" preserve-scroll="table-top" />

    <Table :resource="users" name="users" preserve-scroll="table-top" />
</template>
```

#### Pagination translations

You can override the default pagination translations with the `setTranslations` method. You can do this in your main JavaScript file:

```js
import { setTranslations } from "@adesin-fr/inertiajs-tables-laravel-query-builder";

setTranslations({
    next: "Next",
    no_results_found: "No results found",
    of: "of",
    per_page: "per page",
    previous: "Previous",
    results: "results",
    to: "to",
    search: "Search",
    reset: "Reset",
    grouped_reset: "Reset",
    add_search_fields: "Add search field",
    show_hide_columns: "Show / Hide columns",
});
```

#### Table.vue slots

The `Table.vue` has several slots that you can use to inject your own implementations.

| Slot              | Description                                                                            |
| ----------------- | -------------------------------------------------------------------------------------- |
| table             | The actual table element.                                                              |
| tableColumns      | The location of the button + dropdown to toggle columns.                               |
| tableFilter       | The location of the button + dropdown to select filters.                               |
| tableGlobalSearch | The location of the input element that handles the global search.                      |
| tableReset        | The location of the button that resets the table.                                      |
| tableAddSearchRow | The location of the button + dropdown to add additional search rows.                   |
| tableSearchRows   | The location of the input elements that handle the additional search rows.             |
| tableWrapper      | The component that _wraps_ the table element, handling overflow, shadow, padding, etc. |
| head              | The location of the table header.                                                      |
| body              | The location of the table body.                                                        |
| exportButton      | The CSV export button. Provides `exportUrl` and `translations` as slot props.          |
| with-grouped-menu | Use the grouped menu instead of multiple buttons                                       |
| pagination        | The location of the paginator.                                                         |
| color             | The style of the table                                                                 |

Each slot is provided with props to interact with the parent `Table` component.

```vue
<template>
    <Table>
        <template v-slot:tableGlobalSearch="slotProps">
            <input
                placeholder="Custom Global Search Component..."
                @input="slotProps.onChange($event.target.value)"
            />
        </template>
    </Table>
</template>
```

#### Customizing the Export Button

The `exportButton` slot allows you to customize the CSV export functionality with your own button design and behavior:

```vue
<template>
    <Table :resource="users" :show-export-button="true">
        <!-- Custom export button with different styling -->
        <template #exportButton="{ exportUrl, translations }">
            <button
                @click="customExportFunction(exportUrl)"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                <svg
                    class="h-4 w-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                    />
                </svg>
                {{ translations.export_csv }}
            </button>
        </template>
    </Table>
</template>

<script setup>
const customExportFunction = (exportUrl) => {
    // Add custom logic before export
    console.log("Starting export...");

    // Perform the actual export
    window.location.href = exportUrl;

    // Add custom logic after export
    // e.g., analytics tracking, notifications, etc.
};
</script>
```

You can also create more complex export options:

```vue
<template>
    <Table :resource="users" :show-export-button="true">
        <!-- Export dropdown with multiple options -->
        <template #exportButton="{ exportUrl, translations }">
            <div class="relative">
                <button
                    @click="toggleExportMenu"
                    class="px-4 py-2 border rounded-md bg-white hover:bg-gray-50"
                >
                    Export Options
                    <svg
                        class="h-4 w-4 ml-2 inline"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        />
                    </svg>
                </button>
                <div
                    v-if="showMenu"
                    class="absolute mt-2 w-48 bg-white rounded-md shadow-lg border"
                >
                    <a
                        :href="exportUrl"
                        class="block px-4 py-2 hover:bg-gray-100"
                    >
                        Export as CSV
                    </a>
                    <button
                        @click="exportAsExcel"
                        class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Export as Excel
                    </button>
                    <button
                        @click="exportAsPDF"
                        class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Export as PDF
                    </button>
                </div>
            </div>
        </template>
    </Table>
</template>
```

### Customizations available

You can customize some parts of the table.

Provide an object with the desired customizations in `app.js` file like this:

```javascript
const themeVariables = {
    inertia_table: {
        per_page_selector: {
            select: {
                primary: "your classes",
            },
        },
    },
};

createInertiaApp({
    progress: {
        color: "#4B5563",
    },
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue"),
        ),
    setup({ el, App, props, plugin }) {
        return (
            createApp({ render: () => h(App, props) })
                // ...
                .provide("themeVariables", themeVariables)
                // ...
                .mount(el)
        );
    },
});
```

You can customize the default style by overiding the default style like that:

```javascript
const themeVariables = {
    inertia_table: {
        per_page_selector: {
            select: {
                base: "block min-w-max shadow-sm text-sm rounded-md",
                color: {
                    primary:
                        "border-gray-300 focus:ring-yellow-500 focus:border-yellow-500",
                },
            },
        },
    },
};
```

Or you can create a new style and using the `color` prop on the `Table.vue`

```javascript
const themeVariables = {
    inertia_table: {
        select: {
            base: "block min-w-max shadow-sm text-sm rounded-md",
            color: {
                red_style:
                    "border-gray-300 focus:ring-red-500 focus:border-red-500",
            },
        },
    },
};
```

```vue
<template>
    <Table color="red_style" />
</template>
```

Available customizations

```javascript
const themeVariables = {
	inertia_table: {
		button_with_dropdown: {
			button: {
				 base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
				color: {
					primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
					dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500",
				},
			},
		},
		per_page_selector: {
			select: {
				base: "block min-w-max shadow-sm text-sm rounded-md",
				color: {
					primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
					dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500",
				},
			},
		},
		table_filter: {
		   select_filter: {
				select: {
					base: "block w-full shadow-sm text-sm rounded-md",
					color: {
						primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
						dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500",
					},
				},
		},
		togle_filter: {
			toggle: {
				base: "w-11 h-6 rounded-full after:border after:rounded-full after:h-5 after:w-5",
				color: {
					primary: "after:bg-white after:border-white peer-checked:bg-indigo-500 bg-red-500",
					dootix: "after:bg-white after:border-white peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-blue-600 bg-red-500",
					disabled: "after:bg-white after:border-white bg-gray-200",
				}
			},
			reset_button: {
				base: "rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2",
				color: {
					primary: "text-gray-400 hover:text-gray-500 focus:ring-indigo-500",
					dootix: "text-gray-400 hover:text-gray-500 focus:ring-cyan-500",
				},
		},
		   number_range_filter: {
				main_bar: {
					base: "h-2 rounded-full",
					color: {
						primary: "bg-gray-200",
						dootix: "bg-gray-200",
					},
				},
				selected_bar: {
					base: "h-2 rounded-full",
					color: {
						primary: "bg-indigo-600",
						dootix: "bg-gradient-to-r from-cyan-500 to-blue-600",
					},
				},
				button: {
					base: "h-4 w-4 rounded-full shadow border",
					color: {
						primary: "bg-white border-gray-300",
						dootix: "bg-white border-gray-300",
					},
				},
				popover: {
					base: "truncate text-xs rounded py-1 px-4",
					color: {
						primary: "bg-gray-600 text-white",
						dootix: "bg-gray-600 text-white",
					},
				},
				popover_arrow: {
					color: {
						primary: "text-gray-600",
						dootix: "text-gray-600",
					},
				},
				text: {
					color: {
						primary: "text-gray-700",
						dootix: "text-gray-700",
					},
				},
		global_search: {
			 base: "block w-full pl-9 text-sm rounded-md shadow-sm",
				color: {
					primary: "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300",
					dootix: "focus:ring-cyan-500 focus:border-blue-500 border-gray-300",
				},
		},
		reset_button: {
			 base: "w-full border rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
				color: {
					primary: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-indigo-500",
					dootix: "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 focus:ring-cyan-500",
				},
		},
		table_search_rows: {
			input: {
				base: "flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md text-sm",
				color: {
					primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
					dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500",
				},
			},
			remove_button: {
				base: "rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2",
				color: {
					primary: "text-gray-400 hover:text-gray-500 focus:ring-indigo-500",
					dootix: "text-gray-400 hover:text-gray-500 focus:ring-cyan-500",
				},
			},
		},
	},
}
```

## CSV Export ✨ **NEW!**

The package now includes a powerful CSV export feature that automatically exports all filtered data, not just the current page.

### Automatic CSV Export

CSV export is automatically enabled for all tables. An export button will appear in the table interface, and the export URL automatically includes all current filters and search parameters.

#### Single Table Export

```php
// Fluent API - CSV export is automatically enabled
return InertiaTable::make()
    ->withQueryBuilder(
        QueryBuilder::for(User::class)
            ->allowedFilters([AllowedFilter::partial('name')])
            ->allowedSorts(['name', 'email', 'created_at'])
            ->defaultSort('name')
    )
    ->column('name', 'Name', sortable: true, searchable: true)
    ->column('email', 'Email', sortable: true, searchable: true)
    ->column('created_at', 'Created At', sortable: true)
    ->withGlobalSearch()
    ->selectFilter('status', ['active' => 'Active', 'inactive' => 'Inactive'])
    ->handleExport(true) // Explicitly enable (default: true)
    ->render('Users/Index');

// Traditional API - CSV export is automatically enabled
return Inertia::render('Users/Index', ['users' => $users])
    ->table(function (InertiaTable $table) {
        $table->column('name', 'Name')
              ->column('email', 'Email')
              ->searchInput('name')
              ->handleExport(true); // Explicitly enable (default: true)
    });
```

#### Multiple Table Export

When using multiple tables, each table gets its own export button with the appropriate table identifier:

```php
return InertiaTable::view('Dashboard/Index')
    ->table('users', function (InertiaTable $table) {
        $table->withQueryBuilderCallback(function () {
            InertiaTable::updateQueryBuilderParameters('users');
            return QueryBuilder::for(User::class)
                ->allowedFilters([AllowedFilter::partial('name')]);
        })
        ->column('name', 'Name', searchable: true)
        ->column('email', 'Email')
        ->withGlobalSearch();
        // CSV export is automatically enabled for this table
    })
    ->table('products', function (InertiaTable $table) {
        $table->withQueryBuilderCallback(function () {
            InertiaTable::updateQueryBuilderParameters('products');
            return QueryBuilder::for(Product::class)
                ->allowedFilters([AllowedFilter::partial('title')]);
        })
        ->column('title', 'Title', searchable: true)
        ->column('price', 'Price');
        // CSV export is automatically enabled for this table
    })
    ->render();
```

### Disabling CSV Export

If you want to disable CSV export for a specific table:

```php
return InertiaTable::make()
    ->withQueryBuilder($queryBuilder)
    ->column('name', 'Name')
    ->handleExport(false) // Disable CSV export
    ->render('Users/Index');
```

### CSV Export Features

-   **Complete Data Export**: Exports all filtered data, not just the current page
-   **Automatic Filtering**: Export URLs automatically include all active filters and search parameters
-   **UTF-8 Support**: Proper encoding with BOM for international characters
-   **Reactive URLs**: Export URLs update automatically when filters change
-   **Multiple Tables**: Each table in multi-table views has its own export functionality
-   **Proper CSV Formatting**: Automatic escaping of special characters and proper quoting
-   **Column Visibility**: Only exports visible columns (respects column hiding)
-   **Smart Data Formatting**: Automatic formatting for dates, booleans, and other data types

### How It Works

1. **Automatic Route Handling**: The package automatically detects CSV export requests via the `do_export=1` query parameter
2. **Filter Preservation**: All current filters, searches, and sorting are automatically applied to the export
3. **Complete Dataset**: The export bypasses pagination to include all matching records
4. **Proper Headers**: CSV files are served with appropriate headers and UTF-8 encoding
5. **Filename Generation**: Automatic filename generation with table name and timestamp

### Frontend Integration

The CSV export button is automatically added to the table interface. The export URL is reactive and updates automatically when filters change:

```vue
<template>
    <!-- The Table component automatically includes the CSV export button -->
    <Table :resource="users" />

    <!-- For multiple tables, each gets its own export button -->
    <Table :resource="users" name="users" />
    <Table :resource="products" name="products" />
</template>
```

The export functionality is built into the `Table.vue` component and requires no additional configuration.

### Custom Export Callbacks ✨ **NEW!**

You can now provide a custom callback function to handle exports manually. This allows you to customize the export format, apply additional processing, or export to different formats like Excel or JSON.

#### Basic Custom Export

```php
return InertiaTable::make()
    ->withQueryBuilder($queryBuilder)
    ->column('name', 'Name', searchable: true, sortable: true)
    ->column('email', 'Email', searchable: true, sortable: true)
    ->withExportCallback(function ($queryBuilder) {
        // The callback receives the QueryBuilder with all filters applied
        $data = $queryBuilder->get();

        // Custom data processing
        $processedData = $data->map(function ($user) {
            return [
                'ID' => $user->id,
                'Full Name' => strtoupper($user->name),
                'Email' => $user->email,
                'Registration Date' => $user->created_at->format('d/m/Y'),
                'Status' => $user->email_verified_at ? 'Verified' : 'Unverified',
            ];
        });

        // Custom CSV generation with semicolon separator
        $csv = "\xEF\xBB\xBF"; // UTF-8 BOM

        if ($processedData->isNotEmpty()) {
            // Headers
            $headers = array_keys($processedData->first());
            $csv .= implode(';', array_map(function ($header) {
                return '"' . str_replace('"', '""', $header) . '"';
            }, $headers)) . "\n";

            // Data rows
            foreach ($processedData as $row) {
                $csvRow = array_map(function ($value) {
                    return '"' . str_replace('"', '""', $value) . '"';
                }, array_values($row));
                $csv .= implode(';', $csvRow) . "\n";
            }
        }

        return response($csv)
            ->header('Content-Type', 'text/csv; charset=utf-8')
            ->header('Content-Disposition', 'attachment; filename="users-custom-export-' . now()->format('Y-m-d-H-i-s') . '.csv"');
    })
    ->render('Users/Index');
```

#### Export to Different Formats

```php
return InertiaTable::make()
    ->withQueryBuilder($queryBuilder)
    ->column('name', 'Name')
    ->column('email', 'Email')
    ->withExportCallback(function ($queryBuilder) {
        $data = $queryBuilder->get();

        // Export as JSON
        $exportData = [
            'metadata' => [
                'exported_at' => now()->toISOString(),
                'total_records' => $data->count(),
                'applied_filters' => request()->get('filter', []),
            ],
            'users' => $data->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'created_at' => $user->created_at->toISOString(),
                ];
            }),
        ];

        return response()->json($exportData)
            ->header('Content-Disposition', 'attachment; filename="users-export-' . now()->format('Y-m-d-H-i-s') . '.json"');
    })
    ->render('Users/Index');
```

#### Integration with Laravel Excel

```php
// Using maatwebsite/excel package
return InertiaTable::make()
    ->withQueryBuilder($queryBuilder)
    ->column('name', 'Name')
    ->column('email', 'Email')
    ->withExportCallback(function ($queryBuilder) {
        // Use Laravel Excel for advanced Excel exports
        return Excel::download(new UsersExport($queryBuilder), 'users.xlsx');
    })
    ->render('Users/Index');
```

#### Custom Export Service

```php
return InertiaTable::make()
    ->withQueryBuilder($queryBuilder)
    ->column('name', 'Name')
    ->column('email', 'Email')
    ->withExportCallback(function ($queryBuilder) {
        // Delegate to a dedicated export service
        $exportService = app(UserExportService::class);
        return $exportService->exportWithCustomLogic($queryBuilder);
    })
    ->render('Users/Index');
```

**Key Features of Custom Export Callbacks:**

-   **Full Control**: Complete control over export format and processing
-   **QueryBuilder Access**: Receive the QueryBuilder with all filters and searches applied
-   **Multiple Formats**: Export to CSV, Excel, JSON, PDF, or any custom format
-   **Data Processing**: Apply custom transformations and formatting before export
-   **Service Integration**: Easily integrate with existing export services or packages
-   **Preserves Filters**: All table filters, searches, and sorting are automatically applied to the QueryBuilder

The custom export callback completely replaces the default CSV export behavior when defined, giving you full flexibility over the export process.

## Testing

A huge [Laravel Dusk](https://laravel.com/docs/9.x/dusk) E2E test-suite can be found in the `app` directory. Here you'll find a Laravel + Inertia application.

```bash
cd app
cp .env.example .env
composer install
npm install
npm run production
touch database/database.sqlite
php artisan migrate:fresh --seed
php artisan dusk:chrome-driver
php artisan serve
php artisan dusk
```

## Upgrading from v1

### Server-side

-   The `addColumn` method has been renamed to `column`.
-   The `addFilter` method has been renamed to `selectFilter`.
-   The `addSearch` method has been renamed to `searchInput`.
-   For all renamed methods, check out the arguments as some have been changed.
-   The `addColumns` and `addSearchRows` methods have been removed.
-   Global Search is not enabled by default anymore.

### Client-side

-   The `InteractsWithQueryBuilder` mixin has been removed and is no longer needed.
-   The `Table` component no longer needs the `filters`, `search`, `columns`, and `on-update` properties.
-   When using a custom `thead` or `tbody` slot, you need to provide [the styling](https://github.com/Adesin-Fr/inertiajs-tables-laravel-query-builder/blob/c8e21649ad372d309eeb62a8f771aa4c7cd0089e/js/Tailwind2/Table.vue#L1) manually.
-   When using a custom `thead`, the `showColumn` method has been renamed to `show`.
-   The `setTranslations` method is no longer part of the `Pagination` component, but should be imported.
-   The templates and logic of the components are not separated anymore. Use slots to inject your own implementations.

## Examples

The `examples/` folder contains comprehensive usage examples:

-   **[SimpleRowClassExample.vue](examples/SimpleRowClassExample.vue)**: Quick example showing basic usage of the `rowClass` property
-   **[ExportButtonExamples.vue](examples/ExportButtonExamples.vue)**: Complete examples of custom CSV export buttons with different styles and functionalities
-   **[RowClassExamples.vue](examples/RowClassExamples.vue)**: Advanced examples of custom row styling using the `rowClass` property
-   **[PaginationCallbackExample.vue](examples/PaginationCallbackExample.vue)**: Complete example demonstrating custom pagination handling with the `paginationClickCallback` property

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please email alfonsorodriguez@live.com.mx instead of using the issue tracker.

## Credits

-   [Pascal Baljet](https://github.com/protonemedia)
-   [All Contributors](../../contributors)
-   [Ludovic LEMARINEL](https://github.com/Adesin-Fr)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
