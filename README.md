# Inertia.js Tables for Laravel Query Builder

[![Latest Version on NPM](https://img.shields.io/npm/v/@adesin-fr/inertiajs-tables-laravel-query-builder.svg?style=flat-square)](https://npmjs.com/package/@adesin-fr/inertiajs-tables-laravel-query-builder)
[![npm](https://img.shields.io/npm/dt/@adesin-fr/inertiajs-tables-laravel-query-builder.svg?style=flat-square)](https://www.npmjs.com/package/@adesin-fr/inertiajs-tables-laravel-query-builder)
[![Latest Version on Packagist](https://img.shields.io/packagist/v/adesin-fr/inertiajs-tables-laravel-query-builder.svg?style=flat-square)](https://packagist.org/packages/adesin-fr/inertiajs-tables-laravel-query-builder)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)

This package provides a _DataTables-like_ experience for [Inertia.js](https://inertiajs.com/) with support for searching, filtering, sorting, toggling columns, and pagination. It generates URLs that can be consumed by Spatie's excellent [Laravel Query Builder](https://github.com/spatie/laravel-query-builder) package, with no additional logic needed. The components are styled with [Tailwind CSS 3.0](https://tailwindcss.com/), but it's fully customizable with slots. The data refresh logic is based on Inertia's [Ping CRM demo](https://github.com/inertiajs/pingcrm).

This package is a fork of [PonchRobles/inertiajs-tables-laravel-query-builder], which I wasn't satisfied about, because of some quality issues.

![Inertia.js Table for Laravel Query Builder](https://user-images.githubusercontent.com/8403149/177773377-86c32d69-8f86-47e4-8063-ea227e480d10.mp4)

## Features

-   Auto-fill: auto generates `thead` and `tbody` with support for custom cells
-   Global Search
-   Search per field
-   Select filters
-   Toggle columns
-   Sort columns
-   Pagination (support for Eloquent/API Resource/Simple/Cursor)
-   Automatically updates the query string (by using [Inertia's replace](https://inertiajs.com/manual-visits#browser-history) feature)

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

The package will automatically register the Service Provider which provides a `table` method you can use on an Interia Response.

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
	$table->toggleFilter(
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

The `Table` has some events that you can use

-   rowClicked: this event is fired when the user click on the row. The event give you this informations: event, item, key. Be careful if you use this event with a clickable element inside the row like an action button. Don't forget to use `event.stopPropagation()` for all other clickable elements

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

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please email alfonsorodriguez@live.com.mx instead of using the issue tracker.

## Credits

-   [Pascal Baljet](https://github.com/Adesin-Fr)
-   [All Contributors](../../contributors)
-   [Alfonso Rodríguez](https://github.com/Adesin-Fr)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
