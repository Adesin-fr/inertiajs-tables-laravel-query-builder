<template>
    <draggable v-model="localColumns" item-key="key" :animation="200" handle=".ijt-column-manager__drag-handle"
        ghost-class="ijt-sortable-ghost" chosen-class="ijt-sortable-chosen"
        @change="onColumnOrderChange" @start="isDragging = true" @end="isDragging = false">
        <template #item="{ element }">
            <div class="ijt-column-manager__item"
                data-test="column-item" :data-column-key="element.key">
                <div class="ijt-column-manager__item-left">
                    <div class="ijt-column-manager__drag-handle">
                        <svg class="ijt-column-manager__drag-handle-icon" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M7 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z">
                            </path>
                        </svg>
                    </div>
                    <button v-if="element.can_be_pinned !== false" type="button"
                        class="ijt-column-manager__pin-button"
                        :class="{ 'ijt-column-manager__pin-button--active': element.pinned }"
                        @click.prevent="onTogglePin(element.key, element.pinned)"
                        :title="element.pinned ? 'Unpin column' : 'Pin column'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="ijt-column-manager__pin-icon" viewBox="0 0 24 24"
                            v-if="element.pinned">
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5">
                                <path d="M9.5 14.5L3 21" />
                                <path fill="currentColor"
                                    d="m5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z" />
                            </g>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="ijt-column-manager__pin-icon" viewBox="0 0 24 24" v-else>
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M9.5 14.5L3 21M5 9.485l9.193 9.193l1.697-1.697l-.393-3.787l5.51-4.673l-5.85-5.85l-4.674 5.51l-3.786-.393z" />
                        </svg>
                    </button>
                    <p class="ijt-column-manager__label"
                        :class="{
                            'ijt-column-manager__label--hidden': element.hidden,
                            'ijt-column-manager__label--pinned': element.pinned
                        }">
                        {{ element.label }}
                    </p>
                </div>

                <button v-if="element.can_be_hidden && !element.pinned" type="button"
                    class="ijt-toggle"
                    :class="{
                        'ijt-toggle--on': !element.hidden,
                        'ijt-toggle--off': element.hidden,
                    }" :aria-pressed="!element.hidden" :aria-labelledby="`toggle-column-${element.key}`"
                    :aria-describedby="`toggle-column-${element.key}`" :dusk="`toggle-column-${element.key}`"
                    @click.prevent="onToggleColumn(element.key, element.hidden)">
                    <span class="ijt-sr-only">Column status</span>
                    <span aria-hidden="true" class="ijt-toggle__handle" />
                </button>
            </div>
        </template>
    </draggable>
</template>

<script setup>
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'

const props = defineProps({
    columns: {
        type: Array,
        required: true
    },
    canSort: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['columns-changed'])

// Local copy of columns for drag and drop
const localColumns = ref([...props.columns])
const isDragging = ref(false)
const justReordered = ref(false)

// Watch for changes in props.columns
watch(() => props.columns, (newColumns) => {
    // Ne pas recharger si l'utilisateur est en train de réorganiser
    // ou si on vient juste de réorganiser
    if (!isDragging.value && !justReordered.value) {
        localColumns.value = [...newColumns]
    }

    // Réinitialiser le flag après un petit délai
    if (justReordered.value) {
        setTimeout(() => {
            justReordered.value = false
        }, 100)
    }
}, { deep: true })

function onToggleColumn(key, hidden) {
    // Mettre à jour la colonne locale
    const columnIndex = localColumns.value.findIndex(col => col.key === key)
    if (columnIndex !== -1) {
        localColumns.value[columnIndex].hidden = !hidden
    }

    emit('columns-changed', localColumns.value)
}

function onTogglePin(key, pinned) {
    // Mettre à jour la colonne locale
    const columnIndex = localColumns.value.findIndex(col => col.key === key)
    if (columnIndex !== -1) {
        localColumns.value[columnIndex].pinned = !pinned
    }

    // Réorganiser les colonnes : épinglées en premier
    localColumns.value.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1
        if (!a.pinned && b.pinned) return 1
        return 0
    })

    emit('columns-changed', localColumns.value)
}

function onColumnOrderChange() {
    // Marquer qu'on vient de réorganiser
    justReordered.value = true

    // Émettre les colonnes réorganisées
    emit('columns-changed', localColumns.value)
}
</script>
