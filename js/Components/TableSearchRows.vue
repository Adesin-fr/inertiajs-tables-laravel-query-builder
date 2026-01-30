<template>
  <div
    v-for="(searchInput, key) in searchInputs"
    v-show="searchInput.value !== null || isForcedVisible(searchInput.key)"
    :key="key"
    class="ijt-search-row"
  >
    <div class="ijt-search-row__container">
      <label
        :for="searchInput.key"
        class="ijt-search-row__label"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ijt-search-row__label-icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
        <span>{{ searchInput.label }}</span></label>
      <input
        :id="searchInput.key"
        :ref="skipUnwrap.el"
        :key="searchInput.key"
        :name="searchInput.key"
        :value="searchInput.value"
        type="text"
        class="ijt-search-row__input"
        @input="onChange(searchInput.key, $event.target.value)"
      >
      <div
        class="ijt-search-row__remove"
      >
        <button
          class="ijt-search-row__remove-button"
          :dusk="`remove-search-row-${searchInput.key}`"
          @click.prevent="onRemove(searchInput.key)"
        >
          <span class="ijt-sr-only">Remove search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ijt-search-row__remove-icon"
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
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, nextTick } from "vue";
import find from "lodash-es/find";

const skipUnwrap = { el: ref([]) };
let el = computed(() => skipUnwrap.el.value);

const props = defineProps({
    searchInputs: {
        type: Object,
        required: true,
    },

    forcedVisibleSearchInputs: {
        type: Array,
        required: true,
    },

    onChange: {
        type: Function,
        required: true,
    },

    onRemove: {
        type: Function,
        required: true,
    },
});

function isForcedVisible(key) {
    return props.forcedVisibleSearchInputs.includes(key);
}

watch(props.forcedVisibleSearchInputs, (inputs) => {
    const latestInput = inputs.length > 0 ? inputs[inputs.length -1] : null;

    if(!latestInput) {
        return;
    }

    nextTick().then(() => {
        const inputElement = find(el.value, (el) => {
            return el.name ===  latestInput;
        });

        if(inputElement) {
            inputElement.focus();
        }
    });
}, { immediate: true });
</script>
