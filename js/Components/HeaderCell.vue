<template>
  <th v-show="!cell.hidden"
    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 relative resize-border"
    :class="cell.header_class" :style="{ width: columnWidth }" :data-column-key="cell.key">
    <component :is="cell.sortable ? 'button' : 'div'" class="w-full" :dusk="cell.sortable ? `sort-${cell.key}` : null"
      @click.prevent="onClick">
      <span class="flex flex-row items-center justify-between w-full">
        <span class="flex flex-row items-center">
          <slot name="label"><span class="uppercase">{{ cell.label }}</span></slot>

          <slot name="sort">
            <svg v-if="cell.sortable" aria-hidden="true" class="w-3 h-3 ml-2" :class="{
              'text-gray-400': !cell.sorted,
              'text-green-500': cell.sorted,
            }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" :sorted="cell.sorted">
              <path v-if="!cell.sorted" fill="currentColor"
                d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z" />

              <path v-if="cell.sorted === 'asc'" fill="currentColor"
                d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z" />

              <path v-if="cell.sorted === 'desc'" fill="currentColor"
                d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z" />
            </svg>
          </slot>
        </span>

        <span class="flex items-center space-x-1">
          <!-- Column Search -->
          <slot name="search">
            <ColumnSearch v-if="cell.searchable && cell.searchInputs && cell.searchInputs.length > 0"
              :column-key="cell.key" :column-label="cell.label" :search-inputs="cell.searchInputs"
              :on-search-change="cell.onSearchChange" :color="cell.color" @click.stop />
          </slot>

          <!-- Column Filter -->
          <slot name="filter">
            <ColumnFilter v-if="cell.filters && cell.filters.length > 0" :column-key="cell.key" :filters="cell.filters"
              :on-filter-change="cell.onFilterChange" :color="cell.color" @click.stop />
          </slot>
        </span>
      </span>
    </component>

    <!-- Resize handle -->
    <ColumnResizeHandle v-if="cell.resizable !== false && columnResizeContext" :column-key="cell.key"
      :on-resize="startResize" :is-active="isResizing && resizingColumn === cell.key" />
  </th>
</template>

<script setup>
import { computed, inject } from 'vue';
import ColumnResizeHandle from './ColumnResizeHandle.vue';
import ColumnFilter from './ColumnFilter.vue';
import ColumnSearch from './ColumnSearch.vue';

const props = defineProps({
  cell: {
    type: Object,
    required: true,
  },
});

// Inject resize functions from parent Table component
const columnResizeContext = inject('columnResize', null);

const columnWidth = computed(() => {
  if (!columnResizeContext) return 'auto';
  const width = columnResizeContext.getColumnWidth(props.cell.key);
  return width === 'auto' ? width : `${width}px`;
});

const isResizing = computed(() => columnResizeContext?.isResizing || false);
const resizingColumn = computed(() => columnResizeContext?.resizingColumn || null);

function onClick() {
  if (props.cell.sortable) {
    props.cell.onSort(props.cell.key);
  }
}

function startResize(event, columnKey) {
  if (columnResizeContext) {
    columnResizeContext.startResize(event, columnKey);
  }
}
</script>

<style scoped>
.resize-border::after {
  content: '';
  position: absolute;
  right: 0;
  top: 25%;
  height: 50%;
  width: 2px;
  background-color: #e5e7eb;
  /* border-gray-200 */
  transition: background-color 0.15s ease-in-out;
}

.resize-border:hover::after {
  background-color: #9ca3af;
  /* border-gray-400 */
}
</style>