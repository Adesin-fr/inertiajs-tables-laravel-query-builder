<template>
    <div class="space-y-4">
        <!-- Type Selector -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                Type de filtre
            </label>
            <select v-model="filterType" :class="getTheme('select')" @change="onTypeChange">
                <option value="">Aucun filtre</option>
                <option value="exact">Date exacte</option>
                <option value="before">Avant le</option>
                <option value="after">Après le</option>
                <option value="between">Plage de dates</option>
            </select>
        </div>

        <!-- Date Inputs -->
        <div v-if="filterType && filterType !== ''" class="space-y-3">
            <!-- Single Date Input (exact, before, after) -->
            <div v-if="['exact', 'before', 'after'].includes(filterType)">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ getDateLabel() }}
                </label>
                <input type="date" v-model="singleDate" :class="getTheme('input')" @change="onDateChange" />
            </div>

            <!-- Date Range Inputs (between) -->
            <div v-if="filterType === 'between'" class="space-y-3">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Date de début
                    </label>
                    <input type="date" v-model="startDate" :class="getTheme('input')" @change="onDateChange" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Date de fin
                    </label>
                    <input type="date" v-model="endDate" :class="getTheme('input')" @change="onDateChange" />
                </div>
            </div>
        </div>

        <!-- Reset Button -->
        <div v-if="hasValue" class="flex justify-end">
            <button type="button" :class="getTheme('reset_button')" @click="resetFilter">
                <span class="sr-only">Réinitialiser le filtre</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, inject, onMounted } from "vue";
import { twMerge } from "tailwind-merge";
import { get_theme_part } from "../../helpers.js";

const props = defineProps({
    filter: {
        type: Object,
        required: true,
    },
    onFilterChange: {
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

// Reactive data
const filterType = ref('');
const singleDate = ref('');
const startDate = ref('');
const endDate = ref('');

// Computed
const hasValue = computed(() => {
    return filterType.value !== '' && (
        (filterType.value !== 'between' && singleDate.value) ||
        (filterType.value === 'between' && startDate.value && endDate.value)
    );
});

// Methods
function getDateLabel() {
    switch (filterType.value) {
        case 'exact':
            return 'Date exacte';
        case 'before':
            return 'Avant le';
        case 'after':
            return 'Après le';
        default:
            return 'Date';
    }
}

function onTypeChange() {
    // Reset dates when type changes
    singleDate.value = '';
    startDate.value = '';
    endDate.value = '';

    if (filterType.value === '') {
        resetFilter();
    } else {
        onDateChange();
    }
}

function onDateChange() {
    if (filterType.value === '') {
        return;
    }

    let value = null;

    switch (filterType.value) {
        case 'exact':
        case 'before':
        case 'after':
            if (singleDate.value) {
                value = {
                    type: filterType.value,
                    date: singleDate.value
                };
            }
            break;
        case 'between':
            if (startDate.value && endDate.value) {
                value = {
                    type: filterType.value,
                    start_date: startDate.value,
                    end_date: endDate.value
                };
            }
            break;
    }

    props.onFilterChange(props.filter.key, value);
}

function resetFilter() {
    filterType.value = '';
    singleDate.value = '';
    startDate.value = '';
    endDate.value = '';
    props.onFilterChange(props.filter.key, null);
}

// Initialize from filter value
onMounted(() => {
    if (props.filter.value) {
        const value = props.filter.value;

        if (value.type) {
            filterType.value = value.type;

            if (value.type === 'between') {
                startDate.value = value.start_date || '';
                endDate.value = value.end_date || '';
            } else {
                singleDate.value = value.date || '';
            }
        }
    }
});

// Watch for external changes
watch(() => props.filter.value, (newValue) => {
    if (!newValue) {
        resetFilter();
    } else if (newValue.type) {
        filterType.value = newValue.type;

        if (newValue.type === 'between') {
            startDate.value = newValue.start_date || '';
            endDate.value = newValue.end_date || '';
        } else {
            singleDate.value = newValue.date || '';
        }
    }
}, { deep: true });

// Theme
const fallbackTheme = {
    select: {
        base: "block w-full shadow-sm text-sm rounded-md",
        color: {
            primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
            dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500",
        },
    },
    input: {
        base: "block w-full shadow-sm text-sm rounded-md",
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
        get_theme_part([item, "base"], fallbackTheme, themeVariables?.inertia_table?.table_filter?.date_filter, props.ui),
        get_theme_part([item, "color", props.color], fallbackTheme, themeVariables?.inertia_table?.table_filter?.date_filter, props.ui),
    );
};
</script>
