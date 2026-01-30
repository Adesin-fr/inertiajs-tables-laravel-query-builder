<template>
    <div class="ijt-number-filter">
        <!-- Type Selector -->
        <div>
            <label class="ijt-number-filter__label">
                {{ translations.filter_type }}
            </label>
            <select v-model="filterType" class="ijt-select" @change="onTypeChange">
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
        <div v-if="filterType && filterType !== ''">
            <!-- Single Number Input (exact, less_than, greater_than, etc.) -->
            <div
                v-if="['exact', 'less_than', 'greater_than', 'less_than_or_equal', 'greater_than_or_equal'].includes(filterType)">
                <label class="ijt-number-filter__label">
                    {{ getNumberLabel() }}
                </label>
                <div class="ijt-number-filter__input-wrapper">
                    <span v-if="filter.prefix" class="ijt-number-filter__prefix">{{ filter.prefix }}</span>
                    <input type="number" v-model.number="singleNumber" :step="filter.step || 1"
                        class="ijt-input" @input="onNumberChange" placeholder="0" />
                    <span v-if="filter.suffix" class="ijt-number-filter__suffix">{{ filter.suffix }}</span>
                </div>
            </div>

            <!-- Number Range Inputs (between) -->
            <div v-if="filterType === 'between'">
                <div style="margin-bottom: 0.75rem;">
                    <label class="ijt-number-filter__label">
                        {{ translations.start_number }}
                    </label>
                    <div class="ijt-number-filter__input-wrapper">
                        <span v-if="filter.prefix" class="ijt-number-filter__prefix">{{ filter.prefix }}</span>
                        <input type="number" v-model.number="startNumber" :step="filter.step || 1"
                            class="ijt-input" @input="onNumberChange" placeholder="0" />
                        <span v-if="filter.suffix" class="ijt-number-filter__suffix">{{ filter.suffix }}</span>
                    </div>
                </div>
                <div>
                    <label class="ijt-number-filter__label">
                        {{ translations.end_number }}
                    </label>
                    <div class="ijt-number-filter__input-wrapper">
                        <span v-if="filter.prefix" class="ijt-number-filter__prefix">{{ filter.prefix }}</span>
                        <input type="number" v-model.number="endNumber" :step="filter.step || 1"
                            class="ijt-input" @input="onNumberChange" placeholder="0" />
                        <span v-if="filter.suffix" class="ijt-number-filter__suffix">{{ filter.suffix }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Reset Button -->
        <div v-if="hasValue" class="ijt-number-filter__reset">
            <button type="button" class="ijt-number-filter__reset-button" @click="resetFilter">
                <span class="ijt-sr-only">{{ translations.reset_filter }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="ijt-number-filter__reset-icon" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
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
</script>
