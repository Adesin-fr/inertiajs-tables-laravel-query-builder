<template>
    <div class="ijt-date-filter">
        <!-- Type Selector -->
        <div>
            <label class="ijt-date-filter__label">
                {{ translations.filter_type }}
            </label>
            <select v-model="filterType" class="ijt-select" @change="onTypeChange">
                <option value="">{{ translations.no_filter }}</option>
                <option value="exact">{{ translations.exact_date }}</option>
                <option value="before">{{ translations.before_date }}</option>
                <option value="after">{{ translations.after_date }}</option>
                <option value="between">{{ translations.date_range }}</option>
            </select>
        </div>

        <!-- Date Inputs -->
        <div v-if="filterType && filterType !== ''">
            <!-- Single Date Input (exact, before, after) -->
            <div v-if="['exact', 'before', 'after'].includes(filterType)">
                <label class="ijt-date-filter__label">
                    {{ getDateLabel() }}
                </label>
                <input type="date" v-model="singleDate" class="ijt-input" @change="onDateChange" />
            </div>

            <!-- Date Range Inputs (between) -->
            <div v-if="filterType === 'between'">
                <div style="margin-bottom: 0.75rem;">
                    <label class="ijt-date-filter__label">
                        {{ translations.start_date }}
                    </label>
                    <input type="date" v-model="startDate" class="ijt-input" @change="onDateChange" />
                </div>
                <div>
                    <label class="ijt-date-filter__label">
                        {{ translations.end_date }}
                    </label>
                    <input type="date" v-model="endDate" class="ijt-input" @change="onDateChange" />
                </div>
            </div>
        </div>

        <!-- Reset Button -->
        <div v-if="hasValue" class="ijt-date-filter__reset">
            <button type="button" class="ijt-date-filter__reset-button" @click="resetFilter">
                <span class="ijt-sr-only">{{ translations.reset_filter }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="ijt-date-filter__reset-icon" fill="none" viewBox="0 0 24 24"
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
            return translations.exact_date;
        case 'before':
            return translations.before_date;
        case 'after':
            return translations.after_date;
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
</script>
