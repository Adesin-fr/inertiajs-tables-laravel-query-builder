<template>
  <ButtonWithDropdown placement="bottom-end" dusk="filters-dropdown">
    <template #button>
      <svg xmlns="http://www.w3.org/2000/svg" class="ijt-button__icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
          clip-rule="evenodd" />
      </svg>
      <span v-if="hasEnabledFilters" class="ijt-button__badge">({{ activeFiltersCount }})</span>
    </template>

    <div role="menu" aria-orientation="horizontal" aria-labelledby="filter-menu" class="ijt-dropdown__content">
      <div v-for="(filter, key) in filters" :key="key">
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
          <ToggleFilter v-if="filter.type === 'toggle'" :filter="filter" :on-filter-change="onFilterChange" />
          <div v-if="filter.type === 'number_range'" style="min-width: 250px;">
            <NumberRangeFilter v-model="filter.value" :max="filter.max" :min="filter.min" :prefix="filter.prefix"
              :suffix="filter.suffix" :step="filter.step"
              @update:model-value="updateNumberRangeFilter(filter)" />
          </div>
          <div v-if="filter.type === 'date'" style="min-width: 300px;">
            <DateFilter :filter="filter" :on-filter-change="onFilterChange" />
          </div>
          <div v-if="filter.type === 'number'" style="min-width: 300px;">
            <NumberFilter :filter="filter" :on-filter-change="onFilterChange" />
          </div>
        </div>
      </div>
    </div>
  </ButtonWithDropdown>
</template>

<script setup>
import ButtonWithDropdown from "./ButtonWithDropdown.vue";
import { computed, ref } from "vue";
import ToggleFilter from "./TableFilters/ToggleFilter.vue";
import NumberRangeFilter from "./TableFilters/NumberRangeFilter.vue";
import DateFilter from "./TableFilters/DateFilter.vue";
import NumberFilter from "./TableFilters/NumberFilter.vue";

const props = defineProps({
  hasEnabledFilters: {
    type: Boolean,
    required: true,
  },

  filters: {
    type: Object,
    required: true,
  },

  onFilterChange: {
    type: Function,
    required: true,
  },
});

const activeFiltersCount = computed(() => {
  return props.filters.filter((f) => !filterIsNull(f)).length;
});

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
    case "number":
      return !filter.value || (typeof filter.value === 'object' && !filter.value.type);
    default:
      return !filter.value;
  }
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
</script>
