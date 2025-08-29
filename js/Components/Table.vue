<template>
    <Transition>
        <fieldset ref="tableFieldset" :key="`table-${name}`" :dusk="`table-${name}`" class="min-w-0"
            :class="{ 'opacity-75': isVisiting }">
            <div class="flex flex-row flex-wrap sm:flex-nowrap justify-start px-4 sm:px-0">
                <div v-if="queryBuilderProps.globalSearch"
                    class="flex flex-row w-full sm:w-auto sm:grow mb-2 sm:mb-0 sm:mr-4">
                    <slot name="tableGlobalSearch" :has-global-search="queryBuilderProps.globalSearch"
                        :label="queryBuilderProps.globalSearch ? queryBuilderProps.globalSearch.label : null"
                        :value="queryBuilderProps.globalSearch ? queryBuilderProps.globalSearch.value : null"
                        :on-change="changeGlobalSearchValue">
                        <TableGlobalSearch v-if="queryBuilderProps.globalSearch" class="grow"
                            :label="queryBuilderProps.globalSearch.label" :value="queryBuilderProps.globalSearch.value"
                            :on-change="changeGlobalSearchValue" :color="color" />
                    </slot>
                </div>

                <div class="mr-2 sm:mr-4">
                    <slot name="tableFilter" :has-filters="queryBuilderProps.hasFilters"
                        :has-enabled-filters="queryBuilderProps.hasEnabledFilters" :filters="queryBuilderProps.filters"
                        :on-filter-change="changeFilterValue">
                        <TableFilter v-if="queryBuilderProps.hasFilters"
                            :has-enabled-filters="queryBuilderProps.hasEnabledFilters"
                            :filters="queryBuilderProps.filters" :on-filter-change="changeFilterValue" :color="color" />
                    </slot>
                </div>

                <slot v-if="!withGroupedMenu && !hideSearchInputsAboveTable" name="tableAddSearchRow"
                    :has-search-inputs="queryBuilderProps.hasSearchInputs"
                    :has-search-inputs-without-value="queryBuilderProps.hasSearchInputsWithoutValue"
                    :search-inputs="queryBuilderProps.searchInputsWithoutGlobal" :on-add="showSearchInput">
                    <TableAddSearchRow v-if="queryBuilderProps.hasSearchInputs" class="mr-2 sm:mr-4"
                        :search-inputs="queryBuilderProps.searchInputsWithoutGlobal"
                        :has-search-inputs-without-value="queryBuilderProps.hasSearchInputsWithoutValue"
                        :on-add="showSearchInput" :color="color" />
                </slot>

                <slot v-if="!withGroupedMenu" name="tableColumns" :has-columns="queryBuilderProps.hasToggleableColumns"
                    :columns="queryBuilderData.columns" :has-hidden-columns="queryBuilderProps.hasHiddenColumns"
                    :on-change="changeColumnStatus">
                    <TableColumns v-if="queryBuilderProps.hasToggleableColumns" :class="{ 'mr-2 sm:mr-4': canBeReset }"
                        :columns="queryBuilderData.columns" :has-hidden-columns="queryBuilderProps.hasHiddenColumns"
                        :on-change="changeColumnStatus" :table-name="name" :color="color" />
                </slot>

                <slot v-if="withGroupedMenu" name="groupedAction" :actions="defaultActions">
                    <GroupedActions :color="color" :actions="defaultActions">
                        <slot name="bulk-actions" />
                    </GroupedActions>
                </slot>

                <slot v-if="!withGroupedMenu" name="tableReset" :can-be-reset="canBeReset" :on-click="resetQuery">
                    <div v-if="canBeReset" class="mr-4 sm:mr-0">
                        <TableReset :on-click="resetQuery" :color="color" />
                    </div>
                </slot>
            </div>

            <slot v-if="!hideSearchInputsAboveTable" name="tableSearchRows"
                :has-search-rows-with-value="queryBuilderProps.hasSearchInputsWithValue"
                :search-inputs="queryBuilderProps.searchInputsWithoutGlobal"
                :forced-visible-search-inputs="forcedVisibleSearchInputs" :on-change="changeSearchInputValue">
                <TableSearchRows
                    v-if="queryBuilderProps.hasSearchInputsWithValue || forcedVisibleSearchInputs.length > 0"
                    :search-inputs="queryBuilderProps.searchInputsWithoutGlobal"
                    :forced-visible-search-inputs="forcedVisibleSearchInputs" :on-change="changeSearchInputValue"
                    :on-remove="disableSearchInput" :color="color" />
            </slot>

            <slot name="tableWrapper" :meta="resourceMeta">
                <TableWrapper :class="{ 'mt-3': !hasOnlyData }">
                    <slot name="table">
                        <div class="overflow-x-auto">
                            <table class="divide-y divide-gray-300" style="table-layout: fixed; min-width: 100%;"
                                :style="{ width: totalTableWidth }"
                                @mouseenter="resizeableColumns ? showResizeIndicators : null"
                                @mouseleave="resizeableColumns ? hideResizeIndicators : null"
                                :class="{ 'show-resize-indicators': resizeableColumns && showIndicators }">
                                <thead class="bg-gray-50">
                                    <slot name="head" :show="show" :sort-by="sortBy" :header="header">
                                        <tr>
                                            <th v-if="hasCheckboxes"
                                                class="text-left text-sm font-semibold text-gray-900 relative resize-border pinned-checkbox-header"
                                                style="width: 60px;">
                                                <input type="checkbox" :id="`table-${name}-select-header`"
                                                    @change="toggleSelection" v-model="headerCheckboxSelected"
                                                    class="rounded-sm mr-1 border-gray-300 m-1" />
                                            </th>
                                            <template v-for="column in queryBuilderData.columns">
                                                <HeaderCell :cell="header(column.key)"
                                                    :style="getPinnedHeaderStyle(column.key)">
                                                    <template #label>
                                                        <slot :name="`header(${column.key})`"
                                                            :label="header(column.key).label"
                                                            :column="header(column.key)" />
                                                    </template>
                                                </HeaderCell>
                                            </template>
                                        </tr>
                                    </slot>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <slot name="body" :show="show">
                                        <tr v-for="(item, key) in resourceData" :key="`table-${name}-row-${key}`"
                                            :class="getRowClass(item, key)">
                                            <td class="whitespace-nowrap text-sm text-gray-500 pinned-checkbox"
                                                v-if="hasCheckboxes" style="width: 60px;">
                                                <input type="checkbox" :id="`table-${name}-select-${key}`"
                                                    class="rounded-sm m-1 border-gray-300"
                                                    v-model="item.__itSelected" />
                                            </td>

                                            <td v-for="(column, colIndex) in queryBuilderData.columns"
                                                v-show="show(column.key)"
                                                :key="`table-${name}-row-${key}-column-${column.key}`"
                                                @click="rowClicked($event, item, key)" :class="column.body_class"
                                                :data-column-key="column.key" :style="{
                                                    width: getColumnWidthForBody(column.key),
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    ...getPinnedColumnStyle(column.key)
                                                }">

                                                <slot :name="`cell(${column.key})`" :item="item">
                                                    {{ item[column.key] }}
                                                </slot>
                                            </td>
                                        </tr>
                                    </slot>
                                </tbody>
                            </table>
                        </div>
                    </slot>

                    <slot name="pagination" :on-click="visitPageFromUrl" :has-data="hasData" :meta="resourceMeta"
                        :per-page-options="queryBuilderProps.perPageOptions" :on-per-page-change="onPerPageChange"
                        :show-export-button="showExportButton" :export-url="exportUrlWithParams">
                        <div class="flex justify-between bg-white px-2 py-3 items-center border-t border-gray-200">
                            <span class="italic text-sm px-2" v-if="hasCheckboxes">{{ lineCountLabel }}</span>
                            <Pagination :on-click="visitPageFromUrl" :has-data="hasData" :meta="resourceMeta"
                                :per-page-options="queryBuilderProps.perPageOptions"
                                :on-per-page-change="onPerPageChange" :color="color"
                                :show-export-button="showExportButton" :export-url="exportUrlWithParams">
                                <!-- Slot pour personnaliser le bouton export -->
                                <template #exportButton="exportProps">
                                    <slot name="exportButton" v-bind="exportProps" />
                                </template>
                            </Pagination>
                        </div>
                    </slot>
                </TableWrapper>
            </slot>
        </fieldset>
    </Transition>
</template>

<script setup>
import Pagination from "./Pagination.vue";
import HeaderCell from "./HeaderCell.vue";
import TableAddSearchRow from "./TableAddSearchRow.vue";
import TableColumns from "./TableColumns.vue";
import TableFilter from "./TableFilter.vue";
import TableGlobalSearch from "./TableGlobalSearch.vue";
import TableSearchRows from "./TableSearchRows.vue";
import TableReset from "./TableReset.vue";
import TableWrapper from "./TableWrapper.vue";
import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance, Transition, provide } from "vue";
import qs from "qs";
import clone from "lodash-es/clone";
import filter from "lodash-es/filter";
import findKey from "lodash-es/findKey";
import forEach from "lodash-es/forEach";
import isEqual from "lodash-es/isEqual";
import map from "lodash-es/map";
import pickBy from "lodash-es/pickBy";
import { router, usePage } from "@inertiajs/vue3";
import GroupedActions from "./GroupedActions.vue";
import BulkActions from "./BulkActions.vue";
import { getTranslations } from "../translations.js";
import { useColumnResize } from "../composables/useColumnResize.js";


const translations = getTranslations();

const emit = defineEmits(["rowClicked", 'selectionChanged']);

const props = defineProps({
    inertia: {
        type: Object,
        default: () => {
            return {};
        },
        required: false,
    },

    name: {
        type: String,
        default: "default",
        required: false,
    },

    striped: {
        type: Boolean,
        default: false,
        required: false,
    },

    preventOverlappingRequests: {
        type: Boolean,
        default: true,
        required: false,
    },

    inputDebounceMs: {
        type: Number,
        default: 350,
        required: false,
    },
    hasCheckboxes: {
        type: Boolean,
        default: false,
        required: false,
    },
    preserveScroll: {
        type: [Boolean, String],
        default: false,
        required: false,
    },

    resource: {
        type: Object,
        default: () => {
            return {};
        },
        required: false,
    },

    meta: {
        type: Object,
        default: () => {
            return {};
        },
        required: false,
    },

    data: {
        type: Object,
        default: () => {
            return {};
        },
        required: false,
    },

    withGroupedMenu: {
        type: Boolean,
        default: false,
        required: false,
    },

    color: {
        type: String,
        default: "primary",
        required: false,
    },

    resizeableColumns: {
        type: Boolean,
        default: true,
        required: false,
    },

    hideSearchInputsAboveTable: {
        type: Boolean,
        default: false,
        required: false,
    },
    showExportButton: {
        type: Boolean,
        default: false,
        required: false,
    },
    rowClass: {
        type: Function,
        default: null,
        required: false,
    },
    paginationClickCallback: {
        type: Function,
        default: null,
        required: false,
    },
});

const app = getCurrentInstance();

// Initialize column resizing only if enabled
const columnResize = props.resizeableColumns ? useColumnResize(props.name) : null;

// Provide resize context to child components
provide('columnResize', columnResize);

// State for displaying resize indicators
const showIndicators = ref(false);

const queryBuilderProps = computed(() => {
    return usePage().props.queryBuilderProps
        ? { ...usePage().props.queryBuilderProps[props.name] } || {}
        : {};
});

const queryBuilderData = ref(queryBuilderProps.value);

const pageName = computed(() => {
    return queryBuilderProps.value.pageName;
});

const forcedVisibleSearchInputs = ref([]);

const tableFieldset = ref(null);

const headerCheckboxSelected = ref(false);

const hasOnlyData = computed(() => {
    if (queryBuilderProps.value.hasToggleableColumns) {
        return false;
    }

    if (queryBuilderProps.value.hasFilters) {
        return false;
    }

    if (queryBuilderProps.value.hasSearchInputs) {
        return false;
    }

    return !queryBuilderProps.value.globalSearch;
});

const resourceData = computed(() => {
    if (Object.keys(props.resource).length === 0) {
        return props.data;
    }

    if ("data" in props.resource) {
        return props.resource.data;
    }

    return props.resource;
});

const resourceMeta = computed(() => {
    if (Object.keys(props.resource).length === 0) {
        return props.meta;
    }

    if ("links" in props.resource && "meta" in props.resource) {
        if (Object.keys(props.resource.links).length === 4
            && "next" in props.resource.links
            && "prev" in props.resource.links) {
            return {
                ...props.resource.meta,
                next_page_url: props.resource.links.next,
                prev_page_url: props.resource.links.prev
            };
        }
    }

    if ("meta" in props.resource) {
        return props.resource.meta;
    }

    return props.resource;
});

const hasData = computed(() => {
    if (resourceData.value.length > 0) {
        return true;
    }

    return resourceMeta.value.total > 0;
});

const defaultActions = ref({
    reset: {
        onClick: resetQuery,
    },
    toggleColumns: {
        show: queryBuilderProps.value.hasToggleableColumns,
        columns: queryBuilderProps.value.columns,
        onChange: changeColumnStatus,
    },
    searchFields: {
        show: queryBuilderProps.value.hasSearchInputs && !props.hideSearchInputsAboveTable,
        searchInputs: queryBuilderProps.value.searchInputsWithoutGlobal,
        hasSearchInputsWithoutValue: queryBuilderProps.value.hasSearchInputsWithoutValue,
        onClick: showSearchInput,
    },
});

function disableSearchInput(key) {
    forcedVisibleSearchInputs.value = forcedVisibleSearchInputs.value.filter((search) => search != key);

    changeSearchInputValue(key, null);
}

function showSearchInput(key) {
    forcedVisibleSearchInputs.value.push(key);
}

const canBeReset = computed(() => {
    if (forcedVisibleSearchInputs.value.length > 0) {
        return true;
    }

    const queryStringData = qs.parse(location.search.substring(1));

    const page = queryStringData[pageName.value];

    if (page > 1) {
        return true;
    }

    const prefix = props.name === "default" ? "" : (props.name + "_");
    let dirty = false;

    forEach(["filter", "columns", "cursor", "sort"], (key) => {
        const value = queryStringData[prefix + key];

        if (key === "sort" && value === queryBuilderProps.value.defaultSort) {
            return;
        }

        if (value !== undefined) {
            dirty = true;
        }
    });

    return dirty;
});

const getRowClass = (item, index) => {
    let classes = [];

    // Default striped and hover classes
    if (props.striped && index % 2) {
        classes.push('bg-gray-50');
    }

    if (props.striped) {
        classes.push('hover:bg-gray-100');
    } else {
        classes.push('hover:bg-gray-50');
    }

    // Custom row class function
    if (props.rowClass && typeof props.rowClass === 'function') {
        const customClass = props.rowClass(item);
        if (customClass) {
            classes.push(customClass);
        }
    }

    return classes.join(' ');
};

const exportUrlWithParams = computed(() => {
    if (!props.showExportButton) {
        return null;
    }

    // Start with the current URL base
    const currentUrl = new URL(window.location.href);

    // Clear existing query parameters to rebuild them from current state
    currentUrl.search = '';

    // Add current query parameters from the component state
    const params = new URLSearchParams();

    // Add page name if not default
    if (queryBuilderProps.value.page && queryBuilderProps.value.page > 1) {
        params.set(pageName.value, queryBuilderProps.value.page);
    }

    // Add sorting
    if (queryBuilderProps.value.sort) {
        const sortKey = props.name === "default" ? "sort" : `${props.name}_sort`;
        params.set(sortKey, queryBuilderProps.value.sort);
    }

    // Add filters
    const activeFilters = {};
    queryBuilderData.value.filters.forEach(filter => {
        if (filter.value !== null && filter.value !== undefined && filter.value !== '') {
            activeFilters[filter.key] = filter.value;
        }
    });

    // Add search inputs (including global search)
    queryBuilderData.value.searchInputs.forEach(searchInput => {
        if (searchInput.value !== null && searchInput.value !== undefined && searchInput.value !== '') {
            activeFilters[searchInput.key] = searchInput.value;
        }
    });

    if (Object.keys(activeFilters).length > 0) {
        const filterKey = props.name === "default" ? "filter" : `${props.name}_filter`;
        // For complex filter structure, we need to serialize it properly
        Object.keys(activeFilters).forEach(key => {
            const value = activeFilters[key];
            if (Array.isArray(value)) {
                // Handle array values (like NumberFilter)
                value.forEach((val, index) => {
                    params.set(`${filterKey}[${key}][${index}]`, val);
                });
            } else if (typeof value === 'object' && value !== null) {
                // Handle object values
                Object.keys(value).forEach(subKey => {
                    params.set(`${filterKey}[${key}][${subKey}]`, value[subKey]);
                });
            } else {
                // Handle simple values
                params.set(`${filterKey}[${key}]`, value);
            }
        });
    }

    // Add column visibility
    const visibleColumns = queryBuilderData.value.columns
        .filter(column => !column.hidden)
        .map(column => column.key);

    if (visibleColumns.length !== queryBuilderData.value.columns.length) {
        const columnsKey = props.name === "default" ? "columns" : `${props.name}_columns`;
        visibleColumns.forEach(columnKey => {
            params.append(`${columnsKey}[]`, columnKey);
        });
    }

    // Add per page
    if (queryBuilderProps.value.perPageOptions && queryBuilderProps.value.perPageOptions.length > 0) {
        const currentPerPage = new URLSearchParams(window.location.search).get('perPage') || queryBuilderProps.value.perPageOptions[0];
        if (currentPerPage && currentPerPage !== queryBuilderProps.value.perPageOptions[0]) {
            params.set('perPage', currentPerPage);
        }
    }

    // Add the export parameter and table name
    params.set('do_export', '1');
    params.set('table', props.name || 'default');

    // Set the final query string
    currentUrl.search = params.toString();

    return currentUrl.toString();
});

function resetQuery() {
    forcedVisibleSearchInputs.value = [];

    forEach(queryBuilderData.value.filters, (filter, key) => {
        queryBuilderData.value.filters[key].value = null;
    });

    forEach(queryBuilderData.value.searchInputs, (filter, key) => {
        queryBuilderData.value.searchInputs[key].value = null;
    });

    forEach(queryBuilderData.value.columns, (column, key) => {
        queryBuilderData.value.columns[key].hidden = column.can_be_hidden
            ? !queryBuilderProps.value.defaultVisibleToggleableColumns.includes(column.key)
            : false;
        queryBuilderData.value.columns[key].pinned = false;
    });

    // Reset the columns visibility in the local storage
    localStorage.removeItem(`columns-${props.name}`);

    // Reset column widths
    if (props.resizeableColumns && columnResize) {
        columnResize.resetColumnWidths();
    }

    queryBuilderData.value.sort = null;
    queryBuilderData.value.cursor = null;
    queryBuilderData.value.page = 1;
}

const debounceTimeouts = {};

function changeSearchInputValue(key, value) {
    clearTimeout(debounceTimeouts[key]);

    debounceTimeouts[key] = setTimeout(() => {
        if (visitCancelToken.value && props.preventOverlappingRequests) {
            visitCancelToken.value.cancel();
        }

        const intKey = findDataKey("searchInputs", key);

        queryBuilderData.value.searchInputs[intKey].value = value;
        queryBuilderData.value.cursor = null;
        queryBuilderData.value.page = 1;
    }, props.inputDebounceMs);
}

function changeGlobalSearchValue(value) {
    changeSearchInputValue("global", value);
}

function changeFilterValue(key, value) {
    const intKey = findDataKey("filters", key);
    queryBuilderData.value.filters[intKey].value = value;
    queryBuilderData.value.cursor = null;
    queryBuilderData.value.page = 1;
}

function onPerPageChange(value) {
    queryBuilderData.value.cursor = null;
    queryBuilderData.value.perPage = value;
    queryBuilderData.value.page = 1;
}

function findDataKey(dataKey, key) {
    return findKey(queryBuilderData.value[dataKey], (value) => {
        return value.key == key;
    });
}

function changeColumnStatus(keyOrColumns) {
    queryBuilderData.value.columns = keyOrColumns;

    // Réorganiser les colonnes : épinglées en premier
    queryBuilderData.value.columns.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1
        if (!a.pinned && b.pinned) return 1
        return 0
    });

    // Persist the column hidden attribute and order in the local storage
    saveColumnsToStorage();
}

function saveColumnsToStorage() {
    if (props.name && props.name !== 'default') {
        const columns = queryBuilderData.value.columns.map((column, index) => {
            return {
                key: column.key,
                hidden: column.hidden,
                pinned: column.pinned || false,
                order: index
            };
        });
        localStorage.setItem(`columns-${props.name}`, JSON.stringify(columns));
    }
}

function getFilterForQuery() {
    let filtersWithValue = {};

    forEach(queryBuilderData.value.searchInputs, (searchInput) => {
        if (searchInput.value !== null) {
            filtersWithValue[searchInput.key] = searchInput.value;
        }
    });

    forEach(queryBuilderData.value.filters, (filters) => {
        let value = filters.value;
        if (value !== null) {
            if (filters.type === "number_range" && Number(Math.max(...filters.value)) === Number(filters.max) && Number(Math.min(...filters.value)) === Number(filters.min)) {
                value = null;
            }
            filtersWithValue[filters.key] = value;
        }
    });

    return filtersWithValue;
}

function getColumnsForQuery() {
    const columns = queryBuilderData.value.columns;

    let visibleColumns = filter(columns, (column) => {
        return !column.hidden;
    });

    let visibleColumnKeys = map(visibleColumns, (column) => {
        return column.key;
    }).sort();

    if (isEqual(visibleColumnKeys, queryBuilderProps.value.defaultVisibleToggleableColumns)) {
        return {};
    }

    return visibleColumnKeys;
}

function dataForNewQueryString() {
    const filterForQuery = getFilterForQuery();
    const columnsForQuery = getColumnsForQuery();

    const queryData = {};

    if (Object.keys(filterForQuery).length > 0) {
        queryData.filter = filterForQuery;
    }

    if (Object.keys(columnsForQuery).length > 0) {
        queryData.columns = columnsForQuery;
    }

    const cursor = queryBuilderData.value.cursor;
    const page = queryBuilderData.value.page;
    const sort = queryBuilderData.value.sort;
    const perPage = queryBuilderData.value.perPage;

    if (cursor) {
        queryData.cursor = cursor;
    }

    if (page > 1) {
        queryData.page = page;
    }

    if (perPage > 1) {
        queryData.perPage = perPage;
    }


    if (sort) {
        queryData.sort = sort;
    }

    return queryData;
}

function visitPageFromUrl(url) {
    if (!url) {
        return null;
    }

    // Si un callback de pagination est fourni, l'utiliser au lieu de la navigation Inertia
    if (props.paginationClickCallback && typeof props.paginationClickCallback === 'function') {
        props.paginationClickCallback(url);
        return;
    }

    // Comportement par défaut : navigation Inertia
    visit(url);
}

function generateNewQueryString() {
    const queryStringData = qs.parse(location.search.substring(1));

    const prefix = props.name === "default" ? "" : (props.name + "_");

    forEach(["filter", "columns", "cursor", "sort"], (key) => {
        delete queryStringData[prefix + key];
    });

    delete queryStringData[pageName.value];

    forEach(dataForNewQueryString(), (value, key) => {
        if (key === "page") {
            queryStringData[pageName.value] = value;
        } else if (key === "perPage") {
            queryStringData.perPage = value;
        } else {
            queryStringData[prefix + key] = value;
        }
    });

    let query = qs.stringify(queryStringData, {
        filter(prefix, value) {
            if (typeof value === "object" && value !== null) {
                return pickBy(value);
            }

            return value;
        },

        skipNulls: true,
        strictNullHandling: true,
    });

    if (!query || query === (pageName.value + "=1")) {
        query = "";
    }

    return query;
}

const isVisiting = ref(false);
const visitCancelToken = ref(null);

function visit(url) {
    if (!url) {
        return;
    }

    router.get(
        url,
        {},
        {
            replace: true,
            preserveState: true,
            preserveScroll: props.preserveScroll !== false,
            onBefore() {
                isVisiting.value = true;
            },
            onCancelToken(cancelToken) {
                visitCancelToken.value = cancelToken;
            },
            onFinish() {
                isVisiting.value = false;
            },
            onSuccess() {
                if (props.preserveScroll === "table-top") {
                    const offset = -8;
                    const top = tableFieldset.value.getBoundingClientRect().top + window.pageYOffset + offset;

                    window.scrollTo({ top });
                }
            }
        }
    );
}

function rowClicked(event, item, key) {
    if (props.hasCheckboxes && event.target?.parentElement.cellIndex === 0) {
        return;
    }
    emit("rowClicked", event, item, key);
}

watch(queryBuilderData, () => {
    visit(location.pathname + "?" + generateNewQueryString());

    headerCheckboxSelected.value = false;

}, { deep: true });

watch(props.resource, () => {
    const selectedItems = props.resource.data.filter((item) => item.__itSelected);

    emit("selectionChanged", selectedItems);
}, { deep: true });

const inertiaListener = () => {
    // Reset column widths after data loading
    if (props.resizeableColumns && columnResize) {
        setTimeout(() => {
            const tableElement = tableFieldset.value?.querySelector('table');
            if (tableElement) {
                columnResize.initializeColumnWidths(tableElement);
            }
        }, 0);
    }
}; onMounted(() => {
    document.addEventListener("inertia:success", inertiaListener);

    // Charger l'ordre et la visibilité des colonnes depuis le localStorage
    loadColumnsFromStorage();

    // Initialize column widths after mounting
    if (props.resizeableColumns && columnResize) {
        setTimeout(() => {
            const tableElement = tableFieldset.value?.querySelector('table');
            if (tableElement) {
                columnResize.initializeColumnWidths(tableElement);
            }
        }, 0);
    }
});

function loadColumnsFromStorage() {
    if (!props.name || props.name === 'default') {
        return;
    }

    console.log('Loading columns from storage for table:', props.name);

    const savedColumns = localStorage.getItem(`columns-${props.name}`);
    if (!savedColumns) {
        return;
    }

    try {
        const savedColumnData = JSON.parse(savedColumns);

        // Si les données sauvegardées ont un format d'ordre (avec la propriété 'order')
        if (savedColumnData.length > 0 && 'order' in savedColumnData[0]) {
            // Créer un map pour un accès rapide aux données sauvegardées
            const savedDataMap = new Map(savedColumnData.map(col => [col.key, col]));

            // Appliquer la visibilité et l'état épinglé sauvegardé
            queryBuilderData.value.columns.forEach((column, index) => {
                const savedData = savedDataMap.get(column.key);
                if (savedData) {
                    queryBuilderData.value.columns[index].hidden = savedData.hidden;
                    queryBuilderData.value.columns[index].pinned = savedData.pinned || false;
                }
            });

            // Réorganiser les colonnes selon l'ordre sauvegardé et épinglées en premier
            queryBuilderData.value.columns.sort((a, b) => {
                const aData = savedDataMap.get(a.key);
                const bData = savedDataMap.get(b.key);

                // Les colonnes épinglées en premier
                if (a.pinned && !b.pinned) return -1;
                if (!a.pinned && b.pinned) return 1;

                const aOrder = aData?.order ?? 999;
                const bOrder = bData?.order ?? 999;

                return aOrder - bOrder;
            });
        } else {
            // Format ancien (seulement hidden), appliquer seulement la visibilité
            savedColumnData.forEach((savedCol, index) => {
                const columnIndex = queryBuilderData.value.columns.findIndex(col => col.key === savedCol.key);
                if (columnIndex !== -1) {
                    queryBuilderData.value.columns[columnIndex].hidden = savedCol.hidden;
                    queryBuilderData.value.columns[columnIndex].pinned = savedCol.pinned || false;
                }
            });
        }
    } catch (error) {
        console.warn('Error loading column order from localStorage:', error);
    }
}

onUnmounted(() => {
    document.removeEventListener("inertia:success", inertiaListener);
});

//

function sortBy(column) {
    if (queryBuilderData.value.sort == column) {
        queryBuilderData.value.sort = `-${column}`;
    } else {
        queryBuilderData.value.sort = column;
    }

    queryBuilderData.value.cursor = null;
    queryBuilderData.value.page = 1;
}

function show(key) {
    const intKey = findDataKey("columns", key);

    return !queryBuilderData.value.columns[intKey].hidden;
}

function header(key) {
    const intKey = findDataKey("columns", key);
    const columnData = clone(queryBuilderData.value.columns[intKey]);

    columnData.onSort = sortBy;

    // Ajouter les filtres pour cette colonne uniquement
    // Logique simple : associer les filtres dont la key correspond ou contient la key de la colonne
    columnData.filters = queryBuilderData.value.filters.filter(filter =>
        filter.key === key ||
        filter.key.startsWith(key + '_') ||
        filter.key.includes(key)
    );

    // Vérifier si cette colonne est searchable en cherchant un searchInput correspondant
    const columnSearchInputs = queryBuilderData.value.searchInputs.filter(searchInput =>
        searchInput.key === key
    );

    if (columnSearchInputs.length > 0) {
        columnData.searchable = true;
        columnData.searchInputs = columnSearchInputs;
    } else {
        columnData.searchable = false;
        columnData.searchInputs = [];
    }

    // Ajouter la fonction de changement de filtre
    columnData.onFilterChange = changeFilterValue;

    // Ajouter la fonction de changement de recherche
    columnData.onSearchChange = changeSearchInputValue;

    // Ajouter la couleur pour le thème
    columnData.color = props.color;

    return columnData;
}

function toggleSelection() {
    props.resource.data.forEach((item) => {
        item.__itSelected = headerCheckboxSelected.value;
    });
}

function getColumnWidthForBody(columnKey) {
    if (!props.resizeableColumns || !columnResize) {
        return 'auto';
    }
    const width = columnResize.getColumnWidth(columnKey);
    return width === 'auto' ? width : `${width}px`;
}

// Fonction pour calculer la position left d'une colonne épinglée
function getPinnedColumnLeft(columnKey) {
    if (!props.resizeableColumns || !columnResize) {
        return '0px';
    }

    let leftPosition = 0;
    const visibleColumns = queryBuilderData.value.columns.filter(col => !col.hidden);

    // Ajouter la largeur de la colonne checkbox si présente
    if (props.hasCheckboxes) {
        leftPosition += 60;
    }

    // Calculer la position en additionnant les largeurs des colonnes épinglées précédentes
    for (const column of visibleColumns) {
        if (column.key === columnKey) {
            break;
        }
        if (column.pinned) {
            const width = columnResize.getColumnWidth(column.key);
            leftPosition += width === 'auto' ? 150 : width; // largeur par défaut si auto
        }
    }

    return `${leftPosition}px`;
}

// Vérifier si une colonne est épinglée
function isColumnPinned(columnKey) {
    const column = queryBuilderData.value.columns.find(col => col.key === columnKey);
    return column && column.pinned;
}

// Calculer le style pour une colonne épinglée
function getPinnedColumnStyle(columnKey) {
    if (!isColumnPinned(columnKey)) {
        return {};
    }

    return {
        position: 'sticky',
        left: getPinnedColumnLeft(columnKey),
        zIndex: 10,
        backgroundColor: 'white',
        boxShadow: '2px 0 4px -2px rgba(0, 0, 0, 0.1)'
    };
}

// Style pour l'en-tête d'une colonne épinglée
function getPinnedHeaderStyle(columnKey) {
    if (!isColumnPinned(columnKey)) {
        return {};
    }

    return {
        position: 'sticky',
        left: getPinnedColumnLeft(columnKey),
        zIndex: 11,
        backgroundColor: '#f9fafb',
        boxShadow: '2px 0 4px -2px rgba(0, 0, 0, 0.1)'
    };
}

// Calculer la largeur totale de la table
const totalTableWidth = computed(() => {
    // If resizing is not enabled, use default width
    if (!props.resizeableColumns || !columnResize) {
        return '100%';
    }

    let totalWidth = 0;
    let hasAutoColumns = false;

    // Add checkbox column width if present
    if (props.hasCheckboxes) {
        totalWidth += 60; // 60px for checkbox column
    }


    // Calculer la largeur totale des colonnes
    queryBuilderProps.value.columns.forEach(column => {
        if (!show(column.key)) return; // Ignore hidden columns

        const width = columnResize.getColumnWidth(column.key);
        if (width === 'auto') {
            hasAutoColumns = true;
        } else {
            totalWidth += width;
        }
    });

    // If all columns have a defined width and the total is greater than 100%,
    // use the calculated width, otherwise use at least 100%
    if (!hasAutoColumns && totalWidth > 0) {
        return `${totalWidth}px`;
    }

    return 'max(100%, ' + (totalWidth > 0 ? totalWidth + 'px' : '800px') + ')';
});

const selectedLineCount = computed(() => {
    return props.resource.data.filter((item) => item.__itSelected).length;
});

const lineCountLabel = computed(() => {
    if (selectedLineCount.value === 0) {
        return translations.noLineSelected;
    }
    return `${selectedLineCount.value} ${translations.lineSelected}`;
})

// Functions to handle display of resize indicators
function showResizeIndicators() {
    if (props.resizeableColumns) {
        showIndicators.value = true;
    }
}

function hideResizeIndicators() {
    if (props.resizeableColumns) {
        // Delay to prevent flicker when hovering cells
        setTimeout(() => {
            showIndicators.value = false;
        }, 100);
    }
}

</script>

<style scoped>
.resize-border::after {
    content: '';
    position: absolute;
    right: 0;
    top: 25%;
    height: 50%;
    width: 2px;
    background-color: #e5e7eb;
    /* border-gray-200 */
    transition: background-color 0.15s ease-in-out;
}

.resize-border:hover::after {
    background-color: #9ca3af;
    /* border-gray-400 */
}

.pinned-column {
    position: sticky !important;
    background: white;
    z-index: 10;
    box-shadow: 2px 0 4px -2px rgba(0, 0, 0, 0.1);
    border-right: 1px solid #e5e7eb;
}

.pinned-column-header {
    position: sticky !important;
    background: #f9fafb;
    /* bg-gray-50 */
    z-index: 11;
    box-shadow: 2px 0 4px -2px rgba(0, 0, 0, 0.1);
    border-right: 1px solid #e5e7eb;
}

/* Style pour la colonne checkbox épinglée */
.pinned-checkbox {
    position: sticky !important;
    left: 0 !important;
    background: white;
    z-index: 12;
    border-right: 1px solid #e5e7eb;
    box-shadow: 2px 0 4px -2px rgba(0, 0, 0, 0.1);
}

.pinned-checkbox-header {
    position: sticky !important;
    left: 0 !important;
    background: #f9fafb !important;
    z-index: 13;
    border-right: 1px solid #e5e7eb;
    box-shadow: 2px 0 4px -2px rgba(0, 0, 0, 0.1);
}

/* Transition pour un effet plus fluide */
.pinned-column,
.pinned-column-header {
    transition: box-shadow 0.2s ease-in-out;
}

.pinned-column:hover,
.pinned-column-header:hover {
    box-shadow: 2px 0 8px -2px rgba(0, 0, 0, 0.15);
}
</style>
