<template>
    <draggable v-model="localColumns" item-key="key" :animation="200" handle=".drag-handle"
        @change="onColumnOrderChange" @start="isDragging = true" @end="isDragging = false">
        <template #item="{ element }">
            <div class="py-2 flex items-center justify-between border-b border-gray-100 last:border-b-0"
                data-test="column-item" :data-column-key="element.key">
                <div class="flex items-center">
                    <div class="drag-handle cursor-move mr-2 p-1 text-gray-400 hover:text-gray-600">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M7 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z">
                            </path>
                        </svg>
                    </div>
                    <p class="text-sm text-gray-900" :class="{ 'text-gray-400': element.hidden }">
                        {{ element.label }}
                    </p>
                </div>

                <button v-if="element.can_be_hidden" type="button"
                    class="ml-4 relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                    :class="{
                        'bg-green-500': !element.hidden,
                        'bg-gray-200': element.hidden,
                    }" :aria-pressed="!element.hidden" :aria-labelledby="`toggle-column-${element.key}`"
                    :aria-describedby="`toggle-column-${element.key}`" :dusk="`toggle-column-${element.key}`"
                    @click.prevent="onToggleColumn(element.key, element.hidden)">
                    <span class="sr-only">Column status</span>
                    <span aria-hidden="true" :class="{
                        'translate-x-5': !element.hidden,
                        'translate-x-0': element.hidden,
                    }"
                        class="inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200" />
                </button>
                <div v-else class="ml-4 w-11 flex justify-center">
                    <span class="text-xs text-gray-400">Fixe</span>
                </div>
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

function onColumnOrderChange() {
    // Marquer qu'on vient de réorganiser
    justReordered.value = true

    // Émettre les colonnes réorganisées
    emit('columns-changed', localColumns.value)
}
</script>
