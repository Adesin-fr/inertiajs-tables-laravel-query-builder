<template>
  <div class="relative inline-block">
    <button
      @click="toggleDropdown"
      :class="[
        'p-1 rounded hover:bg-gray-100 transition-colors duration-150',
        {
          'text-blue-500': hasActiveFilter,
          'text-gray-400 hover:text-gray-600': !hasActiveFilter
        }
      ]"
      :dusk="`column-filter-${columnKey}`"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- Dropdown -->
    <div
      v-if="isDropdownOpen"
      ref="dropdown"
      class="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-max"
      @click.stop
    >
      <div
        v-for="filter in columnFilters"
        :key="filter.key"
      >
        <h3 class="text-xs uppercase tracking-wide bg-gray-100 p-3">
          {{ filter.label }}
        </h3>
        <div class="p-2">
          <select
            v-if="filter.type === 'select'"
            :name="filter.key"
            :value="filter.value"
            :class="getTheme('select')"
            @change="onFilterChange(filter.key, $event.target.value)"
          >
            <option
              v-for="(option, optionKey) in filter.options"
              :key="optionKey"
              :value="optionKey"
            >
              {{ option }}
            </option>
          </select>
          <ToggleFilter
            v-if="filter.type === 'toggle'"
            :filter="filter"
            :on-filter-change="onFilterChange"
            :color="color"
          />
          <div
            v-if="filter.type === 'number_range'"
            class="py-4 px-8"
            style="min-width: 250px;"
          >
            <NumberRangeFilter
              v-model="filter.value"
              :max="filter.max"
              :min="filter.min"
              :prefix="filter.prefix"
              :suffix="filter.suffix"
              :step="filter.step"
              :color="color"
              @update:model-value="updateNumberRangeFilter(filter)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div
      v-if="isDropdownOpen"
      class="fixed inset-0 z-40"
      @click="closeDropdown"
    />
  </div>
</template>

<script setup>
import { computed, ref, inject, onMounted, onUnmounted } from "vue";
import ToggleFilter from "./TableFilters/ToggleFilter.vue";
import NumberRangeFilter from "./TableFilters/NumberRangeFilter.vue";
import { twMerge } from "tailwind-merge";
import { get_theme_part } from "../helpers.js";

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

// Filter les filtres pour cette colonne uniquement
const columnFilters = computed(() => {
  return props.filters.filter(filter => {
    // Logiques d'association possibles :
    // 1. La key du filtre correspond exactement à la key de la colonne
    // 2. La key du filtre commence par la key de la colonne (ex: "status_active" pour colonne "status")
    // 3. La key du filtre contient la key de la colonne
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

// Theme
const fallbackTheme = {
  select: {
    base: "block w-full shadow-sm text-sm rounded-md",
    color: {
      primary: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
      dootix: "border-gray-300 focus:ring-cyan-500 focus:border-blue-500",
    },
  },
};

const themeVariables = inject("themeVariables");
const getTheme = (item) => {
  return twMerge(
    get_theme_part([item, "base"], fallbackTheme, themeVariables?.inertia_table?.table_filter?.select_filter, props.ui),
    get_theme_part([item, "color", props.color], fallbackTheme, themeVariables?.inertia_table?.table_filter?.select_filter, props.ui),
  );
};

// Fermer le dropdown quand on clique en dehors
function handleClickOutside(event) {
  if (dropdown.value && !dropdown.value.contains(event.target) && !event.target.closest(`[dusk="column-filter-${props.columnKey}"]`)) {
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
