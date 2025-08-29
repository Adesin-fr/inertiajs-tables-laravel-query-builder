<template>
    <div class="px-2">
        <ul class="divide-y divide-gray-200">
            <li v-for="(column, key) in columns" v-show="column.can_be_hidden" :key="key"
                class="py-2 flex items-center justify-between">
                <p class="text-sm text-gray-900" :class="{ 'text-gray-400': column.hidden }">
                    {{ column.label }}
                </p>

                <button type="button"
                    class="ml-4 relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                    :class="{
                        'bg-green-500': !column.hidden,
                        'bg-gray-200': column.hidden,
                    }" :aria-pressed="!column.hidden" :aria-labelledby="`toggle-column-${column.key}`"
                    :aria-describedby="`toggle-column-${column.key}`" :dusk="`toggle-column-${column.key}`"
                    @click.prevent="onToggleColumn(column.key, column.hidden)">
                    <span class="sr-only">Column status</span>
                    <span aria-hidden="true" :class="{
                        'translate-x-5': !column.hidden,
                        'translate-x-0': column.hidden,
                    }"
                        class="inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200" />
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
defineProps({
    columns: {
        type: [Object, Array],
        required: true,
    },
});

const emit = defineEmits(['toggle-column']);

function onToggleColumn(key, hidden) {
    emit('toggle-column', key, hidden);
}
</script>
