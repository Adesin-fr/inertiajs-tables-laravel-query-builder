<template>
  <ButtonWithDropdown placement="bottom-end" dusk="columns-dropdown" :color="color">
    <template #button>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fill-rule="evenodd"
          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
          clip-rule="evenodd" />
      </svg>
      <span v-if="hasHiddenColumns" class="ml-1">({{ hiddenColumnsCount }})</span>
    </template>

    <div role="menu" aria-orientation="horizontal" aria-labelledby="toggle-columns-menu" class="min-w-max">
      <div class="px-2">
        <div class="py-2 text-xs text-gray-500 font-medium uppercase">
          Glissez pour réorganiser
        </div>
        <ColumnManager :columns="localColumns" :can-sort="true" @columns-changed="onColumnsChanged" />
      </div>
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

  color: {
    type: String,
    default: "primary",
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

<style scoped>
.drag-handle:hover {
  color: #4f46e5;
}

.sortable-ghost {
  opacity: 0.5;
  background: #f3f4f6;
}

.sortable-chosen {
  background: #e0e7ff;
}
</style>
