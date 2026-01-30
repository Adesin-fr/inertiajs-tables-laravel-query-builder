<template>
  <ButtonWithDropdown
    ref="dropdown"
    dusk="add-search-row-dropdown"
    :disabled="!hasSearchInputsWithoutValue"
    class="ijt-dropdown--auto-width"
  >
    <template #button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ijt-button__icon"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd"
        />
      </svg>
    </template>

    <div
      role="menu"
      aria-orientation="horizontal"
      aria-labelledby="add-search-input-menu"
      class="ijt-dropdown__content"
    >
      <button
        v-for="(searchInput, key) in searchInputs"
        :key="key"
        :dusk="`add-search-row-${searchInput.key}`"
        class="ijt-dropdown__item"
        role="menuitem"
        @click.prevent="enableSearch(searchInput.key)"
      >
        {{ searchInput.label }}
      </button>
    </div>
  </ButtonWithDropdown>
</template>

<script setup>
import ButtonWithDropdown from "./ButtonWithDropdown.vue";
import { ref } from "vue";

const props = defineProps({
    searchInputs: {
        type: Object,
        required: true,
    },

    hasSearchInputsWithoutValue: {
        type: Boolean,
        required: true,
    },

    onAdd: {
        type: Function,
        required: true,
    },
});

const dropdown = ref(null);

function enableSearch(key) {
    props.onAdd(key);
    dropdown.value.hide();
}
</script>
