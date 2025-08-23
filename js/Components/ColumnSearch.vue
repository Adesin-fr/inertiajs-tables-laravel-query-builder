<template>
    <div class="relative inline-block">
        <button ref="buttonRef" @click="toggleDropdown" :class="[
            'p-1 rounded hover:bg-gray-100 transition-colors duration-150',
            {
                'text-blue-500': hasActiveSearch,
                'text-gray-400 hover:text-gray-600': !hasActiveSearch
            }
        ]" :dusk="`column-search-${columnKey}`">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd" />
            </svg>
        </button>

        <!-- Teleported Dropdown -->
        <Teleport to="body">
            <div v-if="isDropdownOpen" ref="dropdown"
                class="fixed bg-white border border-gray-200 rounded-md shadow-lg z-[9999] min-w-max"
                :style="dropdownStyle" @click.stop>
                <div class="p-3">
                    <h3 class="text-xs uppercase tracking-wide text-gray-600 mb-2">
                        {{ translations.search }} {{ columnLabel }}
                    </h3>
                    <div class="space-y-2">
                        <input ref="searchInput" type="text" :value="currentSearchValue" :class="getTheme('input')"
                            :placeholder="`${translations.search} ${columnLabel.toLowerCase()}...`"
                            @input="onSearchInput" @keydown.enter="closeDropdown" @keydown.escape="closeDropdown" />
                        <div v-if="currentSearchValue && currentSearchValue !== ''" class="flex justify-end">
                            <button type="button" :class="getTheme('reset_button')" @click="onSearchChange('')">
                                <span class="sr-only">{{ translations.reset_search }}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>

        <!-- Backdrop -->
        <Teleport to="body">
            <div v-if="isDropdownOpen" class="fixed inset-0 z-[9998]" @click="closeDropdown" />
        </Teleport>
    </div>
</template>

<script setup>
import { computed, ref, inject, onMounted, onUnmounted, Teleport, nextTick } from "vue";
import { twMerge } from "tailwind-merge";
import { get_theme_part } from "../helpers.js";
import translations from "../translations.js";

const props = defineProps({
    columnKey: {
        type: String,
        required: true,
    },
    columnLabel: {
        type: String,
        required: true,
    },
    searchInputs: {
        type: Array,
        required: true,
    },
    onSearchChange: {
        type: Function,
        required: true,
    },
    color: {
        type: String,
        default: "primary",
        required: false,
    },
    ui: {
        required: false,
        type: Object,
        default: {},
    },
});

const isDropdownOpen = ref(false);
const dropdown = ref(null);
const buttonRef = ref(null);
const searchInput = ref(null);
const dropdownPosition = ref({ top: 0, left: 0 });

// Find searchinput for this column
const columnSearchInput = computed(() => {
    return props.searchInputs.find(input => input.key === props.columnKey);
});

// Get the current value of the search input for this column
const currentSearchValue = computed(() => {
    return columnSearchInput.value ? columnSearchInput.value.value || '' : '';
});

// Check if there is an active search
const hasActiveSearch = computed(() => {
    return currentSearchValue.value !== '';
});

// Computed style for dropdown position
const dropdownStyle = computed(() => {
    return {
        top: dropdownPosition.value.top + 'px',
        left: dropdownPosition.value.left + 'px'
    };
});

async function toggleDropdown() {
    if (columnSearchInput.value) {
        if (!isDropdownOpen.value) {
            calculateDropdownPosition();
        }
        isDropdownOpen.value = !isDropdownOpen.value;

        if (isDropdownOpen.value) {
            // Focus the input after the dropdown is rendered
            await nextTick();
            if (searchInput.value) {
                searchInput.value.focus();
            }
        }
    }
}

function calculateDropdownPosition() {
    if (buttonRef.value) {
        const rect = buttonRef.value.getBoundingClientRect();
        dropdownPosition.value = {
            top: rect.bottom + window.scrollY + 4,
            left: rect.right + window.scrollX - 250 // Align to right assuming a width of 250px
        };
    }
}

function closeDropdown() {
    isDropdownOpen.value = false;
}

function onSearchInput(event) {
    const value = event.target.value;
    onSearchChange(value);
}

function onSearchChange(value) {
    props.onSearchChange(props.columnKey, value);
}

// Theme
const fallbackTheme = {
    input: {
        base: "block w-full shadow-sm text-sm rounded-md min-w-[200px]",
        color: {
            primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
            dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500",
        },
    },
    reset_button: {
        base: "rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2",
        color: {
            primary: "text-gray-400 hover:text-gray-500 focus:ring-indigo-500",
            dootix: "text-gray-400 hover:text-gray-500 focus:ring-cyan-500",
        },
    },
};

const themeVariables = inject("themeVariables");
const getTheme = (item) => {
    return twMerge(
        get_theme_part([item, "base"], fallbackTheme, themeVariables?.inertia_table?.table_search?.column_search, props.ui),
        get_theme_part([item, "color", props.color], fallbackTheme, themeVariables?.inertia_table?.table_search?.column_search, props.ui),
    );
};

// Close the dropdown when clicking outside
function handleClickOutside(event) {
    if (dropdown.value && !dropdown.value.contains(event.target) && !event.target.closest(`[dusk="column-search-${props.columnKey}"]`)) {
        closeDropdown();
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>
