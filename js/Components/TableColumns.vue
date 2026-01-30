<template>
  <ButtonWithDropdown placement="bottom-end" dusk="columns-dropdown">
    <template #button>
      <svg xmlns="http://www.w3.org/2000/svg" class="ijt-button__icon" viewBox="0 0 48 48">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"
          d="m5 10l3 3l6-6M5 24l3 3l6-6M5 38l3 3l6-6m7-11h22M21 38h22M21 10h22" />
      </svg>
      <span v-if="hasHiddenColumns" class="ijt-button__badge">({{ hiddenColumnsCount }})</span>
    </template>

    <div role="menu" aria-orientation="horizontal" aria-labelledby="toggle-columns-menu" class="ijt-dropdown__content">
      <ColumnManager :columns="localColumns" :can-sort="true" @columns-changed="onColumnsChanged" />
    </div>
  </ButtonWithDropdown>
</template>

<script setup>
import ButtonWithDropdown from "./ButtonWithDropdown.vue";
import ColumnManager from "./ColumnManager.vue";
import { computed, ref, watch } from "vue";

const props = defineProps({
  columns: {
    type: Object,
    required: true,
  },

  hasHiddenColumns: {
    type: Boolean,
    required: true,
  },

  onChange: {
    type: Function,
    required: true,
  },

  tableName: {
    type: String,
    default: "default",
    required: false,
  },
});

// Créer une copie locale des colonnes pour le drag and drop
const localColumns = ref([...props.columns]);

// Surveiller les changements des colonnes props pour les synchroniser
watch(() => props.columns, (newColumns) => {
  localColumns.value = [...newColumns];
}, { deep: true, immediate: true });

const hiddenColumnsCount = computed(() => {
  return localColumns.value.filter((c) => c.hidden).length;
});

function onColumnsChanged(updatedColumns) {
  // Mettre à jour les colonnes locales
  localColumns.value = [...updatedColumns];

  // Appeler la fonction de callback du parent avec la nouvelle collection complète
  props.onChange(updatedColumns);
}
</script>
