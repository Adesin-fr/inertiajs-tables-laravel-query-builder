<template>
    <ButtonWithDropdown
            ref="dropdown"
            dusk="grouped-actions-dropdown"
            class="w-auto"
            :color="color"
            @closed="menuClosed"
    >
        <template #button>
            <svg
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="h-5 w-5 text-gray-400"
            >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
        </template>

        <div
                role="menu"
                aria-orientation="horizontal"
                aria-labelledby="grouped-actions-menu"
                class="w-56"
        >
            <div v-show="!isToggleColumnsDisplayed && !isSearchFieldsDisplayed">
                <button
                        v-if="'searchFields' in actions && actions.searchFields.show"
                        dusk="add-search-fields-button"
                        class="text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center"
                        role="menuitem"
                        @click="isSearchFieldsDisplayed = true"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                                fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"
                        />
                    </svg>
                    <span>{{ translations.add_search_fields ?? 'Add search field' }}</span>
                </button>
                <button
                        v-if="'toggleColumns' in actions && actions.toggleColumns.show"
                        dusk="toggle-column-button"
                        class="text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center"
                        role="menuitem"
                        @click="isToggleColumnsDisplayed = true"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path
                                fill-rule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clip-rule="evenodd"
                        />
                    </svg>
                    <span>{{ translations.show_hide_columns ?? 'Show / Hide columns' }}</span>
                </button>
                <hr>
                <button
                        v-if="'reset' in actions"
                        dusk="reset-button"
                        class="text-left w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-700 flex gap-2 items-center"
                        role="menuitem"
                        @click="actions.reset?.onClick"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                        />
                    </svg>
                    <span>{{ translations.grouped_reset ?? 'Reset' }}</span>
                </button>
            </div>

            <div v-show="isSearchFieldsDisplayed">
                <button
                        type="button"
                        class="text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center"
                        @click="isSearchFieldsDisplayed = false"
                >
                    <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                    >
                        <path
                                d="M5 12H19M5 12L11 6M5 12L11 18"
                                stroke="#000000"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                        />
                    </svg>
                    <span>{{ translations.add_search_fields ?? 'Add search field' }}</span>
                </button>
                <button
                        v-for="(searchInput, key) in actions.searchFields.searchInputs"
                        :key="key"
                        :dusk="`add-search-row-${searchInput.key}`"
                        class="text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                        @click.prevent="actions.searchFields.onClick(searchInput.key)"
                >
                    {{ searchInput.label }}
                </button>
            </div>

            <div v-show="isToggleColumnsDisplayed">
                <button
                        type="button"
                        class="text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex gap-2 items-center"
                        @click="isToggleColumnsDisplayed = false"
                >
                    <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                    >
                        <path
                                d="M5 12H19M5 12L11 6M5 12L11 18"
                                stroke="#000000"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                        />
                    </svg>
                    <span>{{ translations.show_hide_columns ?? 'Show / Hide columns' }}</span>
                </button>
                <div class="px-2">
                    <ul class="divide-y divide-gray-200">
                        <li
                                v-for="(column, key) in actions.toggleColumns.columns"
                                v-show="column.can_be_hidden"
                                :key="key"
                                class="py-2 flex items-center justify-between"
                        >
                            <p
                                    class="text-sm text-gray-900"
                            >
                                {{ column.label }}
                            </p>

                            <button
                                    type="button"
                                    class="ml-4 relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                    :class="{
                  'bg-green-500': !column.hidden,
                  'bg-gray-200': column.hidden,
                }"
                                    :aria-pressed="!column.hidden"
                                    :aria-labelledby="`toggle-column-${column.key}`"
                                    :aria-describedby="`toggle-column-${column.key}`"
                                    :dusk="`toggle-column-${column.key}`"
                                    @click.prevent="actions.toggleColumns.onChange(column.key, column.hidden)"
                            >
                                <span class="sr-only">Column status</span>
                                <span
                                        aria-hidden="true"
                                        :class="{
                    'translate-x-5': !column.hidden,
                    'translate-x-0': column.hidden,
                  }"
                                        class="inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"
                                />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-show="!isToggleColumnsDisplayed && !isSearchFieldsDisplayed">
                <slot />
            </div>
        </div>
    </ButtonWithDropdown>
</template>

<script setup>
import ButtonWithDropdown from "./ButtonWithDropdown.vue";
import {getTranslations} from "../translations.js";
import {ref, watch} from "vue";

const translations = getTranslations();

const props = defineProps({
    actions: {
        type: Object,
        required: true,
    },

    color: {
        type: String,
        default: "primary",
        required: false,
    },
});

const isToggleColumnsDisplayed = ref(false);
const isSearchFieldsDisplayed = ref(false);

function menuClosed() {
    isToggleColumnsDisplayed.value = isSearchFieldsDisplayed.value = false;
}
</script>
