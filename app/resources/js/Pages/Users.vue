<script setup>
import BreezeGuestLayout from "@/Layouts/Guest.vue";
import Table from "@inertiajs-tables/Components/Table.vue"
import { hide } from "@popperjs/core";
import { ref } from 'vue';

defineProps(["users"]);

const showExportMenu = ref(false);

const toggleExportMenu = () => {
    showExportMenu.value = !showExportMenu.value;
};

const exportExcel = () => {
    alert('Export Excel personnalisé démarré!');
    showExportMenu.value = false;
    // Ici vous pouvez implémenter la logique d'export Excel personnalisée
};
</script>

<template>
    <div class="hidden md:table-cell"></div>
    <BreezeGuestLayout>
        <Table :resource="users" :input-debounce-ms="50" :resizeable-columns="true" :show-export-button="true"
            :hide-search-inputs-above-table="true">
            <template #cell(actions)="{ item: user }">
                <a :href="`/users/${user.id}/edit`">
                    Edit
                </a>
            </template>
            <!-- Exemple avec un bouton export en forme de dropdown -->
            <template #exportButton="{ exportUrl, translations }">
                <div class="relative">
                    <button @click="toggleExportMenu" 
                        class="relative inline-flex items-center px-4 py-2 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Options d'export
                        <svg class="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <!-- Menu dropdown (simplifié) -->
                    <div v-if="showExportMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                        <a :href="exportUrl" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Export CSV
                        </a>
                        <button @click="exportExcel" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Export Excel (personnalisé)
                        </button>
                    </div>
                </div>
            </template>
        </Table>
    </BreezeGuestLayout>
</template>
