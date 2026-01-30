<template>
    <div class="ijt-filter">
        <button ref="trigger" @click="toggleDropdown" class="ijt-filter__button"
            :class="{ 'ijt-filter__button--active': hasActiveFilter }"
            :dusk="`column-filter-${columnKey}`">
            <svg xmlns="http://www.w3.org/2000/svg" class="ijt-filter__button-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clip-rule="evenodd" />
            </svg>
        </button>

        <!-- Teleported Dropdown with Popper -->
        <Teleport to="body">
            <div v-if="isDropdownOpen" ref="container"
                class="ijt-filter__dropdown" style="z-index: 9999;" @click.stop>
                <div v-for="filter in columnFilters" :key="filter.key">
                    <h3 class="ijt-dropdown__header">
                        {{ filter.label }}
                    </h3>
                    <div class="ijt-dropdown__content">
                        <select v-if="filter.type === 'select'" :name="filter.key" :value="filter.value"
                            class="ijt-select" @change="onFilterChange(filter.key, $event.target.value)">
                            <option v-for="(option, optionKey) in filter.options" :key="optionKey" :value="optionKey">
                                {{ option }}
                            </option>
                        </select>
                        <ToggleFilter v-if="filter.type === 'toggle'" :filter="filter"
                            :on-filter-change="onFilterChange" />
                        <div v-if="filter.type === 'number'" style="min-width: 300px;">
                            <NumberFilter :filter="filter" :on-filter-change="onFilterChange" />
                        </div>
                        <div v-if="filter.type === 'number_range'" style="min-width: 250px;">
                            <NumberRangeFilter v-model="filter.value" :max="filter.max" :min="filter.min"
                                :prefix="filter.prefix" :suffix="filter.suffix" :step="filter.step"
                                @update:model-value="updateNumberRangeFilter(filter)" />
                        </div>
                        <div v-if="filter.type === 'date'" style="min-width: 300px;">
                            <DateFilter :filter="filter" :on-filter-change="onFilterChange" />
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>

        <!-- Backdrop -->
        <Teleport to="body">
            <div v-if="isDropdownOpen" class="ijt-filter__backdrop" style="z-index: 9998;" @click="closeDropdown" />
        </Teleport>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, Teleport } from "vue";
import ToggleFilter from "./TableFilters/ToggleFilter.vue";
import NumberRangeFilter from "./TableFilters/NumberRangeFilter.vue";
import NumberFilter from "./TableFilters/NumberFilter.vue";
import DateFilter from "./TableFilters/DateFilter.vue";
import { usePopper } from "../composables/usePopper.js";

const props = defineProps({
    columnKey: {
        type: String,
        required: true,
    },
    filters: {
        type: Array,
        required: true,
    },
    onFilterChange: {
        type: Function,
        required: true,
    },
});

const isDropdownOpen = ref(false);

// Configuration Popper.js
const [trigger, container] = usePopper({
    placement: 'bottom-end',
    strategy: 'fixed',
    modifiers: [
        { name: 'offset', options: { offset: [0, 4] } },
        { name: 'preventOverflow', options: { padding: 8 } },
        { name: 'flip', options: { fallbackPlacements: ['top-end', 'bottom-start', 'top-start'] } }
    ],
});

// Filter les filtres pour cette colonne uniquement
const columnFilters = computed(() => {
    return props.filters.filter(filter => {
        return filter.key === props.columnKey ||
            filter.key.startsWith(props.columnKey + '_') ||
            filter.key.includes(props.columnKey);
    });
});

// Vérifier s'il y a un filtre actif pour cette colonne
const hasActiveFilter = computed(() => {
    return columnFilters.value.some(filter => !filterIsNull(filter));
});

function toggleDropdown() {
    if (columnFilters.value.length > 0) {
        isDropdownOpen.value = !isDropdownOpen.value;
    }
}

function closeDropdown() {
    isDropdownOpen.value = false;
}

function filterIsNull(filter) {
    if (filter.value === null) return true;
    switch (filter.type) {
        case "number_range":
            return Number(Math.max(...filter.value)) === Number(filter.max) && Number(Math.min(...filter.value)) === Number(filter.min);
        case "select":
            return filter.value === "";
        case "toggle":
            return false;
        case "date":
            return !filter.value || (typeof filter.value === 'object' && !filter.value.type);
        default:
            return !filter.value;
    }
}

function onFilterChange(key, value) {
    props.onFilterChange(key, value);
}

function updateNumberRangeFilter(filter) {
    let value = filter.value;
    if (filter.value) {
        if (Number(Math.max(...filter.value)) === Number(filter.max) && Number(Math.min(...filter.value)) === Number(filter.min)) {
            value = null;
        } else if (Number(Math.min(...filter.value)) === 0 && Number(Math.max(...filter.value)) === 0) {
            value = ["0", "0"];
        }
    }
    props.onFilterChange(filter.key, value);
}

// Fermer le dropdown quand on clique en dehors
function handleClickOutside(event) {
    if (container.value && !container.value.contains(event.target) && !event.target.closest(`[dusk="column-filter-${props.columnKey}"]`)) {
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
