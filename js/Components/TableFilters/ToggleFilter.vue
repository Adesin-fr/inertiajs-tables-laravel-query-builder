<template>
  <div class="ijt-toggle-filter">
    <label class="ijt-toggle-filter__switch">
      <input
        type="checkbox"
        :checked="filter.value"
        class="ijt-toggle-filter__input"
        @change="onFilterChange(filter.key, $event.target.checked ? '1' : '0')"
      >
      <div
        class="ijt-toggle-filter__track"
        :class="{
          'ijt-toggle-filter__track--on': filter.value === '1' || filter.value === 1 || filter.value === true,
          'ijt-toggle-filter__track--off': filter.value === '0' || filter.value === 0 || filter.value === false,
          'ijt-toggle-filter__track--disabled': filter.value === null
        }"
      />
    </label>
    <button
      class="ijt-toggle-filter__reset"
      @click.prevent="onFilterChange(filter.key, null)"
    >
      <span class="ijt-sr-only">Remove search</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ijt-toggle-filter__reset-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
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
</script>
