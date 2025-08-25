<template>
    <div class="space-y-4">
        <!-- Type Selector -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ translations.filter_type }}
            </label>
            <select v-model="filterType" :class="getTheme('select')" @change="onTypeChange">
                <option value="">{{ translations.no_filter }}</option>
                <option value="exact">{{ translations.exact_number }}</option>
                <option value="less_than">{{ translations.less_than }}</option>
                <option value="greater_than">{{ translations.greater_than }}</option>
                <option value="less_than_or_equal">{{ translations.less_than_or_equal }}</option>
                <option value="greater_than_or_equal">{{ translations.greater_than_or_equal }}</option>
                <option value="between">{{ translations.number_range }}</option>
            </select>
        </div>

        <!-- Number Inputs -->
        <div v-if="filterType && filterType !== ''" class="space-y-3">
            <!-- Single Number Input (exact, less_than, greater_than, etc.) -->
            <div
                v-if="['exact', 'less_than', 'greater_than', 'less_than_or_equal', 'greater_than_or_equal'].includes(filterType)">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ getNumberLabel() }}
                </label>
                <div class="flex items-center">
                    <span v-if="filter.prefix" class="text-sm text-gray-500 mr-1">{{ filter.prefix }}</span>
                    <input type="number" v-model.number="singleNumber" :step="filter.step || 1"
                        :class="getTheme('input')" @input="onNumberChange" placeholder="0" />
                    <span v-if="filter.suffix" class="text-sm text-gray-500 ml-1">{{ filter.suffix }}</span>
                </div>
            </div>

            <!-- Number Range Inputs (between) -->
            <div v-if="filterType === 'between'" class="space-y-3">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        {{ translations.start_number }}
                    </label>
                    <div class="flex items-center">
                        <span v-if="filter.prefix" class="text-sm text-gray-500 mr-1">{{ filter.prefix }}</span>
                        <input type="number" v-model.number="startNumber" :step="filter.step || 1"
                            :class="getTheme('input')" @input="onNumberChange" placeholder="0" />
                        <span v-if="filter.suffix" class="text-sm text-gray-500 ml-1">{{ filter.suffix }}</span>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        {{ translations.end_number }}
                    </label>
                    <div class="flex items-center">
                        <span v-if="filter.prefix" class="text-sm text-gray-500 mr-1">{{ filter.prefix }}</span>
                        <input type="number" v-model.number="endNumber" :step="filter.step || 1"
                            :class="getTheme('input')" @input="onNumberChange" placeholder="0" />
                        <span v-if="filter.suffix" class="text-sm text-gray-500 ml-1">{{ filter.suffix }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Reset Button -->
        <div v-if="hasValue" class="flex justify-end">
            <button type="button" :class="getTheme('reset_button')" @click="resetFilter">
                <span class="sr-only">{{ translations.reset_filter }}</span>
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
import { getTranslations } from "../../translations.js";

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

const translations = getTranslations();

// Reactive data
const filterType = ref('');
const singleNumber = ref('');
const startNumber = ref('');
const endNumber = ref('');

// Computed
const hasValue = computed(() => {
    return filterType.value !== '' && (
        (filterType.value !== 'between' && singleNumber.value !== '' && singleNumber.value !== null) ||
        (filterType.value === 'between' && startNumber.value !== '' && startNumber.value !== null &&
            endNumber.value !== '' && endNumber.value !== null)
    );
});

// Methods
function getNumberLabel() {
    switch (filterType.value) {
        case 'exact':
            return translations.exact_number;
        case 'less_than':
            return translations.less_than;
        case 'greater_than':
            return translations.greater_than;
        case 'less_than_or_equal':
            return translations.less_than_or_equal;
        case 'greater_than_or_equal':
            return translations.greater_than_or_equal;
        default:
            return 'Number';
    }
}

function onTypeChange() {
    // Reset numbers when type changes
    singleNumber.value = '';
    startNumber.value = '';
    endNumber.value = '';

    if (filterType.value === '') {
        resetFilter();
    } else {
        onNumberChange();
    }
}

function onNumberChange() {
    if (filterType.value === '') {
        return;
    }

    let value = null;

    switch (filterType.value) {
        case 'exact':
        case 'less_than':
        case 'greater_than':
        case 'less_than_or_equal':
        case 'greater_than_or_equal':
            if (singleNumber.value !== '' && singleNumber.value !== null) {
                value = {
                    type: filterType.value,
                    number: singleNumber.value
                };
            }
            break;
        case 'between':
            if (startNumber.value !== '' && startNumber.value !== null &&
                endNumber.value !== '' && endNumber.value !== null) {
                value = {
                    type: filterType.value,
                    start_number: startNumber.value,
                    end_number: endNumber.value
                };
            }
            break;
    }

    props.onFilterChange(props.filter.key, value);
}

function resetFilter() {
    filterType.value = '';
    singleNumber.value = '';
    startNumber.value = '';
    endNumber.value = '';
    props.onFilterChange(props.filter.key, null);
}

// Initialize from filter value
onMounted(() => {
    if (props.filter.value) {
        const value = props.filter.value;

        if (value.type) {
            filterType.value = value.type;

            if (value.type === 'between') {
                startNumber.value = value.start_number || '';
                endNumber.value = value.end_number || '';
            } else {
                singleNumber.value = value.number || '';
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
            startNumber.value = newValue.start_number || '';
            endNumber.value = newValue.end_number || '';
        } else {
            singleNumber.value = newValue.number || '';
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
        get_theme_part([item, "base"], fallbackTheme, themeVariables?.inertia_table?.table_filter?.number_filter, props.ui),
        get_theme_part([item, "color", props.color], fallbackTheme, themeVariables?.inertia_table?.table_filter?.number_filter, props.ui),
    );
};
</script>
